// App.js
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [userData, setUserData] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const googleUserInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          });
          console.log("Aefge");
          // console.log(profile.picture);
          setProfile(googleUserInfo.data);
          console.log(googleUserInfo.data.email);
          const userDataResponse = await axios.get(`http://localhost:3001/api/user-data/${googleUserInfo.data.email}`);
          console.log('aegg');
          setUserData(userDataResponse.data);
          console.log('User Data:', userDataResponse.data);

        } catch (error) {
          console.error('Error fetching data:', error);

        }
      }
    };

    fetchData();
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUserData(null);
  };

  return (
    <div
    style={{
      textAlign: 'center',
      marginTop: '20px',
      backgroundImage: `url('https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/06/shutterstock_660491578-e1529632505461.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', margin: 'auto' }}>
      <h1 style={{ fontSize: '3.4em', color: 'black' }}>WELCOME TO LUCKNOW METRO SERVICES</h1>
      <br />
      <br />
    </div>
    {profile ? (
  <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', backgroundColor: 'white', maxWidth: '500px', margin: 'auto' }}>
    <img src={profile.picture} style={{ borderRadius: '50%', marginBottom: '10px' }} />
    <h3>User Information</h3>
    <p style={{ fontWeight: 'bold' }}>Username: {profile.name}</p>
    <p style={{ fontWeight: 'bold' }}>Email Address: {profile.email}</p>
    {userData ? (
      <>
        <p style={{ fontWeight: 'bold' }}>Phone Number: {userData['phone number']}</p>
        <p style={{ fontWeight: 'bold' }}>Last Exit: {userData['exit location']}</p>
        <p style={{ fontWeight: 'bold' }}>Last Entry: {userData['entry location']}</p>
        <h2 style={{ color: 'green', marginTop: '10px' }}>Balance due is Rs "{userData.balance}"</h2>
      </>
    ) : null}
    <br />
    <button
      style={{
        backgroundColor: '#4285f4',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Pay Balance
    </button>
    <br/>
    <br/>
    <button
      onClick={logOut}
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={() => login()}
          style={{
            backgroundColor: '#4285f4',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign in with Google 🚀
        </button>
      )}
    </div>
  );
}

export default App;
