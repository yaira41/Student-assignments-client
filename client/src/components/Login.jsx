import { useFormik } from "formik";
import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import { schema } from "../utils/schema";
import SelectClass from './selectClass/SelectClass';
import dataService from "../utils/dataService";
import './login.css';

function Login(){
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState('');
  const [unvalidStdent, setUnvalidStudent] = useState('');

  async function onSubmit(values) {
    const loader = document.querySelector('#loading');
    const button = document.querySelector('button');
    loader.classList.add('display');
    button.classList.add('hide');
    if (values.id === '301442687'){
      navigate('/managerRoom', {});
    }
    try {
      let user = await dataService.getStudent(values, classroom);
      if(user){
        loader.classList.remove('display');
        navigate('/a2', {state: user});
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
        name: "",
      },
      validationSchema: schema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {errors.name && touched.name && <p className="error"> {errors.name} </p>}
      <input
        value={values.id}
        onChange={handleChange}
        id="id"
        type="id"
        placeholder="תעודת זהות"
        onBlur={handleBlur}
        className={errors.id && touched.id ? "input-error" : ""}
      />
      {errors.id && touched.id && <p className="error"> {errors.id} </p>}

      <div className="end">
        <SelectClass
          classroom={classroom}
          setClassroom={setClassroom}
          />

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
