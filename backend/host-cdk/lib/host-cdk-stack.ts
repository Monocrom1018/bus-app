import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';



export interface Context {
  appName: string | undefined;
  url: string;
}



interface HostStackProps extends cdk.StackProps {
  context: Context
}




export class HostCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: HostStackProps) {
    super(scope, id, props);

    const { context } = props
    const hostedZone = new route53.HostedZone(this, `${id}HostZone`, {
      zoneName: context.url!
    })
    
    new cdk.CfnOutput(this, "URL", { value: hostedZone.zoneName })
    new cdk.CfnOutput(this, "Name Server", { value: "\n" + cdk.Fn.join("\n", hostedZone.hostedZoneNameServers || [])})
  }
}
