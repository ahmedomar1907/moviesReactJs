import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


export default function Profile({logOut}) {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });

  const [loading, setLoading] = useState(true); // إضافة حالة للتحميل



  async function getProfileData() {
    setLoading(true); // تحديد أن التحميل قد بدأ
    try {
      // الحصول على الـ token من localStorage
      let token = localStorage.getItem('userToken');

      // إضافة الـ token إلى الـ headers للطلب
      let { data } = await Axios.get('https://vcare.integration25.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}` // استخدام Bearer Token
        }
      });

      if (data.message === 'Successful query') {
        // بما أن data.data هو عبارة عن مصفوفة، نأخذ العنصر الأول منها
        setProfileData(data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false); // إيقاف التحميل
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return <>
      {loading ?  <i className="fas fa-spinner fa-spin fa-5x  position-absolute top-50 start-50 translate-middle "></i> : 
        <>
        <div className='position-relative' >
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone: {profileData.phone}</p>
          <p>Gender: {profileData.gender}</p>
          <Link to='/' className='btn btn-info position-absolute top-0 end-0 mb-5 ' ><i class="fa-solid fa-circle-left"></i> to home</Link>
        </div>


        </>
      }
    </>
}
