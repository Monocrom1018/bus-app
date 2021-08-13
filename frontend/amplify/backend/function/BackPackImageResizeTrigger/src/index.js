const AWS = require('aws-sdk');
const Sharp = require('sharp');
const fs = require('fs');

/* 
  mock storage 사용시  aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing: true 일때 true 로 변경 해주세요
  1. amplify function push 하기 전에 반드시 false 로 바꿔주세요
  2. linux & node 환경에 맞는 sharp 설치도 잊지 말아주세요
*/

const isMock = false;
const cwd = process.cwd();

const S3 = new AWS.S3({
  signatureVersion: 'v4',
  ...(isMock
    ? {
        s3ForcePathStyle: true,
        endpoint: new AWS.Endpoint('http://localhost:20005'),
      }
    : {}),
});

const THUMBNAIL_WIDTH = 800;
const THUMBNAIL_HEIGHT = 800;

function thumbnailKey(filename) {
  return `public/resized/${filename}`;
}

function fullsizeKey(filename) {
  return `public/fullsize/${filename}`;
}

function makeThumbnail(photo) {
  return Sharp(photo).resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).toBuffer();
}

async function resize(bucketName, key) {
  const originalPhoto = (await S3.getObject({ Bucket: bucketName, Key: key }).promise()).Body;
  const originalPhotoName = key.replace('public/origins/', '');

  const thumbnail = await makeThumbnail(originalPhoto);

  Promise.all([
    S3.putObject({
      Body: thumbnail,
      Bucket: bucketName,
      Key: thumbnailKey(originalPhotoName),
    }).promise(),

    S3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${key}`,
      Key: fullsizeKey(originalPhotoName),
    }).promise(),
  ]).then(async () => {
    await S3.deleteObject({
      Bucket: bucketName,
      Key: key,
    }).promise();
  });
}

function makeDirectory(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}

async function mockResize(bucketName, key) {
  const originalPhoto = (await S3.getObject({ Bucket: bucketName, Key: key }).promise()).Body;
  const originalPhotoName = key.replace('public/origins/', '');

  const thumbnail = await makeThumbnail(originalPhoto);

  const [baseBucketName] = bucketName.split('-');

  const AMPLIFY_DIR = cwd.split('/').slice(0, cwd.split('/').indexOf('backend')).join('/');
  const BUCKET_DIR = `${AMPLIFY_DIR}/mock-data/S3/${baseBucketName}`;

  const [uuid, fileName] = originalPhotoName.split('/');

  const thumbnailDir = `${BUCKET_DIR}/${thumbnailKey(uuid)}`;
  const fullsizeDir = `${BUCKET_DIR}/${fullsizeKey(uuid)}`;

  makeDirectory(thumbnailDir);
  makeDirectory(fullsizeDir);

  console.log(`${fileName} 리사이징을 완료 하였습니다 🚀`);
}

async function processRecord(record) {
  const bucketName = record.s3.bucket.name;
  const { key } = record.s3.object;

  if (key.split('/')[1] !== 'origins') {
    return;
  }

  if (isMock) {
    await mockResize(bucketName, key);
    return;
  }

  await resize(bucketName, key);
}

exports.handler = async (event, context, callback) => {
  try {
    if (isMock) {
      await processRecord(event.Records[0]);
      callback(null, { status: 'Photo Processed' });
      return;
    }

    event.Records.forEach(processRecord);
    callback(null, { status: 'Photo Processed' });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
