import { SSTConfig } from "sst";
import { API } from "./stacks/ApiStack";
import { Frontend } from "./stacks/FrontendStack";
import { Storage } from "./stacks/StorageStack";
import { IAM } from "./stacks/IamStack";

export default {
  config(_input) {
    return {
      name: "student-assignments",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app
      .stack(Storage)
      .stack(API)
      .stack(Frontend)
      .stack(IAM);
  }
} satisfies SSTConfig;
