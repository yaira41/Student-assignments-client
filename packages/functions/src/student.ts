import { ApiHandler } from "sst/node/api";
import utils from "@student-assignments/core/utils";

export const get = ApiHandler(async (_evt) => {
  const student = {
    id: _evt.pathParameters?.id,
    classroom: _evt.queryStringParameters?.classroom,
  };

  const data = await utils.readData(student.classroom);
  const studentDetails = data.find((e: any) => e["ת.ז."] == student.id);

  if (!studentDetails) {
    return {
      statusCode: 404,
      body: "אין תלמידה כזו",
    };
  }

  delete studentDetails["__EMPTY"];
  const studentKeys = Object.keys(studentDetails);

  const relevantSubjects = utils.getRelevantSubjects(studentKeys, data);
  relevantSubjects.push(studentDetails);

  return {
    statusCode: 200,
    body: JSON.stringify(relevantSubjects),
  };
});
