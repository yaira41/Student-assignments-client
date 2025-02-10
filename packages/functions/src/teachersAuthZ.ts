import { ApiHandler } from "sst/node/api";
import utils from "@student-assignments/core/utils";

type TeacherPermission = { idNumber: string; selectedClasses: Array<string> };

export const create = ApiHandler(async (_evt) => {
  let data = _evt?.body;
  await utils.writeNewData(data, "teachersAuthZ");
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
  };
});

export const get = ApiHandler(async (evt) => {
  try {
    const teacherId = evt.queryStringParameters?.teacherId;
    const teachersAuthZ = await utils.readData("teachersAuthZ");

    if (!teachersAuthZ) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Something went wrong, Please try again later.",
        }),
        headers: { "content-type": "application/json" },
      };
    }

    // אם קיים teacherId, מחפשים מורה ספציפי
    if (teacherId) {
      const teacher: TeacherPermission = JSON.parse(teachersAuthZ).find(
        (t: TeacherPermission) => t.idNumber === teacherId
      );

      if (!teacher) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Teacher not found" }),
          headers: { "content-type": "application/json" },
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(teacher.selectedClasses),
        headers: { "content-type": "application/json" },
      };
    }

    // אם לא נשלח teacherId, מחזירים את כל המורים
    return {
      statusCode: 200,
      body: teachersAuthZ,
      headers: { "content-type": "application/json" },
    };
  } catch (error) {
    console.error("Error fetching teachersAuthZ:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
      headers: { "content-type": "application/json" },
    };
  }
});
