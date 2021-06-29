import React,{useState} from 'react'
import axios from 'axios';

const Upload = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState([]);
  const [img, setNewImage] = useState([]);
  
  

  const onSub= async (e)=>{
    let formData=new FormData();
    formData.append("imgfile",image[0])
    formData.append("newimg",img[0])
    formData.append("name",name)
    formData.append("email",email)
   

e.preventDefault()

let res=await axios.post("http://localhost:5000/imgupload",formData);

console.log(res.data)

  



     
   


    
   
   
  }
    return (
        <>
              <div className="box">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12 mx-auto" id="formdata">
          <form   onSubmit={onSub} >
                        <div className="form-group">
                            <label htmlFor="">Name:</label>
                            <input type="text" className="form-control" placeholder="Enter name" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} required />
                          </div>
                        <div className="form-group">
                          <label htmlFor="">Email address:</label>
                          <input type="email" className="form-control" placeholder="Enter email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Upload Profile Image:</label>
                          <input type="file" name="imgfile" className="form-control"   onChange={(e)=>setImage(e.target.files)}  required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Upload Profile Image:</label>
                          <input type="file" name="newimg" className="form-control"   onChange={(e)=>setNewImage(e.target.files)}  required />
                        </div>
                       
                      
                        
                        <button type="submit" className="btn btn-primary" >Submit</button>
                      </form>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default Upload;
