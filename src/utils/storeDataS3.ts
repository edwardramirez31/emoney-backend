import { S3 } from 'aws-sdk';

const s3Client = new S3();

const getAnalyticsPartitionedKey = (serviceName: string, fileName: string, timeStamp: number): string => {
  const messageTimestamp = new Date(timeStamp);
  const keyDate = messageTimestamp.toISOString().slice(0, 10);

  return `${serviceName}/date=${keyDate}/hour=${messageTimestamp.getUTCHours()}/${fileName}.json`;
};

const storeDBRecord = async (
  bucket: string,
  databaseFullName: string,
  fileName: string,
  timeStamp: number, // milliseconds
  recordToSave: unknown
): Promise<void> => {
  const databaseShortName = databaseFullName.split('-')[0]; //.slice(0, -2).join('-');
  // eslint-disable-next-line no-console
  console.info(`Saving DB ${databaseShortName} record in S3 ${bucket}`);
  const response = await s3Client
    .putObject({
      Bucket: bucket,
      Key: getAnalyticsPartitionedKey(databaseShortName, fileName, timeStamp),
      Body: JSON.stringify(recordToSave)
    })
    .promise();

  // eslint-disable-next-line no-console
  console.info(response);
};

export default storeDBRecord;
