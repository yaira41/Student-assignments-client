import { Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const dataService = (function () {
  return {
    getAllData,
    getClassesOptions,
    getStudent,
    writeNewExcel,
  };

  async function getStudent(user, classroom) {
    return await API.get(
      "studentsapi",
      `/api/Students/Student/${user.id}?classroom=${classroom}`
    );
  }

  async function getAllData(classroom) {
    return await API.get("studentsapi", `/api/tabs/${classroom}`);
  }

  async function getClassesOptions() {
    return await API.get("studentsapi", "/api/tabs/כיתות?_format=list");
  }

  async function writeNewExcel(classroom, data) {
    return await API.post("studentsapi", `/api/class/${classroom}`, {
      body: { data },
    });
  }
})();

export default dataService;
