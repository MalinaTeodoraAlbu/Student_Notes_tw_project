import "./styles/account.css"
import accPic from './media/icons8-user-64.png'
import { useState, useEffect } from 'react';


const Account = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        university: "",
        year: "",
        email: "",
        password: ""
      });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:8081/notite-api/users/${userId}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(error => console.log(error));
  }, []);

  return (  

    <div className="account">
        <div className="borderProfile">
            <h1>Account Details</h1>
        </div>
        <div className="profile">
            <img src={accPic} alt="Profile Picture"></img>
            <h2>{userData.firstName + " " + userData.lastName}</h2>
        </div>
        <div className="separator"></div>
        <div className="details_block">
            <div className="details">
                <h3>First Name</h3>
                <input value={userData.firstName} readOnly={true}/>
                <h3>Last Name</h3>
                <input value={userData.lastName} readOnly={true}/>
                <h3>University</h3>
                <input value={userData.university} readOnly={true}/>
            </div>
            <div className="details">
                <h3>Year</h3>
                <input value={userData.year} readOnly={true}/>
                <h3>Email</h3>
                <input value={userData.email} readOnly={true}/>
                <h3>Password</h3>
                <input type='password' value={userData.password} readOnly={true}/>
                </div>
            </div>

        </div>

    );
}
 
export default Account;