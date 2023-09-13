import { ApiHandler } from "sst/node/api";
import utils from "@student-assignments/core/utils";

export const create = ApiHandler(async (_evt) => {
  if (_evt.pathParameters?.id) {
    let { data } = JSON.parse(_evt?.body || "");
    await utils.writeNewData(data, _evt.pathParameters?.id);
    return {
      statusCode: 200
    }
  } else {
    return {
      statusCode: 400,
      body: "error"
    }
  }
});

export const createClasses = ApiHandler(async (_evt) => {
  let data = _evt?.body;
  await utils.writeNewData(data);
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    }
  }
});

export const list = ApiHandler(async (_evt) => {
  const classesNumbers = await utils.readData();
  if (classesNumbers) {
    return {
      statusCode: 200,
      body: classesNumbers,
      headers: {
        "content-type": "application/json"
      }
    }
  }

  return {
    statusCode: 404,
    body: "The post with the given ID was not found",
    headers: {
      "content-type": "application/json"
    }
  };
});
