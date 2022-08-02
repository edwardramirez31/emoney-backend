/* eslint-disable no-console */
import { DynamoDB } from 'aws-sdk';
import { DynamoDBRecord, DynamoDBStreamHandler } from 'aws-lambda';
import { FILTER_PROPERTIES, TARGET_S3_BUCKET } from 'src/constants';
import storeDBRecord from 'src/utils/storeDataS3';

export const handler: DynamoDBStreamHandler = async (event) => {
  console.log(JSON.stringify(event));
  const filters = JSON.parse(FILTER_PROPERTIES ?? '');
  console.log(filters);
  console.log(typeof filters);
  console.log(FILTER_PROPERTIES);

  const record = event.Records[0] as DynamoDBRecord;
  const eventID = record.eventID;
  const timeEventSent = (record.dynamodb?.ApproximateCreationDateTime ?? 0) * 1000; // an epoch time in milliseconds
  const eventSourceARN = record.eventSourceARN;
  const databaseFullName = eventSourceARN?.split('/')[1];
  const updatedItem = record.dynamodb?.NewImage;

  if (!updatedItem || (!!updatedItem && Object.keys(updatedItem).length == 0)) {
    // eslint-disable-next-line no-console
    console.warn("The system doesn't send analytics for removed objects.");
  } else {
    const recordToSave = DynamoDB.Converter.unmarshall(updatedItem);
    // eslint-disable-next-line no-console
    console.log(recordToSave);
    try {
      await storeDBRecord(
        TARGET_S3_BUCKET ?? 'my-product-dataa',
        databaseFullName ?? 'Products',
        eventID ?? '',
        timeEventSent,
        recordToSave
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};
