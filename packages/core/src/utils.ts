const AWS = require("aws-sdk");

const s3 = new AWS.S3();
const CLASSES_NUMBERS_PATH = "כיתות";

const utils = (function () {
  return {
    writeNewData,
    readData,
    getRelevantSubjects,
  };

  async function writeNewData(data: any, path = CLASSES_NUMBERS_PATH) {
    const classBucketParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${path}.json`,
      Body: JSON.stringify(data),
    };
    await s3.putObject(classBucketParams).promise();
  }

  async function readData(path = CLASSES_NUMBERS_PATH) {
    const classBucketParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${path}.json`,
    };
    const response = await s3.getObject(classBucketParams).promise();
    const fileContent = response.Body.toString("utf-8");
    let fileContentObject = JSON.parse(fileContent);
    return fileContentObject;
  }

  function getRelevantSubjects(keys: any, data: any) {
    const subjects = getOnlySubjects(data);

    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      Object.keys(subject).forEach(function (key) {
        if (!keys.includes(key)) {
          delete subject[key];
        }
      });
    }

    return subjects;
  }

  function getOnlySubjects(data: any) {
    return data.filter((raw: any) => !raw.hasOwnProperty("ת.ז."));
  }
})();

export default utils;
