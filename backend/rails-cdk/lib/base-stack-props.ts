import { StackProps } from '@aws-cdk/core';

interface AppContext {
  appName: string | undefined;
  myIp: string | undefined;
  dbName: string | undefined;
  dbPassword: string | undefined;
  sshKey: string | undefined;
  domain: string | undefined;
  url: string | undefined;
}

export interface BaseStackProps extends StackProps {
  context: AppContext;
}
