import { StackContext, Bucket } from "sst/constructs";

export function Storage({ stack }: StackContext) {
  const bucket = new Bucket(stack, "student-assignment-class-bucket");

  stack.addOutputs({
    bucketName: bucket.bucketName,
    bucketArn: bucket.bucketArn,
  });

  return {
    bucket,
  };
}
