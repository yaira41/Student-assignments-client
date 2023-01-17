import { Amplify, API } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const dataService = (function () {
  return {
    getAllData,
    getClassesOptions,
    getStudent,
    getClassesNumbers,
    writeNewExcel,
    updateClassesNumbers,
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

  async function getClassesNumbers() {
    return await API.get("studentsapi", "/api/Classes/classesNumbers");
  }

  async function writeNewExcel(classroom, data) {
    const trimedClassroom = classroom.replaceAll(" ", "");
    return await API.post("studentsapi", `/api/class/${trimedClassroom}`, {
      body: { data },
    });
  }

  async function updateClassesNumbers(data) {
    return await API.post("studentsapi", "/api/Classes/classesNumbers", {
      body: data,
    });
  }
})();

export default dataService;
