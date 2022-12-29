import config from "./config";
import communicationService from "./communicatorService";
import { Amplify, API } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const dataService = (function () {
  return {
    getAllData,
    getClassesOptions,
    getStudent,
    writeNewExcel,
  };

  async function getStudent(user, classroom) {
    return await API.get("studentsapi",
        `/Students/Student/${user.id}?classroom=${classroom}&name=${user.name}`
        );
  }

  async function getAllData(classroom) {
    return await communicationService.get(
      config.realUrl + "/tabs/" + classroom
    );
  }

  async function getClassesOptions() {
    return await communicationService.get(
      config.realUrl + "/tabs/כיתות?_format=list"
    );
  }

  async function writeNewExcel(classroom, data) {
    return await communicationService.post(
      data,
      config.backendUrl + "/class/" + classroom
    );
  }
})();

export default dataService;
