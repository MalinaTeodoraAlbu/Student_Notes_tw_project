import "./styles/account.css"

const Account = () => {
    return (  
        <div className="account">
            <div className="borderProfile">
                <h1>Account Details</h1>
            </div>
            <div className="profile">
                <img src={"/mypic.jpg"} alt="ProfilePicture"></img>
                <h2>User Name</h2>
            </div>
            <div className="separator"></div>
            <div className="details">
                <h3>First Name</h3>
                <input></input>
                <h3>Last Name</h3>
                <input></input>
                <h3>University</h3>
                <input></input>
                <h3>Year</h3>
                <input></input>
                <h3>Email</h3>
                <input></input>
                <h3>Password</h3>
                <input type="password"></input>
                <h3>New Password</h3>
                <input type="password"></input>
            </div>
            <button>Reset Password</button>
        </div>
        
    );
}
 
export default Account;