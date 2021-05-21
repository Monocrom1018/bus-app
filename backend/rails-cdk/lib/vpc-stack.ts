import * as cdk from '@aws-cdk/core';
import { Vpc, IVpc, SubnetType } from '@aws-cdk/aws-ec2';
import { BaseStackProps } from './base-stack-props';

export class VpcStack extends cdk.Stack {
  vpc: IVpc;

  constructor(scope: cdk.Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);

    const { context } = props;

    const vpcId = `${context.appName}-vpc`;

    const vpc = new Vpc(this, vpcId, {
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 28,
          name: 'rds',
          subnetType: SubnetType.ISOLATED,
        },
      ],
    });
    this.vpc = vpc;
  }
}
