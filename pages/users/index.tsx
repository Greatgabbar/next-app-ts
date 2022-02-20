import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const Users: NextPage = ({ users }) => {
  const [userData, setUserData] = useState(users);

  const handleChange = (id) => {
    const arr = [...userData];
    const i = arr.findIndex((a) => a.id === id);
    arr[i].blocked = !arr[i].blocked;
    if (!arr[i].blocked) {
      let BlockedUser = JSON.parse(localStorage.getItem("BlockedUser"));
      const index = BlockedUser?.findIndex((user: any) => user.id === id);
      BlockedUser.splice(index, 1);
      localStorage.setItem("BlockedUser", JSON.stringify(BlockedUser));
    } else {
      let BlockedUser = JSON.parse(localStorage.getItem("BlockedUser"));
      console.log(BlockedUser);
      if (!BlockedUser) {
        BlockedUser = [];
        arr[i].endTime = new Date(new Date().getTime() + 5 * 60000);
        BlockedUser.push(arr[i]);
        localStorage.setItem("BlockedUser", JSON.stringify(BlockedUser));
      } else {
        let BlockedUser = JSON.parse(localStorage.getItem("BlockedUser"));
        arr[i].endTime = new Date(new Date().getTime() + 5 * 60000);
        BlockedUser.push(arr[i]);
        localStorage.setItem("BlockedUser", JSON.stringify(BlockedUser));
      }
    }
    console.log(arr[i]);
    setUserData(arr);
  };

  const handleTop = (id) => {
    const arr = [...userData];
    const index = arr.findIndex((gg) => gg.id === id);
    let topUser = JSON.parse(localStorage.getItem("topUser"));
    if (!topUser) {
      topUser = [];
    }
    arr[index].topUser = !arr[index].topUser;
    if (!arr[index].topUser) {
      const i = topUser.findIndex((gg) => gg.id === arr[index].id);
      topUser.splice(i, 1);
      setUserData(arr);
      return localStorage.setItem("topUser", JSON.stringify(topUser));
    }
    topUser.push(arr[index]);
    localStorage.setItem("topUser", JSON.stringify(topUser));
    setUserData(arr);
  };

  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("BlockedUser"));
    let topUser = JSON.parse(localStorage.getItem("topUser"));
    // if (arr) {
    arr?.forEach((data) => {
      const i = users.findIndex((gg) => gg.id === data.id);
      users[i].blocked = true;
    });
    topUser?.forEach((data) => {
      const i = users.findIndex((gg) => gg.id === data.id);
      users[i].topUser = true;
    });
    setUserData(users);
    // }
    setInterval(() => {
      let arr = JSON.parse(localStorage.getItem("BlockedUser"));
      if (!arr) return;
      const date = new Date();
      let ids = [];
      let userdata = [...userData];
      arr.forEach((data) => {
        if (new Date(data.endTime).toLocaleString() === date.toLocaleString()) {
          ids.push(data.id);
        }
      });
      ids.forEach((id) => {
        let i = userdata.findIndex((gg) => gg.id === id);
        userdata[i].blocked = false;
        i = arr.findIndex((gg) => gg.id === id);
        arr.splice(i, 1);
      });
      setUserData(userdata);
      localStorage.setItem("BlockedUser", JSON.stringify(arr));
    }, 1000);
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Block/Unblock</TableCell>
              <TableCell>Top User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.blocked}
                    onChange={() => handleChange(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.topUser}
                    onChange={() => handleTop(user.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;

export async function getServerSideProps() {
  console.log(process.env.SERVER_URL);
  const res = await fetch(`${process.env.SERVER_URL}/users`);
  let data = await res.json();
  data = data.map((gg) => {
    return {
      ...gg,
      blocked: false,
      topUser: false,
    };
  });
  console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
