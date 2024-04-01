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
    return (
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/Students/Student/${user.id}?classroom=${classroom}`
      )
    ).json();
  }

  async function getAllData(classroom) {
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/tabs/${classroom}`
    );
  }

  async function getClassesOptions() {
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/tabs/כיתות?_format=list`
    );
  }

  async function getClassesNumbers() {
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/Classes/classesNumbers`
    );
  }

  async function writeNewExcel(classroom, data) {
    const trimedClassroom = classroom.replaceAll(" ", "");
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/class/${trimedClassroom}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async function updateClassesNumbers(data) {
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/Classes/classesNumbers`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }
})();

export default dataService;
