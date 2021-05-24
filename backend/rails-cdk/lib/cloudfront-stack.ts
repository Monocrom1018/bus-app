import * as route53 from '@aws-cdk/aws-route53';
import * as cdk from '@aws-cdk/core';
import { BaseStackProps } from './base-stack-props';

interface Route53Props extends BaseStackProps {
  publicIp: string;
}

export class CloudfrontStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Route53Props) {
    super(scope, id, props);

    const { context, publicIp } = props;

    const hostedZone = route53.HostedZone.fromLookup(this, `${context.appName}HostZone`, {
      domainName: context.domain!,
    });

    // const certificate = new acm.Certificate(this, `${context.appName}-acm`, {
    //   domainName: context.url!,
    //   validation: acm.CertificateValidation.fromDns(hostedZone)
    // })

    const domainNames = [context.url!];

    new route53.ARecord(this, `${context.appName}ARecord`, {
      zone: hostedZone,
      recordName: context.url,
      target: {
        values: [publicIp],
      },
    });

    // const distribution = new cloudfront.Distribution(
    //   this, `${context.appName}Distribution`,
    //   {
    //     certificate,
    //     domainNames,
    //     defaultRootObject: "",
    //     defaultBehavior: {
    //       viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //       origin: new origins.HttpOrigin(publicIp),
    //       allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
    //       cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
    //       compress: true,
    //     }
    //   }
    // )
  }
}
