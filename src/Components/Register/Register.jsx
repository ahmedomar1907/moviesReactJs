import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '', // 1 for male, 0 for female
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function sendUserDataToApi() {
    try {
      let { data } = await Axios.post(`https://vcare.integration25.com/api/auth/register`, user);
      if (data.message === 'Loggedin Successfuly') {
        navigate('/login');
        setLoading(false);
      }
    } catch (error) {
      setError(error.response.data.data); // تخزين الأخطاء من الـ API
      setLoading(false);
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      name: Joi.string().min(3).max(10).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
      phone: Joi.number().required(),
      gender: Joi.string(),
      password: Joi.string().min(6).pattern(/^[A-Z][a-z]{6,10}$/),
      password_confirmation: Joi.string()
    });
    return scheme.validate(user, { abortEarly: false });
  }

  function submitRegisterForm(e) {
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
        <h3>Registration Form</h3>


        <form onSubmit={submitRegisterForm}>
          <label htmlFor="name">Name:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="text" name="name" id="name" />
          {error.name && <small className="text-danger">{error.name}</small>}
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'name')[0]?.message}</p>

          <label htmlFor="email">Email:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="email" name="email" id="email" />
          {error.email && <small className="text-danger">{error.email}</small>}
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'email')[0]?.message}</p>

          <label htmlFor="phone">Phone:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="number" name="phone" id="phone" />
          {error.phone && <small className="text-danger">{error.phone}</small>}
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'phone')[0]?.message}</p>

          <label htmlFor="gender">Gender:</label>
          <select onChange={getUserData} className="form-control my-input my-2" name="gender" id="gender">
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
          {error.gender && <small className="text-danger">{error.gender}</small>}
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'gender')[0]?.message}</p>

          <label htmlFor="password">Password:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="password" name="password" id="password" />
          {error.password && <p className="text-danger">{error.password}</p>}
          {/* <p className='text-danger'>{errorList.filter((error) => error.context.label === 'password')[0]?.message}</p> */}
          {errorList.map((error, index) => {
            if (error.context.label === 'password') {
              return <p key={index} className='text-danger'> "password" must start with an uppercase letter and be followed by 6 to 10 lowercase letters </p>;
            }else
            {
              return null; // إضافة هذا السطر لإعادة قيمة null إذا لم يتحقق الشرط
            }
          })}

          <label htmlFor="password_confirmation">Password Confirmation:</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="password" name="password_confirmation" id="password_confirmation" />
          <p className='text-danger'>{errorList.filter((error) => error.context.label === 'password_confirmation')[0]?.message}</p>
          {error.password && <p className="text-danger">{error.password}</p>}

          <button type="submit" className="btn btn-info">
            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}