import { S3 } from 'aws-sdk';

const s3Client = new S3();

const getAnalyticsPartitionedKey = (userId: string, fileName: string): string => {
  return `${userId}/${fileName}.json`;
};

const storeDBRecord = async (bucket: string, userId: string, fileName: string, recordToSave: unknown): Promise<void> => {
  const response = await s3Client
    .putObject({
      Bucket: bucket,
      Key: getAnalyticsPartitionedKey(userId, fileName),
      Body: JSON.stringify(recordToSave)
    })
    .promise();

  // eslint-disable-next-line no-console
  console.info(response);
};

export default storeDBRecord;
