/* eslint-disable no-console */
import { SQSHandler, SQSMessageAttributes } from 'aws-lambda';
import { TARGET_S3_BUCKET } from 'src/constants';
import accountRepository from 'src/repositories/account';

import storeDBRecord from './storeDBReport';

export const handler: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      console.log('Record -->  ', JSON.stringify(record));
      const eventType = messageAttributes.eventType.stringValue!;
      const accountId = messageAttributes.accountId.stringValue!;
      const tenantId = messageAttributes.tenantId.stringValue!;
      const date = Number(messageAttributes.date.stringValue!);
      const comment = messageAttributes.comment.stringValue!;
      const amount = Number(messageAttributes.amount.stringValue!);
      const type = Number(messageAttributes.type.stringValue!);

      if (eventType === 'Deleted') {
        console.log('Deleted');
      } else if (eventType === 'Updated') {
        const oldAmount = Number(messageAttributes.oldAmount.stringValue);
        console.log(oldAmount);
      } else if (eventType === 'Created') {
        const account = await accountRepository.getById(accountId, tenantId);
        const data = {
          date: new Date(date).toDateString(),
          comment,
          amount,
          type: type === 1 ? 'Expense' : 'Income'
        };
        await storeDBRecord(TARGET_S3_BUCKET ?? '', tenantId, account.name, data);
      } else {
        console.log('Bad data');
      }
    }
  } catch (error) {
    console.log('Error');
    console.log(error);
  }
};
