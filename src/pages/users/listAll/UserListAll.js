import { useState, useEffect } from  'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import './style.css';

function UserListAll() {

  //useState hook to store the list of users
  const [users, setUsers] = useState([]);

  // useEffect hook to fetch users when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // function to fetch all users from the backend
  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:8080/api/users/', 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },    
      });

      const data = await response.json();

      if(response.ok) {
        setUsers(data); //Setting thee fetched users data
      
      } else {
        console.error('Failed tto fetch users', data);
      }

    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table arial-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Documento</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            users.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.document}</TableCell>
                <TableCell align="right">{user.is_active ? 'Sim' : 'Não'}</TableCell>
                <TableCell align="center" style={{alignContent: "left"}}>
                    <Box display="flex" justifyContent="center" width="full">
                      {user.is_active 
                        ? <Box px={2} bgcolor = "green" borderRadius="16px" color="#FFF">Sim</Box>
                        : <Box px={2} bgcolor="red" borderRadius="16px" color="#FFF">Não</Box>
                      }
 
                    </Box>
                    
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>

    // <Paper sx={{ height: 400, width: '100%' }}>
    //   <DataGrid/>
    // </Paper>
  )
}

export default UserListAll;