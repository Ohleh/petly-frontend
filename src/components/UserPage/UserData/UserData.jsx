import { TbCamera } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/auth-selectors';

import React from 'react';
import {
  AccentText,
  Profile,
  Box,
  Form,
  Avatar,
  EditBox,
  EditPhotoButton,
  FormDiv
} from './UserData.styled';
import Logout from '../Logout/Logout';
import { patchAvatar } from 'redux/auth/auth-operation';
import { useDispatch } from 'react-redux';
import  UserInputName  from "./UserInput/UserName/UserName";
import UserInputEmail  from "./UserInput/UserEmail/UserEmail";
import UserInputCity  from "./UserInput/UserCity/UserCity";
import  UserInputBirthday  from "./UserInput/UserBirthday/UserBirthday";
import UserInputPhone from "./UserInput/UserPhone/UserPhone";

export default function UserData() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  
const changeImage = async (event) => {
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
  dispatch(patchAvatar(formData))
  };

    return (
      <Box>
        <AccentText>My information:</AccentText>
        <Profile>
          <div>
          <div style={{  display:"flex", justifyContent: "center"}}>
            <Avatar src={user.avatarURL}></Avatar>
          </div>
           <EditBox>
            
            <TbCamera
              style={{ width: '18px', height: '18px', color: '#F59256' }}
            ></TbCamera> 
             <label>        
              <EditPhotoButton onChange={changeImage} type="file" name="file" style={{ color: "transparent" }} ></EditPhotoButton>             
          </label>
            </EditBox>
          </div>
         
          <FormDiv> 
           <Form >
            <UserInputName/>
          
            <UserInputEmail/>

            <UserInputBirthday/>

            <UserInputPhone  />

            <UserInputCity /> 
              
            </Form>
          <Logout ></Logout>
            </FormDiv>
            
        </Profile>
        
           
      </Box>)
      }
  

  
//      return (
//     <div>
//       {UserData}
//     </div>
// )
         

   

