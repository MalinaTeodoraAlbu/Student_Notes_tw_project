import './styles/note.css'
import ReactMarkdown from 'react-markdown'
import {useState, useEffect} from 'react';
import axios from 'axios';


const Note = () => {
    const [markDown, setMarkdown] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [folders, setFolders] = useState([]);
    const [userId] = useState(1);

    const handleSaveNote = async () => {
        try {
          const title = document.getElementById("titleinput").value;
          const tag = document.getElementById("taginput").value;
          const folderId = selectedOption;
          const context = markDown;
          const data = { title, context, tag,userId,folderId };
          console.log(data);
          const res = await fetch(`http://localhost:8081/notite-api/addnotes`,{
              method: "post",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });
        } catch (err) {
          console.error(err);
        }
      }

    return ( 
        <div className="note_continut">
            <div className='sidebar_notes'>
            <input className="title" type="text" id="titleinput" placeholder="Title"></input>
            <input className="tag" type="text" id="taginput" placeholder="Taggs"></input>
            <FolderList folders={folders} setFolders={setFolders}  selectedOption={selectedOption}  setSelectedOption={setSelectedOption}/>
            <button onClick={handleSaveNote} >SAVE</button>
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
 

const FolderList = ({folders, setFolders,selectedOption,setSelectedOption}) =>{
    const [localFolders, setLocalFolders] = useState([]);
    const [filteredFolders, setFilteredFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(''); 
  
    useEffect(() => {
        axios.get('http://localhost:8081/notite-api/folders')
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