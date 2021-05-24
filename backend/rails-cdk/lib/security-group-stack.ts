import { ISecurityGroup, IVpc, Peer, Port, SecurityGroup } from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { Tags, Construct } from '@aws-cdk/core';
import { BaseStackProps } from './base-stack-props';

interface SecurityGroupStackProps extends BaseStackProps {
  vpc: IVpc;
}

export class SecurityGroupStack extends cdk.Stack {
  webSG: ISecurityGroup;

  rdsSG: ISecurityGroup;

  constructor(scope: cdk.Construct, id: string, props: SecurityGroupStackProps) {
    super(scope, id, props);
    const { context, vpc } = props;
    const webSGName = `${context.appName}-ec2-sg`;
    const webSG = new SecurityGroup(this, webSGName, {
      vpc,
      allowAllOutbound: true,
      securityGroupName: webSGName,
    });
    this.webSG = webSG;
    webSG.addIngressRule(Peer.anyIpv4(), Port.tcp(80));
    webSG.addIngressRule(Peer.anyIpv6(), Port.tcp(80));
    webSG.addIngressRule(Peer.anyIpv4(), Port.tcp(443));
    webSG.addIngressRule(Peer.anyIpv6(), Port.tcp(443));
    webSG.addIngressRule(Peer.ipv4(`${context.myIp}/0`), Port.tcp(22));

    Tags.of(this).add('Name', webSGName, {
      includeResourceTypes: ['AWS::EC2::SecurityGroup'],
    });

    const rdsSGName = `${context.appName}-rds-sg`;
    const rdsSG = new SecurityGroup(this, rdsSGName, {
      vpc,
      securityGroupName: rdsSGName,
    });
    this.rdsSG = rdsSG;
    rdsSG.addIngressRule(webSG, Port.tcp(5432));
    webSG.addIngressRule(rdsSG, Port.tcp(5432));
  }
}
