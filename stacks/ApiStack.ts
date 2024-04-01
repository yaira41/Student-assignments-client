import { StackContext, Api, Bucket, use } from "sst/constructs";
import { Storage } from "./StorageStack";

export function API({ stack }: StackContext) {
  const { bucket } = use(Storage);
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          BUCKET_NAME: bucket.bucketName,
        },
        bind: [bucket]
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /api/Students/Student/{id}": "packages/functions/src/student.get",
      "GET /api/Classes/classesNumbers": "packages/functions/src/class.list",
      "POST /api/Classes/classesNumbers": "packages/functions/src/class.createClasses",
      "POST /api/class/{id}": "packages/functions/src/class.create"
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
