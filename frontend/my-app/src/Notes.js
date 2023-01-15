import './styles/note.css'
import ReactMarkdown from 'react-markdown'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Note = () => {
    const [markDown, setMarkdown] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [folders, setFolders] = useState([]);
    const userId = localStorage.getItem('userId');
    const { noteId } = useParams();
    console.log('noteid',noteId)
    
    useEffect(() => {
        if(noteId){
            fetch(`http://localhost:8081/notite-api/notes/${noteId}`)
            .then(response => response.json())
            .then(data => {
                setMarkdown(data.context);
                setSelectedOption(data.folderId);
                document.getElementById("titleinput").value = data.title;
                document.getElementById("taginput").value = data.tag;
            });
        }
    }, [noteId])

    const handleSaveNote = async () => {
        try {
          const title = document.getElementById("titleinput").value;
          const tag = document.getElementById("taginput").value;
          const folderId = selectedOption;
          const context = markDown;
          const data = { title, context, tag,userId,folderId };
          let res;
          if(noteId){
              res = await fetch(`http://localhost:8081/notite-api/updatenotes/${noteId}`,{
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              window.location.href =` /viewNotes/${noteId}`;
          }else{
              res = await fetch(`http://localhost:8081/notite-api/addnotes`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              window.location.href =` /personalFolders`;
          }
         
        } catch (err) {
          console.error(err);
        }
      }

    return ( 
        <div className="note_continut">
            <div className='sidebar_notes'>
            <input className="title" type="text" id="titleinput" placeholder="Title"></input>
            <input className="tag" type="text" id="taginput" placeholder="Taggs"></input>
            <FolderList userId={userId} folders={folders} setFolders={setFolders}  selectedOption={selectedOption}  setSelectedOption={setSelectedOption}/>
            <button onClick={handleSaveNote} >SAVE</button>
            <Link className="Link" to={`/personalFolders`}>Back</Link>
            </div>

            <div className='markdown_container'>
            <textarea value={markDown}
            onChange={(e) => setMarkdown(e.target.value)} 
            className="textera" 
            placeholder="Write your notes... "></textarea>
            <div className='output'>
            <ReactMarkdown children={markDown} />
             </div>
            </div>
        </div>
     );
}
 

const FolderList = ({userId, folders, setFolders,selectedOption,setSelectedOption}) =>{
    const [localFolders, setLocalFolders] = useState([]);
    const [filteredFolders, setFilteredFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(''); 

  
    useEffect(() => {
        axios.get(`http://localhost:8081/notite-api/${userId}/UserFolder`)
            .then(res => setFolders(res.data))
            .catch(err => console.error(err));
    }, []);
  
    const handleSelectChange = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        setSelectedFolderId(selected); 
        if (selected === 'all') {
            setFilteredFolders(folders);
        } else {
            setFilteredFolders(folders.filter(folder => folder.title === selected));
        }
    }

    return (
        <div>
            <select onChange={handleSelectChange} value={selectedOption}>
                <option value="all">All</option>
                {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.title}</option>
                ))}
            </select>
        </div>
    );
  }

 
export default Note;