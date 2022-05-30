import { IRouteTable, IVpc } from "aws-cdk-lib/aws-ec2";
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  AwsSdkCall,
  PhysicalResourceId,
} from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";

/**
 * Main route table.
 */
export class MainRouteTable extends Construct {
  private constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /**
   * Import the main route table from VPC.
   */
  public static fromVpc(scope: Construct, id: string, vpc: IVpc): IRouteTable {
    const describeRouteTables: AwsSdkCall = {
      service: "EC2",
      action: "describeRouteTables",
      parameters: {
        Filters: [
          {
            Name: "association.main",
            Values: ["true"],
          },
          {
            Name: "vpc-id",
            Values: [vpc.vpcId],
          },
        ],
      },
      physicalResourceId: PhysicalResourceId.of(vpc.vpcId),
    };
    const describeRouteTablesResult = new AwsCustomResource(scope, id, {
      resourceType: "Custom::DescribeRouteTables",
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: ["*"],
      }),
      installLatestAwsSdk: false,
      onCreate: describeRouteTables,
      onUpdate: describeRouteTables,
    });
    return {
      routeTableId: describeRouteTablesResult.getResponseField(
        "RouteTables.0.RouteTableId"
      ),
    };
  }
}
