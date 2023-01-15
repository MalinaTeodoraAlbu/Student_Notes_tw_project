import { useState } from "react";
import "./styles/login.css"
import store from "./store/store";
import { useSelector, useDispatch } from 'react-redux';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userId = useSelector((state) => state.idUser);
  const isLoggedIn = useSelector( (state) => state.isLoggedIn);
  const dispatch = useDispatch();
    const login = () => {
      fetch("http://localhost:8081/notite-api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
            if (data.success === true) {   
              const action = { type: "logIn", idUser: data.userId};
              store.dispatch(action);
              console.log(userId);
              localStorage.setItem("userId", data.userId);
              localStorage.setItem("token", data.token);
              window.location.href = '/personalFolders/';
            } else {
              alert("Invalid email or password");
            }
        })
        .catch((error) => console.error("Error:", error));
    };
  
    return ( 
        <div className="container">
            <div className="containerLog">
                <div className="border"> 
                    <h1 className="login">LOGIN</h1>
                </div>
                    <input className="inputLogin" 
                    type="email" 
                    id="login_input_email" 
                    placeholder="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input className="inputLogin" 
                    type="password" id="login_input" 
                    placeholder="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button onClick={login}>Login</button>
            </div>
        </div>
     );
}
 
export default Login;