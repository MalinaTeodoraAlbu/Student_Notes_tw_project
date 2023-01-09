import * as React from 'react';
import "./styles/style.css"
import {useState, useEffect} from 'react';
import axios from 'axios';


function PersonalFolder() {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  return (  
      <div className='page_continut'>
      <div className="sidebar">
           <FolderList userId={1} onFolderSelect={setSelectedFolderId}/>
      <button >Add new folder</button>
       </div>

       <div className="Notes_Container">
       {selectedFolderId && <NoteList folderId={selectedFolderId} />}
       </div>
</div>
  );
}

function FolderList(props) {
  const [folders, setFolders] = useState([]);
  const userId = props.userId;
  const onFolderSelect = props.onFolderSelect;
  useEffect(() => {
    axios.get(`http://localhost:8081/notite-api/${userId}/UserFolder`)  // Make sure to include the correct URL
      .then(res => setFolders(res.data))
      .catch(err => console.error(err));
  }, []);
  const personalFolders = folders.filter(folder => folder.UserFolder.tip_stare === 'personal');
  return (
    <div>
      <ul>
        {personalFolders.map(folder => (
          <li key={folder.id}>
            <button onClick={() => onFolderSelect(folder.id)}>
              {folder.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


function NoteList(props) {
  const [notes, setNotes] = useState([]);
  const folderId = props.folderId;

  useEffect(() => {
    axios.get(`http://localhost:8081/notite-api/${folderId}/notes`) 
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {notes.map(note => (
        <div className="note" key={note.id}>
          <h3 className="note-title">{note.title}</h3>
          <div className="note-tags">{note.tag}</div>
          <div className="note-content">{note.context}</div>
        </div>
      ))}
    </div>
  );
}


export default PersonalFolder;