import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import './styles/note.css'
import { Link } from 'react-router-dom';

const ViewNote = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState({});
    
    useEffect(() => {
      axios.get(`http://localhost:8081/notite-api/notes/${noteId}`)
        .then(response => {
          setNote(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [noteId]);
  
    return (  
      <div>
        <div className='title_note_view'>
        <p>{note.title}</p>
        <div className='rightLinks'>
        <Link className="Link" to={`/notes/${note.id}`}>Edit Note</Link>
        <Link className="Link" to={`/personalFolders`}>Back</Link>
        </div>
        </div>
        <div className='outout_view'>
        <ReactMarkdown children={note.context} />
        </div>
      </div>
    );
  }
 
export default ViewNote;