import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { schema } from "../utils/schema";
import SelectClass from './selectClass/SelectClass';
import dataService from "../utils/dataService";
import { classes, specialId } from "../utils/utils";
import './login.css';

function Login(){
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState('');
  const [unvalidStdent, setUnvalidStudent] = useState('');
  const [amountOfClasses, setAmountOfClasses] = useState([]);
  const [amountOfAllClasses, setAmountOfAllClasses] = useState({});
  const [classNumber, setClassNumber] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await dataService.getClassesNumbers();
      setAmountOfAllClasses(response);
    }
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  },[]);

  useEffect(() => {
    if(classroom){
      const a = [];
      for (let index = 1; index <= amountOfAllClasses[classroom]; index++) {
        a.push(index);
      }
      setAmountOfClasses(a);
    }
  },[classroom])

  async function onSubmit(values) {
    const loader = document.querySelector('#loading');
    const button = document.querySelector('button');
    loader.classList.add('display');
    button.classList.add('hide');
    if (values.id === specialId){
      navigate('/managerRoom', {});
    }
    try {
      const fullClass = classroom + classNumber;
      const user = await dataService.getStudent(values, fullClass);
      if(user){
        loader.classList.remove('display');
        navigate('/gradesOverView', {state: user});
      }
    } catch (error) {
      loader.classList.remove('display');
      button.classList.remove('hide');
      setUnvalidStudent('שגיאה בנתונים, אנא נסו שנית')      
    }
  };

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
            console.log('NAN');
          }
          e.target.value = e.target.value.trim();
          handleChange(e);
        }}
        id="id"
        type="id"
        placeholder="תעודת זהות"
        onBlur={handleBlur}
        className={errors.id && touched.id ? "input-error" : ""}
      />
      {errors.id && touched.id && <p className="error"> {errors.id} </p>}

        <div style={{display: 'flex', flexDirection: 'column'}}>
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
          <button disabled={ errors.id || values.id === '' || classroom === ''} type="submit">
            התחברי
          </button>
        </div>
      </div>
      {unvalidStdent && <h5> {unvalidStdent} </h5>}
    </form>
  );
};
export default Login;
