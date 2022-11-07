/* eslint-disable no-console */
import { SQSHandler, SQSMessageAttributes } from 'aws-lambda';
import accountRepository from 'src/repositories/account';

export const handler: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      console.log('Record -->  ', JSON.stringify(record));
      const eventType = messageAttributes.eventType.stringValue!;
      const accountId = messageAttributes.accountId.stringValue!;
      const tenantId = messageAttributes.tenantId.stringValue!;
      const amount = Number(messageAttributes.amount.stringValue!);
      const type = Number(messageAttributes.type.stringValue!);

      if (eventType === 'Deleted') {
        return await accountRepository.updateOnTransactionDeleted({
          id: accountId,
          tenantId: tenantId,
          amount: amount,
          type: type
        });
      } else if (eventType === 'Updated') {
        const oldAmount = Number(messageAttributes.oldAmount.stringValue);

        return await accountRepository.updateOnTransactionUpdated({
          id: accountId,
          tenantId: tenantId,
          oldAmount: oldAmount,
          amount: amount,
          type: type
        });
      } else if (eventType === 'Created') {
        return await accountRepository.updateOnTransactionCreated({
          id: accountId,
          tenantId: tenantId,
          amount: amount,
          type: type
        });
      } else {
        console.log('Bad data');
      }
    }
  } catch (error) {
    console.log('Error');
    console.log(error);
  }
};
