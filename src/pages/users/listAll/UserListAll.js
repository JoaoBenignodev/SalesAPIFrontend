import { useState, useEffect } from  'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, 
TableRow, Box, IconButton, Modal, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './style.css';

function UserListAll() {
  //useState hook to store the list of users
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formValues, setFormValues] = useState({name: '', email: '', document: ''});

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

  // function to handle user update
  function updateUser(user) {
    setCurrentUser(user); //set the current user to be edited
    setFormValues({
      name: user.name,
      email: user.email,
      document: user.document
    }); //populate form with user data
    setOpenModal(true) //open the modal
      //console.log('Updating user with ID: ', userID);
  }

  // function to handle form input changes
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  // function to submit the updated user data
  async function handleFormSubmit() {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${currentUser.id}/change/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringfy(formValues),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) => 
          prevUsers.map((user) => 
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setOpenModal(false); // close the modal
      
      } else {
        console.error('Failed to update user');
      }

    } catch(error) {
      console.error('Error updating user: ', error);
    }
  };

  return (
    <Box bgcolor="#e8eaf6" p={8} display="flex" justifyContent="center">
      <TableContainer component={Paper}>
        <h1 align="center">Clientes</h1>
        <Table arial-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Documento</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Atualizar</TableCell>
              {/* <TableCell align="center">Excluir</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {
              users.map((user, index) => (
                <TableRow key={user.id}
                  hover 
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
                        ? (<Box px={2} bgcolor= "#7986cb" borderRadius="16px" color="#FFF">Ativo</Box>)
                        : (<Box px={2} bgcolor="#c5cae9" borderRadius="16px" color="#FFF">Não ativo</Box>)
                      }
                    </Box>  
                  </TableCell>
                  <TableCell align="center"> 
              {/* <TableCell align="center" type='button' value='Atualizar'></TableCell> */}
                        <IconButton aria-label="edit" onClick={() => updateUser(user.id)}>
                            <EditIcon/>
                        </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing user */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgColor: 'background.paper', p: 4, borderRadius: '8px' }}>

          <h2>Editar Cliente</h2>
          <TextField
            label="Nome"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="E-mail"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Documento"
            name="document"
            value={formValues.document}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleFormSubmit} sx={{ mt: 2 }}>
            Atualizar
          </Button>
        </Box>
      </Modal>
    </Box>

  )
}

export default UserListAll;