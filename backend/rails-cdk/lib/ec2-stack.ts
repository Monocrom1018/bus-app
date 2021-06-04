import {
  CfnEIP,
  CfnEIPAssociation,
  GenericLinuxImage,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  ISecurityGroup,
  IVpc,
  SubnetType,
} from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { BaseStackProps } from './base-stack-props';

interface EC2StackProps extends BaseStackProps {
  vpc: IVpc;
  webSG: ISecurityGroup;
}

export class Ec2Stack extends cdk.Stack {
  publicIp: string;

  constructor(scope: cdk.Construct, id: string, props: EC2StackProps) {
    super(scope, id, props);
    const { context, vpc, webSG } = props;

    const machineImage = new GenericLinuxImage({
      [this.region]: 'ami-0f11959bc5f4b8cd6',
    });

    const instanceId = `${context.appName}-instance`;

    const instance = new Instance(this, instanceId, {
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MEDIUM),
      machineImage,
      vpc,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      allowAllOutbound: true,
      instanceName: context.appName,
      securityGroup: webSG,
    });

    instance.addUserData(`echo '${context.sshKey}' >> /home/deploy/.ssh/authorized_keys`);
    const eip = new CfnEIP(this, 'ec2Eip');

    const ec2Assoc = new CfnEIPAssociation(this, 'Ec2Assciation', {
      eip: eip.ref,
      instanceId: instance.instanceId,
    });

    cdk.Tags.of(this).add('Name', instanceId, {
      includeResourceTypes: ['AWS::EC2::Instance'],
    });

    this.publicIp = instance.instancePublicIp;

    new cdk.CfnOutput(this, 'PublicIp', {
      value: instance.instancePublicIp,
      description: 'public ip of instance',
      exportName: 'ec2-public-ip',
    });
  }
}
