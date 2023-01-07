import "./styles/login.css"

const Login = () => {
    return ( 
        <div >
            <div className="containerLog">
                    <div className="borderWhite"> 
                    <p >LOGIN</p></div>
                    
                    <p>email</p>
                    <input className="inputLogin" type="text" id="login_input" placeholder="email"></input>
                    <p>password</p>
                    <input className="inputLogin" type="text" id="login_input" placeholder="password"></input>
                    <button>Login</button>
            
                    </div>
            <img src="" alt=""></img>
        </div>
     );
}
 
export default Login;