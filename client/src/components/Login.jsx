import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import { schema } from "../utils/schema";
import SelectClass from './selectClass/SelectClass';
import dataService from "../utils/dataService";
import './login.css';

function Login(){
  const navigate = useNavigate();
  // const [classes, setClasses] = useState([]);
  const [classroom, setClassroom] = useState('');

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     let response = await dataService.getClassesOptions();
  //     console.log(response);
  //     // response = await response.json();
  //     setClasses(response['כיתה'])
  //   }

  //   fetchMyAPI();
  // },[])

  async function onSubmit(values) {
    if (values.name === 'manager' && values.id === '000000000'){
      navigate('/managerRoom', {});
    }
    let user = await dataService.getStudent(values, classroom);
    if(user){
      navigate('/a2', {state: user});
    }
    else{
      console.log('unvaild user');
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        id: "",
      },
      validationSchema: schema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name">שם מלא</label>
      <input
        value={values.name}
        onChange={handleChange}
        id="name"
        type="name"
        placeholder="שם מלא"
        onBlur={handleBlur}
        className={errors.name && touched.name ? "input-error" : ""}
      />
      {errors.name && touched.name && <p className="error"> {errors.name} </p>}
      <label htmlFor="id">תעודת זהות</label>
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

    <SelectClass
      classroom={classroom}
      setClassroom={setClassroom}
    />

      <button disabled={ errors.id || values.id === '' || errors.name || values.name === '' || classroom === ''} type="submit">
        אשר
      </button>
    </form>
  );
};
export default Login;
