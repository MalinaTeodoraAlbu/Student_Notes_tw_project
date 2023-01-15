import React from "react";
import { Link } from "react-router-dom"
import {
  BrowserRouter,
  Link as A
} from "react-router-dom";
import store from "./store/store";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const userId = localStorage.getItem('userId');

const NavBar= () => {
  const location = useLocation();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);

  const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch(`http://localhost:8081/notite-api/${userId}/notes/users`);
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotes();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowList(true);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    store.dispatch({ type: "logOut" });
    window.location.href = '/';
}

return (
  <nav className="navbar">
  <h1>Lavander Notes</h1>
  {location.pathname === "/" ? null : (
    <>
      <ul>
        <li>
          <A className="links" to="/personalFolders">Personal Folders</A>
        </li>
        <li>
          <A className="links" to="/sharedFolders">Shared Folders</A>
        </li>
        <li>
        <A className="links" to="/account">Account</A>
        </li>
        <li>
        <A className="links" to="/" onClick={handleLogout}>Logout</A>
        </li>
      </ul>
      <ul className="navnavbar-navnavbar-right">
        <li>
          <input
                
                type="text"
                placeholder="Search notes..."
                onClick={() => setShowList(!showList)}
                onChange={handleSearchChange}
              />
              {showList ? (
          <div className="note-list">
             {error ? (<p>{error}</p>) : (
           <ul >
           {filteredNotes.map((note) => (
             <li key={note.id}>
               <Link to={`/viewnotes/${note.id}`}>{note.title}</Link>
             </li>
           ))}
         </ul>
          )}
        </div>
      ) : null}
        </li>
      </ul>
    </>
  )}
</nav>
);}

export default NavBar;