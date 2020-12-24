import './App.css';
import React, { useState } from 'react';
import {uploadImage, getImage} from './api/ImageAPI';

function App() {
  const[retrievedData, setRetrievedData] = useState(null);
  const[files, setFiles] = useState(null);
  const[name, setName] = useState('');
  const changeFile = (event) => {
    setFiles(event.target.files)
  }
  const handleName = (event) =>{
    setName(event.target.value);
  }
  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("name", name);
    uploadImage(formData);
  }


  const retrieveImage = async () => {
    const data = await getImage(name);
    setRetrievedData(data);
  }
  return (
    <div className="background">
      <div className="avatar-content">
      {retrievedData === null? 
        <form id="avatar-form" onSubmit={submitForm}>
          <label className="avatar">Click to add avatar
            <input type="file" name="avatar" onChange={changeFile}></input>
          </label>
          <input id="name" placeholder="enter name here" name="name" onChange={handleName} />
          <button form="avatar-form">Submit</button>
        </form> : <img  src={retrievedData[0].avatar} alt="" /> }
        
      </div>
      <div className="retrieve">
        <input placeholder="search up name"/>
        <button onClick={retrieveImage}>retrieve avatar</button>
        
      </div>
    </div>
  );
}

export default App;
