#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HostCdkStack, Context } from '../lib/host-cdk-stack';
import 'dotenv/config';

const env = {
  account: process.env.ACCOUNT,
  region: 'us-east-1'
}

const context = {
  appName: process.env.APP_NAME,
}

const backUrl = process.env.BACK_URL
const frontUrl = process.env.FRONT_URL
const url = process.env.URL

function isContext(context: any): context is Context {
  return  typeof context.appName === 'string'
}


const app = new cdk.App();


if(isContext(context)){
  //리펙토링 X
  if(backUrl){
    new HostCdkStack(app, `${context.appName}TestServerBackHostStack`, {
      env,  
      context: {...context, url: backUrl}
    });
  }
  if(frontUrl){
    new HostCdkStack(app, `${context.appName}TestServerFrontHostStack`, {
      env,  
      context: {...context, url: frontUrl}
    });
  }
  if(url){
    new HostCdkStack(app, `${context.appName}ServerHostStack`, {
      env,  
      context: {...context, url: url}
    });
  }
  
}

