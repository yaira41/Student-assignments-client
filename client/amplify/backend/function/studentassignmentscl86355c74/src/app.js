const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const utils = require("./utils/utils.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const errorNotFound = "The post with the given ID was not found";

app.route("/").get((req, res) => {
  res.write("hello");
  console.log(req);
  res.end();
});

app.route("/api/Class/:id").post(async (req, res) => {
  if (req.params.id) {
    let data = req.body.data;
    await utils.writeNewData(data, req.params.id);
    res.status(200).send();
  } else {
    res.status(400).send("error");
  }
});

app
  .route("/api/Classes/classesNumbers")
  .get(async (req, res) => {
    const classesNumbers = await utils.readData();
    classesNumbers
      ? res.send(classesNumbers)
      : res.status(404).send(errorNotFound);
  })
  .post(async (req, res) => {
    let data = req.body;
    await utils.writeNewData(data);
    res.status(200).send();
  });

app.route("/api/Students/Student/:id").get(async (req, res) => {
  const student = {
    id: req.params.id,
    classroom: req.query.classroom,
  };

  const data = await utils.readData(student.classroom);
  const studentDetails = data.find((e) => e["ת.ז."] == student.id);

  if (!studentDetails) {
    res.status(404).send("אין תלמידה כזו");
  }

  delete studentDetails["__EMPTY"];
  const studentKeys = Object.keys(studentDetails);

  const relevantSubjects = utils.getRelevantSubjects(studentKeys, data);
  relevantSubjects.push(studentDetails);

  res.send(relevantSubjects);
});

app.listen(3030, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
