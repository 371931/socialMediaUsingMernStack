import React, { useState, useEffect, useContext } from 'react';
import "./Update.css";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { myContext } from '../../App';

export default function Update(props) {

  const {mode} = useContext(myContext);

  const [inputs, upInputs] = useState({
    userName: props.userInfo.username,
    language: props.userInfo.language || "",
    location: props.userInfo.location || "",
    name: props.userInfo.name || ""
  });

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  function onChi(e) {
    let { name, value } = e.target;

    upInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  }

  function reset() {
    upInputs((prev) => {
      return {
        ...prev,
        language: "",
        location: "",
        name: ""
      }
    })
    upCover(null);
    upProImg(null);
  }

  const queryClient = useQueryClient();

  const mutation2 = useMutation((mutationData) => {
    return axios.put("http://localhost:3001/userInfo/updateProfile", mutationData, { withCredentials: true })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    }
  },
    {
      onError: (err) => {
        console.log(err);
      }
  });

  const [coverImg, upCover] = useState(null);
  const [profileImg, upProImg] = useState(null);

  const upload2 = async () => {
    try {
      const formData = new FormData();
      formData.append("file", coverImg);
      const response = await axios.post("http://localhost:3001/userInfo/uploadCover", formData);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function upload3() {
    try {
      const formData = new FormData();
      formData.append("file", profileImg);

      const response = await axios.post("http://localhost:3001/userInfo/uploadPro", formData);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function onCliOnUp(e) {
    e.preventDefault();
    let imgUrl
    if (coverImg && !profileImg) {
      imgUrl = await upload2();
      mutation2.mutate({ inputs: inputs, coverImg: imgUrl });
    } else if (!coverImg && profileImg) {
      imgUrl = await upload3();
      mutation2.mutate({ inputs: inputs, profileImg: imgUrl });
    } else if (coverImg && profileImg) {
      let coverImg = await upload2();
      let profileImg = await upload3();

      mutation2.mutate({ inputs: inputs, coverImg: coverImg, profileImg: profileImg })
    } else {
      mutation2.mutate({ inputs });
    }
    console.log("called");
    props.upShow(!props.updateShow)
  }

  return (
    <div className='updateContainer' style={{backgroundColor: !mode && "#222",color: !mode && "white"}}>
      <div className='coverPic'>
        Cover Picture:
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}
        >Upload file <VisuallyHiddenInput type="file" name="coverImg" onChange={(e) => { upCover(e.target.files[0]) }} /></Button>
      </div>
      <div className='coverPic'>
        Profile Picture:
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}
        >Upload file <VisuallyHiddenInput type="file" name="profileImg" onChange={(e) => { upProImg(e.target.files[0]) }} /></Button>
      </div>
      <div className='coverPic'>
        Name :
        <TextField className="outlined-basic" variant="outlined" name="name" placeholder='Name' onChange={onChi} value={inputs.name} style={{backgroundColor: !mode && "#666",borderRadius: !mode && "5px"}}/>
      </div>
      <div className='coverPic'>
        Location :
        <TextField className="outlined-basic" variant="outlined" name="location" placeholder='Location' onChange={onChi} value={inputs.location} style={{backgroundColor: !mode && "#666",borderRadius: !mode && "5px"}} />
      </div>
      <div className='coverPic'>
        Language :
        <TextField className="outlined-basic" variant="outlined" name="language" placeholder='Language' onChange={onChi} value={inputs.language} style={{backgroundColor: !mode && "#666",borderRadius: !mode && "5px"}}/>
      </div>
      <div className="buttonsProUp">
        <Button variant="outlined" color="error" onClick={reset}>
          reset
        </Button>
        <Button onClick={onCliOnUp} variant="contained" color="success">
          Save
        </Button>
      </div>
      <CloseIcon onClick={() => { props.upShow(!props.updateShow) }} className='cancelBtn' sx={{ fontSize: 30 }} />
    </div>
  )
}
