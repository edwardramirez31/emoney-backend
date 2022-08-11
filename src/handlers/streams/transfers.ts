/* eslint-disable no-console */
import { TransferRequest } from 'src/repositories/transfer';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBRecord, DynamoDBStreamHandler } from 'aws-lambda';
import AccountRepository from 'src/repositories/account';
import { CategoryType } from 'src/models/category';

export const handler: DynamoDBStreamHandler = async (event) => {
  const record = event.Records[0] as DynamoDBRecord;
  const newImage = record.dynamodb?.NewImage;
  const oldImage = record.dynamodb?.OldImage;
  const accountRepository = new AccountRepository();

  if (!newImage || (!!newImage && Object.keys(newImage).length == 0)) {
    console.log('Transfer was deleted');
    if (oldImage) {
      const oldTransfer = DynamoDB.Converter.unmarshall(oldImage) as TransferRequest;

      await accountRepository.updateOnTransactionDeleted({
        id: oldTransfer.sender,
        tenantId: oldTransfer.tenantId,
        amount: oldTransfer.amount,
        type: CategoryType.EXPENSE
      });

      return await accountRepository.updateOnTransactionDeleted({
        id: oldTransfer.receiver,
        tenantId: oldTransfer.tenantId,
        amount: oldTransfer.amount,
        type: CategoryType.INCOME
      });
    }
  } else {
    const incomingTransfer = DynamoDB.Converter.unmarshall(newImage) as TransferRequest;
    if (!oldImage) {
      console.log('Transfer was created');
      await accountRepository.updateOnTransactionCreated({
        id: incomingTransfer.sender,
        tenantId: incomingTransfer.tenantId,
        amount: incomingTransfer.amount,
        type: CategoryType.EXPENSE
      });

      return await accountRepository.updateOnTransactionCreated({
        id: incomingTransfer.receiver,
        tenantId: incomingTransfer.tenantId,
        amount: incomingTransfer.amount,
        type: CategoryType.INCOME
      });
    }
    console.log('Transfer was updated');

    const oldTransfer = DynamoDB.Converter.unmarshall(oldImage) as TransferRequest;

    await accountRepository.updateOnTransactionUpdated({
      id: incomingTransfer.sender,
      tenantId: incomingTransfer.tenantId,
      amount: incomingTransfer.amount,
      oldAmount: oldTransfer.amount,
      type: CategoryType.EXPENSE
    });

    return await accountRepository.updateOnTransactionUpdated({
      id: incomingTransfer.receiver,
      tenantId: incomingTransfer.tenantId,
      amount: incomingTransfer.amount,
      oldAmount: oldTransfer.amount,
      type: CategoryType.INCOME
    });
  }
};
