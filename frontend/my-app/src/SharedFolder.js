import * as React from 'react';
import "./styles/style.css"
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import iconsview from './media/icons8-view-64.png'
import iconedit from './media/icons8-edit-file-64.png'
import delecticon from './media/icons8-delete-file-64.png'


const SharedFolder = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [folder, setFolders] = useState('');
  const [userId] = useState(1);


  const handleDelete = () => {
    if (selectedFolderId) {
      axios.delete(`http://localhost:8081/notite-api/folders/${selectedFolderId}`)
        .then(() => {
          setSelectedFolderId(null);
          refreshFolders();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
            setSelectedFolderId(folderId); 
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
    axios.get(`http://localhost:8081/notite-api/${userId}/UserFolder`)
    .then((res) => {
      setFolders(res.data);
    })
    .catch((err) => console.error(err));
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
        <button onClick={() => handleDelete()}>Delete</button>
         </div>
         </div>
         <div className="Notes_Container">
          <div className='TopContainer'>
          
          <Link className="links" to="/notes">Add New Note</Link>
          </div>
          <div className="Notes">
          {selectedFolderId && <NoteList folderId={selectedFolderId} />}
          </div>

         </div>
 </div>
    );
}



const FolderList = (props) => {
  const [folders, setFolders] = useState([]);
  const userId = props.userId;
  const onFolderSelect = props.onFolderSelect;
  const refreshFolders = props.refreshFolders;

  useEffect(() => {
    axios.get(`http://localhost:8081/notite-api/${userId}/UserFolder`)  
      .then(res => setFolders(res.data))
      .catch(err => console.error(err));
  }, [refreshFolders]);

  if(folders){
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
  else{
    return (
      <div>
        <p> 0 folders</p>
      </div>
  )}
}

function NoteList(props) {
  const [notes, setNotes] = useState([]);
  const folderId = props.folderId;
  const { userId } = props;

  const refreshNotes = () => {
    axios.get(`http://localhost:8081/notite-api/${folderId}/notes`)
    .then((res) => {
      setNotes(res.data);
    })
    .catch((err) => console.error(err));
    };
    const handleDeleteImg = (noteId) => {
    if (noteId) {
        axios.delete(`http://localhost:8081/notite-api/notes/${noteId}`)
        .then(() => {
            refreshNotes();
        })
        .catch((error) => {
            console.log(error);
        });
    }
    };

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
          <div className="note-tags">{note.tag} 
          <Link to={`/viewNotes/${note.id}`}>
          <img src={iconsview} />
          </Link>
          <img src={iconedit}/>
          <img src={delecticon} onClick={() => handleDeleteImg(note.id)}/>
          </div>
        </div>
      ))}
    </div>
  );
      }

export default SharedFolder;