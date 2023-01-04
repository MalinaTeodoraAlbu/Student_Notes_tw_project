import React from "react";
import {
  BrowserRouter,
  Link as A
} from "react-router-dom";


const NavBar= () => {
    return (
        <nav className="navbar">

            <h1 > Lavander Notes</h1>
          <ul>
            <li>
              <A className="links" to="/">Home</A>
            </li>
            <li>
              <A className="links" to="/personalFolders">Personal Folders</A>
            </li>
            <li>
              <A className="links" to="/sharedFolders">Shared Folders</A>
            </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li>
              
              <A className="links" to="/account">Account</A>
              <A className="links" to="/">Logout</A>
            </li>
          </ul>

        </nav>

    );
}

export default NavBar;