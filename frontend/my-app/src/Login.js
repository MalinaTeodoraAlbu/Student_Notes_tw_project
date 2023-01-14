import "./styles/login.css"

const Login = () => {
    return ( 
        <div className="page_continut" >
            <div className="containerLog">
                    <div className="borderWhite"> 
                    <p >LOGIN</p></div>
                    <div className="input_container">
                    
                    <input className="inputLogin" type="text" id="login_input" placeholder="email"></input>
                    
                    <input className="inputLogin" type="text" id="login_input" placeholder="password"></input>
                    <button>Login</button>
                    </div>
                    </div>
            <img src="" alt=""></img>
        </div>
     );
}
 
export default Login;