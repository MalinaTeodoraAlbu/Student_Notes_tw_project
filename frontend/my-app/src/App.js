import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Account from './Account';
import "./styles/App.css"
import Home from './home';
import NavBar from './Navbar';
import PersonalFolder from './PersonalFolders';
import SharedFolder from './SharedFolder.js';
import Note from './Notes.js';
import ViewNote from './ViewNote';
import { useParams } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <div className="nav_context">
      <NavBar></NavBar>
      </div>

      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalFolders" element={<PersonalFolder />} />
        <Route path="/sharedFolders" element={<SharedFolder/>} />
        <Route path="/account" element={<Account />} />
        <Route path='/notes' element={<Note/>}/>
        <Route path="/viewNotes/:noteId" element={<ViewNote />} />
      </Routes>
      </div>
    </div>
  );
}