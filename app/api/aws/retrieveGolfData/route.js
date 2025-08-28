import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:c7fbde0b-bd35-4872-a018-8c5b469af387',
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  region: 'us-east-1',
});

const getObjectS3 = async (bucket, key) => {
  const params = { Bucket: bucket, Key: key };
  const data = await s3.getObject(params).promise();
  return JSON.parse(data.Body.toString('utf-8'));
};

const listObjectsV2 = async (bucket, prefix) => {
  const params = { Bucket: bucket };
  const data = await s3.listObjectsV2(params).promise();
  return data.Contents.find((item) => item.Key.startsWith(prefix))?.Key;
};

let cachedData = null;

export async function GET() {
  try {
    if (!cachedData) {
      const tournamentKey = await listObjectsV2('golfpickem-bucket', 'golf_tournament_data');
      const picksKey = await listObjectsV2('golfpickem-bucket', 'picks_data');

      const tournamentData = await getObjectS3('golfpickem-bucket', tournamentKey);
      const picksData = await getObjectS3('golfpickem-bucket', picksKey);

      cachedData = { tournamentData, picksData };
    }

    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}