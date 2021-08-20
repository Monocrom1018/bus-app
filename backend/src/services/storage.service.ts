import * as randomString from 'randomstring';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ImagesEntity } from '@images/images.entity';
import { ImagesRepository } from '@images/images.repository';
import { Level } from '@images/enum';
import { getRepository } from 'typeorm';

dotenv.config();
const IMAGE_EXT_WHITELIST = Object.freeze(/.\.(png|jpeg|jpg)$/);
// let s3Client: AWS.S3;
let imagesRepository: ImagesRepository;

export class StorageService {
  constructor() {
    imagesRepository = getRepository(ImagesEntity);
  }

  // eslint-disable-next-line consistent-return
  public async put_image(
    image_path: string,
    level = 'public',
  ): Promise<boolean | ImagesEntity> {
    AWS.config.update({
      accessKeyId: 'AKIAV6MSIGF7DCCC33Q6', // 추후에 .env를 gitignore에 추가하면 이쪽도 개인의 키로 변경되어야함
      secretAccessKey: 'vCPlD3HqYo+VnZZg0JGTY073kH4vJ4cB9guxzoAK', // 추후에 .env를 gitignore에 추가하면 이쪽도 개인의 키로 변경되어야함
      region: 'ap-northeast-2',
      // credentials: new AWS.CognitoIdentityCredentials({
      //   IdentityPoolId: 'ap-northeast-2:b4e653a5-c7e8-4bbe-b394-874849eda904',
      // }),
    });
    // const credentials =
    const s3Client = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        // Credential: new AWS.CognitoIdentityCredentials({
        //   IdentityPoolId: 'ap-northeast-2:b4e653a5-c7e8-4bbe-b394-874849eda904',
        // }),
      },
    });

    if (this.isResizable(image_path) === false) {
      return false;
    }

    const imagePathSplit = image_path.split('/');
    const lastIndex = imagePathSplit.length - 1;
    const imageName = imagePathSplit[lastIndex];
    const imageKey = `${randomString.generate()}/${imageName}`;
    const imageNameSplit = imageName.split('.');

    await s3Client
      .putObject(
        {
          Bucket: process.env.S3_BUCKET_NAME,
          Body: fs.readFileSync(image_path),
          Key: `${level}/origins/${imageKey}`,
          ContentType: `image/${imageNameSplit[imageNameSplit.length - 1]}`,
        },
        (err, data) => {
          if (err) {
            console.log(`err: ${err}`);
          } else {
            // console.log(`data: ${JSON.stringify(data)}`);
          }
        },
      )
      .promise();

    const image = imagesRepository.create({
      key: imageKey,
      // Todo Enum getByValue로 조지기
      level: Level.Public,
    });
    return image;
  }

  public delete_image() {
    // s3_client;
  }

  public get_image(key: string) {
    //  # TODO: web 에서 이미지 가져올때 pre signed url 떨궈주기
  }

  private isResizable(image_path: string): boolean {
    try {
      const imagePathSplit = image_path.split('/');
      const lastIndex = imagePathSplit.length - 1;
      if (!imagePathSplit[lastIndex].match(IMAGE_EXT_WHITELIST)) {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
