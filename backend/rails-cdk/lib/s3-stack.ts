import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import { BaseStackProps } from './base-stack-props';

export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    const { context } = props;

    const S3AccessGroup = 'S3AccessGroup';

    const s3BucketName = `${context.appName}-s3-bucket-insomenia`;

    const s3Bucket = new s3.Bucket(this, s3BucketName, {
      bucketName: s3BucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true,
    });

    const s3Policy = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [s3Bucket.arnForObjects('*')],
      principals: [new iam.AnyPrincipal()],
    });

    s3Bucket.addToResourcePolicy(s3Policy);

    const ListAllMyBuckets = new iam.PolicyStatement({
      resources: ['arn:aws:s3:::*'],
      actions: ['s3:ListAllMyBuckets'],
    });
    const BucketLocation = new iam.PolicyStatement({
      resources: [s3Bucket.arnForObjects('')],
      actions: ['s3:ListBucket', 's3:GetBucketLocation'],
    });
    const AllObjectAction = new iam.PolicyStatement({
      resources: [s3Bucket.arnForObjects('*')],
      actions: ['s3:PutObject', 's3:PutObjectAcl', 's3:GetObject', 's3:GetObjectAcl', 's3:DeleteObject'],
    });

    const UserS3Access = new iam.Policy(this, 'UserS3Admin', {
      policyName: 'UserS3Admin',
      statements: [AllObjectAction, ListAllMyBuckets, BucketLocation],
    });

    const S3Group = new iam.Group(this, S3AccessGroup, { groupName: S3AccessGroup });
    S3Group.attachInlinePolicy(UserS3Access);
    const S3User = `${context.appName}-s3User`;

    const user = new iam.User(this, S3User, {
      userName: S3User,
      groups: [S3Group],
    });

    const accessKey = new iam.CfnAccessKey(this, `${S3User}AccessKey`, {
      userName: user.userName,
    });

    new cdk.CfnOutput(this, `BucketName`, { value: s3Bucket.bucketName });
    new cdk.CfnOutput(this, `${S3User}AccessKeyId`, { value: accessKey.ref });
    new cdk.CfnOutput(this, `${S3User}SecretAccessKey`, { value: accessKey.attrSecretAccessKey });
  }
}
