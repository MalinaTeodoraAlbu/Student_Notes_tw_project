import * as React from 'react';
import "./styles/style.css"
import {useState, useEffect} from 'react';
import axios from 'axios';

const SharedFolder = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [userId] = useState(1);

  const handleSubmit = (folderName_provided) => {
    const folderName = folderName_provided;
    
    axios.post('http://localhost:8081/notite-api/addfolders', {
      title: folderName,
      userId: userId,
    })
      .then((response) => {
        const folderId = response.data.id; 
        axios.post(`http://localhost:8081/notite-api/${userId}/UserFolder/${folderId}`, {
          folderId: folderId,
          userId:userId,
          tip_stare: "shared",
        })
          .then(() => {
            setFolderName('');
            setSelectedFolderId(folderId); // Update selectedFolderId state variable
            refreshFolders();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setFolderName(event.target.value);
  }

  const refreshFolders = () => {
    // Refresh the list of folders
  };

  useEffect(() => {
  
  }, [selectedFolderId]);

  return (  
        <div className='page_continut'>
           <div className='side'>
        <div className="sidebar">
        <FolderList userId={userId} onFolderSelect={setSelectedFolderId} refreshFolders={refreshFolders} />
            
         </div>
        
         <div className="subsidebar">
             <input type="text" onChange={handleChange} value={folderName}></input>
        <button onClick={() => handleSubmit(folderName)}>Add Folder</button>
         </div>
         </div>
         <div className="Notes_Container">
         {selectedFolderId && <NoteList folderId={selectedFolderId} />}
         </div>
 </div>
    );
}
 
const FolderList = (props) => {
  const [folders, setFolders] = useState([]);
  const userId = props.userId;
  const onFolderSelect = props.onFolderSelect;
  const refreshFolders = props.refreshFolders; // Add a prop to refresh the list of folders

  useEffect(() => {
    axios.get(`http://localhost:8081/notite-api/${userId}/UserFolder`)  // Make sure to include the correct URL
      .then(res => setFolders(res.data))
      .catch(err => console.error(err));
  }, [refreshFolders]); // Only re-run the effect if refreshFolders changes

  const SharedFolder = folders.filter(folder => folder.UserFolder.tip_stare === 'shared');

  return (
    <div>
      <ul>
        {SharedFolder.map(folder => (
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
    if (folderId) {
      axios.get(`http://localhost:8081/notite-api/${folderId}/notes`) 
        .then(res => setNotes(res.data))
        .catch(err => console.error(err));
    }
  }, [folderId]);
  if (!folderId) {
    return <div>Select a folder</div>;
  }
  if (notes.length === 0) {
    return <div style={{fontSize: '18px', color: 'blue', marginTop: '20px', marginLeft: '20px'}}>Add a note</div>;
  }

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

export default SharedFolder;