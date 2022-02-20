import { Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import classes from "./Search.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { User } from "../../pages/users";

interface CardData {
  title: string;
  id: number;
  body: string;
  userId: number;
}

const Search: React.FC<{ data: any }> = ({ data }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    // if (!e.target.value) {
    //   return setUsers(data);
    // }
    console.log(e.target.value);
    const regex = new RegExp(e.target.value, "gi");
    const arr = data.filter((user) => {
      return user.name.match(regex) || user.email.match(regex);
    });
    console.log(arr);
    setUsers(arr);
  };

  const handleClickOpen = (user) => {
    setUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={handleChange}
        fullWidth
      />
      {users.map((user, i) => {
        return (
          <div
            key={i}
            className={classes.List}
            onClick={() => handleClickOpen(user)}
          >
            Name : {user.name}
          </div>
        );
      })}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Selcted User Data"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Name : {user?.name}</DialogContentText>
          <DialogContentText>Email : {user?.email}</DialogContentText>
          <DialogContentText>Phone : {user?.phone}</DialogContentText>
          <DialogContentText>WebSite : {user?.website}</DialogContentText>
          <DialogContentText>
            Address : {user?.address?.street}, {user?.address?.suite},{" "}
            {user?.address?.city}, {user?.address?.zipcode}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Search;
