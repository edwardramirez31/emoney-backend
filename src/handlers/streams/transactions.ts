/* eslint-disable no-console */
import { TransactionRequest } from 'src/repositories/transaction';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBRecord, DynamoDBStreamHandler } from 'aws-lambda';
import AccountRepository from 'src/repositories/account';

export const handler: DynamoDBStreamHandler = async (event) => {
  const record = event.Records[0] as DynamoDBRecord;
  const newImage = record.dynamodb?.NewImage;
  const oldImage = record.dynamodb?.OldImage;
  const repository = new AccountRepository();

  if (!newImage || (!!newImage && Object.keys(newImage).length == 0)) {
    console.log('Transaction was deleted');
    if (oldImage) {
      const oldTransaction = DynamoDB.Converter.unmarshall(oldImage) as TransactionRequest;

      return await repository.updateOnTransactionDeleted({
        id: oldTransaction.accountId,
        tenantId: oldTransaction.tenantId,
        amount: oldTransaction.amount,
        type: oldTransaction.type
      });
    }
  } else {
    console.log('Transaction was created');

    const incomingTransaction = DynamoDB.Converter.unmarshall(newImage) as TransactionRequest;
    if (!oldImage) {
      return await repository.updateOnTransactionCreated({
        id: incomingTransaction.accountId,
        tenantId: incomingTransaction.tenantId,
        amount: incomingTransaction.amount,
        type: incomingTransaction.type
      });
    }
    console.log('Transaction was updated');

    const oldTransaction = DynamoDB.Converter.unmarshall(oldImage) as TransactionRequest;

    return await repository.updateOnTransactionUpdated({
      id: incomingTransaction.accountId,
      tenantId: incomingTransaction.tenantId,
      amount: incomingTransaction.amount,
      oldAmount: oldTransaction.amount,
      type: incomingTransaction.type
    });
  }
};
