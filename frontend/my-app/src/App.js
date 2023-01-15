import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Account from './Account';
import "./styles/App.css"
import Login from './Login'
import NavBar from './Navbar';
import PersonalFolder from './PersonalFolders';
import SharedFolder from './SharedFolder.js';
import Note from './Notes.js';
import ViewNote from './ViewNote';
import AccesFolder from './AccesFolder'


export default function App() {

  return (
    <div className="App">
      <div className="nav_context">
      <NavBar></NavBar>
      </div>
      <div className="content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/personalFolders" element={<PersonalFolder />} />
        <Route path="/sharedFolders" element={<SharedFolder/>} />
        <Route path="/account" element={<Account />} />
        <Route path='/notes' element={<Note/>}/>
        <Route path="/viewNotes/:noteId" element={<ViewNote />} />
        <Route path="/accesFolder/:folderId" element={<AccesFolder />} />
        <Route path='/notes/:noteId' element={<Note/>}/>
      </Routes>
      </div>
    </div>
  );
}