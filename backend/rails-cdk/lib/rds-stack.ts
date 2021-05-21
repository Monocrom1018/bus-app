import { InstanceClass, InstanceSize, InstanceType, ISecurityGroup, IVpc, SubnetType } from '@aws-cdk/aws-ec2';
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion } from '@aws-cdk/aws-rds';
import * as cdk from '@aws-cdk/core';
import { BaseStackProps } from './base-stack-props';

require('dotenv').config();

interface RDSStackProps extends BaseStackProps {
  vpc: IVpc;
  rdsSG: ISecurityGroup;
}

export class RDSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: RDSStackProps) {
    super(scope, id, props);
    const { context, vpc, rdsSG } = props;

    const rdsInstanceId = `${context.appName}-db-instance`;
    const credentials = Credentials.fromPassword('deploy', new cdk.SecretValue(context.dbPassword));
    const rdsInstance = new DatabaseInstance(this, rdsInstanceId, {
      databaseName: `${context.dbName}`,
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_12_5,
      }),
      credentials,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MEDIUM),
      vpc,
      vpcPlacement: vpc.selectSubnets({
        subnetType: SubnetType.ISOLATED,
      }),
      securityGroups: [rdsSG],
    });

    new cdk.CfnOutput(this, 'Rds Host', { value: rdsInstance.instanceEndpoint.hostname });
  }
}
