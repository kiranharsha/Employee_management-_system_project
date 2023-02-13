import React,{useState} from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileNames, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = (e)=>{ 
        // console.log(e.target.files)
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async e =>{
        e.preventDefault();
        // console.log(file)
        // const formData = file
        const formData = new FormData();
        formData.append('file', file);
        console.log(file)
     

        try{
          const res = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
          console.log(res)
          const {fileName, filePath} = res.data;
          setUploadedFile({fileName, filePath});
        }catch(err){
          if(err.response.status === 500){
            console.log('There Was a Problem with Server');
          }else{
            console.log(err.response.data.msg);
          }
        }
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
        <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
        <label className="custom-file-label" htmlFor="customFile">
         {fileNames}
        </label>
      </div>

      <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>

        { uploadedFile ? (
        <div className= "row mt-5">
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style = {{width:'100%'}}src={uploadedFile.filePath} alt='' />
          </div>
        </div>
        ) : null}
      
    </div>
  );
}

export default FileUpload