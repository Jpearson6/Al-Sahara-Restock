import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/config";
export default function UserList() {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(firestore, "users");

      try {
        const querySnapshot = await getDocs(usersCollection);
        const usersData = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setUsers(usersData);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "xs" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Name </TableCell>
              <TableCell> Email </TableCell>
              <TableCell> Role </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow
                  key={user.email}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
