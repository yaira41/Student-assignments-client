import axios from "axios";
const communicationService = (function () {
  return {
    get,
    post,
  };

  function post(data, url) {
    // const parsedData = JSON.stringify(data);
    //const headers
    const request = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const body = {
      data: JSON.stringify(data, null, 2),
    };

    return axios.post(url, body).then((response) => response.json());
  }

  function get(url) {
    return axios.get(url).then((response) => response.data);
  }
})();

export default communicationService;
