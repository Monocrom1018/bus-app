#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import 'dotenv/config';
import { VpcStack } from '../lib/vpc-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { SecurityGroupStack } from '../lib/security-group-stack';
import { RDSStack } from '../lib/rds-stack';
import { S3Stack } from '../lib/s3-stack';
import { CloudfrontStack } from '../lib/cloudfront-stack';

const app = new cdk.App();
const env = {
  account: process.env.ACCOUNT,
  region: process.env.REGION,
};

const context = {
  appName: process.env.APP_NAME,
  myIp: process.env.MY_IP,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  sshKey: process.env.SSH_KEY,
  domain: process.env.DOMAIN,
  url: process.env.URL,
};

const vpcStack = new VpcStack(app, 'VpcStack', { env, context });

const securityGroupStack = new SecurityGroupStack(app, 'SecurityGroupStack', { env, context, vpc: vpcStack.vpc });

const ec2Stack = new Ec2Stack(app, 'Ec2Stack', { env, context, vpc: vpcStack.vpc, webSG: securityGroupStack.webSG });

new RDSStack(app, 'RDSStack', { env, context, vpc: vpcStack.vpc, rdsSG: securityGroupStack.rdsSG });

new S3Stack(app, 'S3Stack', { env, context });
if (context.domain && context.url) {
  new CloudfrontStack(app, 'CloudfrontStack', { env, context, publicIp: ec2Stack.publicIp });
}

app.synth();
