import {
  // FormControl,
  // FormLayout,
  Page,
  // FormButtons,
  //// Button,
  Card,
} from "../common/layout";
import { palette } from "../common/palette";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
//import { useState, useEffect } from "react";
//import API from "../api";
import { useAuth } from "../context/AuthContext";
import defaultPic from "../common/defaultprofilepic.png";
//import { ImageUrlFromBuffer } from "../utils/bufferToFile";
const Profile = styled(Page)`
  flex-direction: row;
  flex-wrap: wrap;
`;
/*
const FileControl = styled(FormControl)`
  input {
    display: none;
  }
  //display: inline-block;
  //padding: 6px 12px;
  cursor: pointer;
  background-color: #000000;
  color: #fff;
  border: 2px solid gray;
  border-radius: 4px;
  user-select: none;
  &:before {
  }
`;*/

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-image: linear-gradient(${palette.pineGreen} 20%, lightblue 80%);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  user-select: none;
  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .avatar {
      background-image: url(${defaultPic});
      background-size: cover;
      background-position: center;
      height: 8rem;
      width: 6rem;
    }
  }
  .field {
    display: flex;
    justify-content: space-between;
  }
`;
export const ProfilePage = () => {
  const theme = useTheme();
  const { state } = useAuth();
  /*
  const [file, setFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(defaultPic);
  
  useEffect(() => {
    //fetch avatar from storage
    console.log("State:", state);
    const imgUrl = localStorage.getItem("avatar");
    //not set, if user didn't choose it before
    if (!imgUrl) return;

    setProfilePicUrl(() => imgUrl);
  }, [state]);
  const onChangeFile = (e) => {
    const buffer = e.target.files[0];
    setFile(() => buffer);
    localStorage.setItem("avatar", ImageUrlFromBuffer(buffer));
  };
  
  const SubmitAvatar = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("avatar", file, "avatar");
      await API.patch("/user/avatar", formdata, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const imgUrl = ImageUrlFromBuffer(file);
      setFile(() => null);
      localStorage.setItem("avatar", imgUrl);
      setProfilePicUrl(imgUrl);
      dispatch({ type: AUTHACTIONS.SETAVATAR, payload: imgUrl });
    } catch (error) {
      console.log(error);
    }
  };
  */
  return (
    <Profile theme={theme}>
      <ProfileCard>
        <div className="top">
          <h2 className="username">{state.user.nickname}</h2>

          <div className="avatar" />
        </div>
        <hr />
        <p className="passport-id field">
          <span>passport ID:</span> <span>{state.user.passportID}</span>
        </p>
        <p className="email field">
          <span>E-mail:</span> <span>{state.user.email}</span>
        </p>

        {/* <FormLayout onSubmit={SubmitAvatar} onReset={setFile.bind(null, null)}>
          <FormControl>
            <label htmlFor="avatar">Click to upload avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={onChangeFile}
            />
          </FormControl>
          <FormButtons>
            <Button type="reset">Clear</Button>
            <Button type="submit">Submit</Button>
          </FormButtons>
        </FormLayout> */}
      </ProfileCard>
    </Profile>
  );
};
