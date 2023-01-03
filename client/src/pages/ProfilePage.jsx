import {
  FormControl,
  FormLayout,
  Page,
  FormButtons,
  Button,
  Card,
} from "../common/layout";
import { palette } from "../common/palette";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

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
  .field {
    display: flex;
    justify-content: space-between;
  }
`;
export const ProfilePage = () => {
  const theme = useTheme();
  const {
    state: { user, token },
  } = useAuth();
  console.log(user);
  const [avatar, setAvatar] = useState(null);
  const onChangeFile = (e) => setAvatar(() => e.target.files[0]);
  const SubmitAvatar = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("avatar", avatar);
      const data = await API.patch("/user/add-avatar", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          //"Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Profile theme={theme}>
      <ProfileCard>
        <h2 className="username">{user.nickname}</h2>
        <hr />
        <p className="passport-id field">
          <span>passport ID:</span> <span>{user.passportID}</span>
        </p>
        <p className="email field">
          <span>E-mail:</span> <span>{user.email}</span>
        </p>
        <div className="avatar">{"avatar"}</div>
        <FormLayout
          onSubmit={SubmitAvatar}
          onReset={setAvatar.bind(null, null)}
        >
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
        </FormLayout>
      </ProfileCard>
    </Profile>
  );
};
