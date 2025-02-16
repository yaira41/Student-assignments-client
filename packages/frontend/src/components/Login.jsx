import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { schema } from "../utils/schema";
import SelectClass from "./selectClass/SelectClass";
import dataService from "../utils/dataService";
import { classes, specialId } from "../utils/utils";
import "./login.css";

function Login({ userType }) {
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState("");
  const [unvalidStdent, setUnvalidStudent] = useState("");
  const [amountOfAllClasses, setAmountOfAllClasses] = useState({});
  const [classNumber, setClassNumber] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const amountOfClassData = await (
          await dataService.getClassesNumbers()
        ).json();
        setAmountOfAllClasses(amountOfClassData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const amountOfClasses = useMemo(() => {
    if (!classroom || !amountOfAllClasses[classroom]) return [];
    return Array.from(
      { length: amountOfAllClasses[classroom] },
      (_, i) => i + 1
    );
  }, [classroom, amountOfAllClasses]);

  async function onSubmit(values) {
    setUnvalidStudent("");
    const loader = document.querySelector("#loading");
    const button = document.querySelector("button");
    loader.classList.add("display");
    button.classList.add("hide");
    if (values.id === specialId) {
      navigate("/managerRoom", {});
    }
    try {
      const fullClass = classroom + classNumber;
      if (userType === "מורה") {
        const teacherAllowedClasses = await (
          await dataService.getTeachersAuthZ(values.id)
        ).json();

        if (
          teacherAllowedClasses &&
          teacherAllowedClasses.includes(fullClass)
        ) {
          navigate("/teacherView", { state: fullClass });
        } else {
          setUnvalidStudent("שגיאה בנתונים, אנא נסו שנית");
        }
      } else {
        const user = await dataService.getStudent(values, fullClass);
        if (user) {
          navigate("/gradesOverView", { state: user });
        }
      }
    } catch (error) {
      button.classList.remove("hide");
      setUnvalidStudent("שגיאה בנתונים, אנא נסו שנית");
    } finally {
      loader.classList.remove("display");
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        id: "",
      },
      validationSchema: schema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {errors.name && touched.name && <p className="error"> {errors.name} </p>}
      <input
        value={values.id}
        onChange={(e) => {
          if (isNaN(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1);
            console.log("NAN");
          }
          e.target.value = e.target.value.trim();
          handleChange(e);
        }}
        id="id"
        type="id"
        maxLength="9"
        placeholder="תעודת זהות"
        onBlur={handleBlur}
        className={errors.id && touched.id ? "input-error" : ""}
      />

      {errors.id && touched.id && <p className="error"> {errors.id} </p>}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <SelectClass
          label={"כיתה"}
          currentValue={classroom}
          values={classes}
          setValue={setClassroom}
        />
        <SelectClass
          label={"מספר כיתה"}
          currentValue={classNumber}
          values={amountOfClasses}
          setValue={setClassNumber}
        />
      </div>

      <div className="end">
        <div className="button-container">
          <div id="loading"></div>
          <button
            className="login-button"
            disabled={
              errors.id ||
              values.id === "" ||
              classroom === "" ||
              classNumber === ""
            }
            type="submit"
          >
            התחברי
          </button>
        </div>
      </div>
      {unvalidStdent && <h5> {unvalidStdent} </h5>}
    </form>
  );
}
export default Login;
