import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface AwsCdkMainRouteTableProps {
  // Define construct properties here
}

export class AwsCdkMainRouteTable extends Construct {

  constructor(scope: Construct, id: string, props: AwsCdkMainRouteTableProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkMainRouteTableQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
