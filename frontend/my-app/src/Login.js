import "./styles/login.css"

const Login = () => {
    return ( 
        <div className="container">
            <div className="containerLog">
                <div className="border"> 
                    <h1 className="login">LOGIN</h1>
                </div>
                    <input className="inputLogin" type="text" id="login_input" placeholder="email"></input>
                    <input className="inputLogin" type="text" id="login_input" placeholder="password"></input>
                    <button>Login</button>
            </div>
        </div>
     );
}
 
export default Login;