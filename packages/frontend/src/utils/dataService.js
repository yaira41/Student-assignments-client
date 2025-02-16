const dataService = (function () {
  async function fetchWithErrorHandling(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  }

  return {
    getAllData,
    getClassesOptions,
    getStudent,
    getClassesNumbers,
    getClassroom,
    getTeachersAuthZ,
    writeNewExcel,
    updateClassesNumbers,
    updateTeachersAuthZ,
  };

  async function getStudent(user, classroom) {
    return (
      await fetchWithErrorHandling(
        `${process.env.REACT_APP_API_URL}/api/Students/Student/${user.id}?classroom=${classroom}`
      )
    ).json();
  }

  async function getAllData(classroom) {
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/tabs/${classroom}`
    );
  }

  async function getClassroom(classroomId) {
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/Classes/Class/${classroomId}`
    );
  }

  async function getClassesOptions() {
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/tabs/כיתות?_format=list`
    );
  }

  async function getClassesNumbers() {
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/Classes/classesNumbers`
    );
  }

  async function getTeachersAuthZ(teacherId) {
    const url = new URL(
      `${process.env.REACT_APP_API_URL}/api/Teachers/TeachersAuthZ`
    );

    if (teacherId) {
      url.searchParams.append("teacherId", teacherId);
    }

    return await fetchWithErrorHandling(url);
  }

  async function writeNewExcel(classroom, data) {
    const trimedClassroom = classroom.replaceAll(" ", "");
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/class/${trimedClassroom}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async function updateClassesNumbers(data) {
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/Classes/classesNumbers`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async function updateTeachersAuthZ(data) {
    return await fetchWithErrorHandling(
      `${process.env.REACT_APP_API_URL}/api/Teachers/TeachersAuthZ`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }
})();

export default dataService;
