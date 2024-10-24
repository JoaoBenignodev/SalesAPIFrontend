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
        console.error('Failed to fetch users', data);
      }

    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  return (
    <Box bgcolor="#e8eaf6" p={8} display="flex" justifyContent="center">

      <TableContainer component={Paper}>
        <Table arial-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Documento</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              users.map((user, index) => (
                <TableRow hover 
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    }
                  }}
                  // style={{backgroundColor: index % 2 == 0 ? 'white' : 'whitesmoke'}} -> users.map((user, index)
                  //onClick={() => alert(`cliente escolhido: ${user.name}`)}
                >
                  <TableCell component="th" scope="row">{user.id}</TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.document}</TableCell>
                  <TableCell align="center" style={{alignContent: "left"}}>
                      <Box display="flex" justifyContent="center" width="full">
                        {user.is_active 
                        ? <Box px={2} bgcolor= "#7986cb" borderRadius="16px" color="#FFF">Ativo</Box>
                        : <Box px={2} bgcolor="#c5cae9" borderRadius="16px" color="#FFF">Não ativo</Box>
                        }
                      </Box>  
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    // <Paper sx={{ height: 400, width: '100%' }}>
    //   <DataGrid/>
    // </Paper>
  )
}

export default UserListAll;