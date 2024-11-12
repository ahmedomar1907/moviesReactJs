import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({saveUserData}) {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function sendUserDataToApi() {
    try {
      let { data } = await Axios.post(`https://vcare.integration25.com/api/auth/login`, user);
      if (data.message === 'Loggedin Successfuly') {
        setLoading(false);
        localStorage.setItem('userToken' , data.data.token)
        localStorage.setItem('userName' , data.data.username)
        saveUserData();
        navigate('/');
      }
    } catch (error) {
      if(error.response.data.message === 'Credentials doesn`t match our records')
      {
        setError('Incorrect Password'); // تخزين الأخطاء من الـ API
      }
      setLoading(false);
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
    });
    return scheme.validate(user, { abortEarly: false });
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setLoading(true);
    let validation = validateRegisterForm();
    if (validation.error) {
      setErrorList(validation.error.details);
      setLoading(false);
    } else {
      sendUserDataToApi();
      setLoading(true);
    }
    // setLoading(true);
  }

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);

    // إزالة رسالة الخطأ عند تعديل الحقل
    let myErrorList = errorList.filter((error) => error.context.label !== e.target.name);
    setErrorList(myErrorList);
  }

  return (
    <>
      <div className="w-75 mx-auto py-3">
        <h3>Login Form</h3>

        {/* {error.name && <small className="text-danger">{error.name}</small>} */}
        {error.email && <small className="text-danger">{error.email}</small>}
        {/* {error.phone && <small className="text-danger">{error.phone}</small>} */}
        {/* {error.gender && <small className="text-danger">{error.gender}</small>} */}
        {/* {error.password && <small className="text-danger">{error.password}</small>} */}

        <form onSubmit={submitLoginForm}>

          <label htmlFor="email">Email:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="email" name="email" id="email" />
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'email')[0]?.message}</p>

          <label htmlFor="password">Password:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="password" name="password" id="password" />
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'password')[0]?.message}</p>
          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn btn-info">
            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
}