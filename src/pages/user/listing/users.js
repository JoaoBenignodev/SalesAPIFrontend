import { useState, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    IconButton,
    Modal,
    TextField,
    Button,
    Snackbar,
    Alert,
    Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/joy/Divider";

function Users() {
    //useState hook to store the list of users
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        document: "",
        is_active: true,
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // useEffect hook to fetch users when the component loads
    useEffect(() => {
        fetchUsers();
    }, []);

    // function to fetch all users from the backend
    async function fetchUsers() {
        try {
            const response = await fetch("http://localhost:8080/api/users/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                setUsers(data); //Setting thee fetched users data
            } else {
                console.error("Failed to fetch users", data);
            }
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    }

    // function to handle user update
    function updateUser(user) {
        setCurrentUser(user); //set the current user to be edited
        setFormValues({
            name: user.name,
            email: user.email,
            document: user.document,
            is_active: user.is_active,
        }); //populate form with user data
        setOpenModal(true); //open the modal
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
            const response = await fetch(
                `http://localhost:8080/api/users/${currentUser.id}/change/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formValues),
                });

            const data = await response.json();

            if (response.ok) {
                console.log("User updated with success!", data);
                setSnackbarMessage('The Customer was updated with success!');
                setSnackbarSeverity("success");
                setOpenSnackbar(true);

                setOpenModal(false) //Closes the Modal

                // Fetch the Product listing considering the updated data
                fetchUsers()

            } else {
                console.error("Failed to update the User!", data);
                setSnackbarMessage("Failed to update the Customer!\nPlease try again!");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('An error occured while updating the User!', error);
            setSnackbarMessage("An error occured while updating the Customer!");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    }

    // close snackbar function
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            bgcolor="#e8eaf6"
            p={8}
            display="flex"
            flexDirection='column'
            width="100%"
        >
            <TableContainer component={Paper}>
                <Box
                    paddingX={5}
                    paddingY={3.1}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <h1
                        align="center"
                        style={{ flex: 1, textAlign: 'center' }}
                    >
                        Customers
                    </h1>
                    <Button
                        variant='contained'
                        size='large'
                        href="/users/add/"
                        endIcon={<AddIcon />}
                        sx={{ fontWeight: 'bold', backgroundColor: '#3949ab' }}
                    >
                        ADD
                    </Button>
                </Box>
                <Divider />
                <Table arial-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Name
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                E-mail
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Document
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Status
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold" }}
                                align="center"
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                hover
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            // style={{backgroundColor: index % 2 == 0 ? 'white' : 'whitesmoke'}} -> users.map((user, index)
                            //onClick={() => alert(`cliente escolhido: ${user.name}`)}
                            >
                                <TableCell align="center">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {user.document}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ alignContent: "left" }}
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        width="full"
                                    >
                                        {user.is_active ? (
                                            <Box
                                                sx={{ minWidth: 60, fontWeight: 'bold' }}
                                                px={2}
                                                bgcolor="#7986cb"
                                                borderRadius="10px"
                                                color="#FFF"
                                            >
                                                Active
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{ minWidth: 60, fontWeight: 'bold' }}
                                                px={2}
                                                bgcolor="#ff7878cb"
                                                borderRadius="10px"
                                                color="#FFF"
                                            >
                                                Inactive
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {/* <TableCell align="center" type='button' value='Atualizar'></TableCell> */}
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => updateUser(user)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for editing user */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    bgcolor="#FFF"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 350,
                        p: 4,
                        borderRadius: "8px",
                    }}
                >
                    <h2 align="center">Edit Customer</h2>
                    <TextField
                        label="Name"
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
                        label="Document"
                        name="document"
                        value={formValues.document}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={formValues.is_active} //ou seria is_active?
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    is_active: e.target.checked,
                                })
                            }
                            sx={{
                                color: "#7986cb",
                                "&.Mui-checked": { color: "#3949ab" },
                            }}
                        />
                        <span>Active</span>
                    </Box>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleFormSubmit}
                            sx={{ backgroundColor: "#3949ab" }}
                        >
                            Update Customer
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar for feedback message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Users;
