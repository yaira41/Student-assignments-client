import config from "./config";
import communicationService from "./communicatorService";

const dataService = (function () {
  return {
    getAllData,
    getClassesOptions,
    getStudent,
    writeNewExcel,
  };

  async function getStudent(user, classroom) {
    return await communicationService.get(
      config.backendUrl +
        "/Students/Student/" +
        user.id +
        "?classroom=" +
        classroom +
        "&name=" +
        user.name
    );

    let studentDetails = await getAllData(classroom);

    let usdd;
    // data.every((element) => {
    //   if (
    //     element["שם פרטי"] === user["name"] &&
    //     element["ת.ז."] === user["id"]
    //   ) {
    //     usdd = element;
    //     return false;
    //   }

    //   return true;
    // });
    // data.array.forEach((element) => {
    //   if (element[0] === userName && element[1] === id) return element;
    // });
    return usdd;
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

  // function orderData(data) {
  //   data.every((element) => {
  //     if (element["מספר תלמידה"] === "") {
  //     }
  //   });
  // }
})();

export default dataService;
