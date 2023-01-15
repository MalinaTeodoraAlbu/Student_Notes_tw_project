
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import delecticon from './media/icons8-clear-symbol-50.png'
import './styles/accesFolder.css'
import { Link } from 'react-router-dom';
const userId = localStorage.getItem('userId');


const AccesFolder = (props) => {
    const {folderId} =useParams();
    const [emails, setEmails] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    console.log('folderId',folderId)
    console.log('userID' , userId)
  
    

    const refreshEmails = () => {
      axios.get(`http://localhost:8081/notite-api/folders/${folderId}/access`)
      .then((res) => {
        setEmails(res.data);
      })
      .catch((err) => console.error(err));
      };

    const handleAddUser = () => {
        axios.post(`http://localhost:8081/notite-api/folders/${folderId}/access`, { email: newEmail })
          .then(res => {
            setEmails([...emails, newEmail]);
            setNewEmail('');
          })
          .catch(err => console.error(err));
    }

    return (  
        <div className='parent-element'>
            <div className="containerAcces">
                <div className='topside'> 
                <p> Access Management </p>
                <Link className="Link" to={`/SharedFolders`}>Back</Link>
                
                </div>
                <div className='ListOfEmails'>
                    <input
                    type="email"
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                     />
                  <button onClick={handleAddUser}>Add New User</button>
                  <div className='List'>
                  <EmailList folderId={folderId} refreshEmails={refreshEmails}></EmailList>
                  </div>
              </div>
          </div>
      </div>
    );
  }


  const EmailList = (props) => {
    const [emails, setEmails] = useState([]);
    const folderId = props.folderId;
    const userId = localStorage.getItem('userId');
    const refreshEmails = props.refreshEmails;
    useEffect(() => {
      axios.get(`http://localhost:8081/notite-api/folders/${folderId}/access`)  
        .then(res => setEmails(res.data.emails))
        .catch(err => console.error(err));
    }, [refreshEmails]);
  
    const handleDelete = (email) => {
      axios.delete(`http://localhost:8081/notite-api/folders/${folderId}/access/${email}`)
        .then(res => {
          setEmails(emails.filter(e => e !== email));
        })
        .catch(err => console.error(err));
    }
    
    return (
      <div>
        <ul>
          {emails.map(email => {
           
          return <li key={email}>
            {email}
            <img src={delecticon} onClick={() => handleDelete(email)}/>
            </li>

          })}
        </ul>
      </div>
    );
  }
 
export default AccesFolder;