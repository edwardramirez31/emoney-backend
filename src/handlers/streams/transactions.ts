/* eslint-disable no-console */
import { TransactionRequest } from 'src/repositories/transaction';
import { DynamoDB, SNS } from 'aws-sdk';
import { DynamoDBRecord, DynamoDBStreamHandler } from 'aws-lambda';
import { SNS_TOPIC_ARN } from 'src/constants';

type SQSTransaction = TransactionRequest & { oldAmount?: number };

const sns = new SNS();

const formatSNSParams = (transaction: SQSTransaction, eventType: 'Deleted' | 'Created' | 'Updated'): SNS.PublishInput => ({
  Message: `Transaction ID ${transaction.id} for Account Number ${transaction.accountId}`,
  MessageAttributes: {
    accountId: {
      DataType: 'String',
      StringValue: transaction.accountId
    },
    tenantId: {
      DataType: 'String',
      StringValue: transaction.tenantId
    },
    type: {
      DataType: 'Number',
      StringValue: transaction.type.toString()
    },
    amount: {
      DataType: 'Number',
      StringValue: transaction.amount.toString()
    },
    oldAmount: {
      DataType: 'Number',
      StringValue: transaction.oldAmount?.toString() ?? '0'
    },
    eventType: {
      DataType: 'String',
      StringValue: eventType
    },
    date: {
      DataType: 'String',
      StringValue: transaction.date.toString()
    },
    comment: {
      DataType: 'String',
      StringValue: transaction.comment ?? ''
    }
  },
  Subject: eventType,
  TopicArn: SNS_TOPIC_ARN ?? ''
});

export const handler: DynamoDBStreamHandler = async (event) => {
  try {
    const record = event.Records[0] as DynamoDBRecord;
    const newImage = record.dynamodb?.NewImage;
    const oldImage = record.dynamodb?.OldImage;
    let transaction: SQSTransaction | null = null;
    let eventType: 'Deleted' | 'Created' | 'Updated' | null = null;

    if (!newImage || (!!newImage && Object.keys(newImage).length == 0)) {
      console.log('Transaction was deleted');
      if (oldImage) {
        transaction = DynamoDB.Converter.unmarshall(oldImage) as SQSTransaction;
        eventType = 'Deleted';
      }
    } else {
      transaction = DynamoDB.Converter.unmarshall(newImage) as SQSTransaction;

      if (!oldImage) {
        console.log('Transaction was created');
        eventType = 'Created';
      } else {
        console.log('Transaction was updated');
        transaction = { ...transaction, oldAmount: DynamoDB.Converter.unmarshall(oldImage).amount } as SQSTransaction;
        eventType = 'Updated';
      }
    }
    if (transaction && eventType) {
      const snsParams = formatSNSParams(transaction, eventType);

      const result = await sns
        .publish({
          ...snsParams
        })
        .promise();

      console.log(`Message ID ${result.MessageId} published to SNS topic`);
    }

    return;
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
  }
};
