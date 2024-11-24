import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Divider, IconButton, Modal, Paper, Snackbar, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { formatLocale } from '../../../utils/formatLocale';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';



function Sales() {

    // useState hook to store the list of Sales
    const [sales, setSales] = useState([]);

    // useState hook to manage Users data
    const [users, setUsers] = useState([]);

    // useState hook to manage Products data
    const [products, setProducts] = useState([]);

    const [currentSale, setCurrentSale] = useState(null);
    const [formValues, setFormValues] = useState({ quantity: '', price: '', user_id: '', product_id: '' });
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Function to fetch all sales from the frontend
    async function fetchSales() {
        try {
            //const response = await fetch('', {});
            const response = await fetch('http://localhost:8080/api/sales/',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            const data = await response.json();
            if (response.ok) {
                setSales(data); //Setting the fetched sales data
            } else {
                console.error('Failed to fetch sales', data);
                setSnackbarMessage('Erro ao buscar as vendas');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }

        } catch (error) {
            console.log('Error fetching sales:', error);
            setSnackbarMessage('Erro ao buscar as vendas');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }

    //useEffect hook to fetch sales when the component loads
    useEffect(() => {
        fetchSales();
    }, []);


    // Function to fecth all the Users for the customer.id selection listinig on the Update Modal
    const fetchUsers = useCallback(() => {
        fetch('http://localhost:8080/api/users/')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // useEffect hook to synchronize all the data queried from the fetchUsers
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Function to fecth all the Users for the customer.id selection listinig on the Update Modal
    const fetchProducts = useCallback(() => {
        fetch('http://localhost:8080/api/products/')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // useEffect hook to synchronize all the data queried from the fetchProducts
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    // Function to handle Sale update
    function updateSale(sale) {
        setCurrentSale(sale); //set the current sale to be edited
        setFormValues({
            quantity: sale.quantity,
            price: sale.price,
            user_id: sale.user_id,
            product_id: sale.product_id,
        }); //populate form with sales data
        setOpenModal(true);
    }

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    // Function to submit the updated sale data
    async function handleFormSubmit() {
        // Check if all the required fields are filled
        if (!formValues.quantity || !formValues.user_id || !formValues.product_id) {
            setSnackbarMessage('To proceed with the update, all the required fileds must be filled out!');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return
        }

        // Check if the given Quantity or Price are greater than 0
        if (formValues.quantity <= 0) {
            setSnackbarMessage('A Sale needs to have at least 1 Product unit!');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/sales/${currentSale.id}/change/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

            const data = response.json()

            if (response.ok) {
                console.log("Sale updated with success!", data);
                setSnackbarMessage('The Sale was updated with success!');
                setSnackbarSeverity("success");
                setOpenSnackbar(true);

                setOpenModal(false); // Closes the modal

                // Fetch the Product listing considering the updated data
                fetchSales()

                // Fetch the User to ensure newly registered Users are listed in the FormControl 
                fetchUsers()

                // Fetch the Product to ensure newly registered Products are listed in the FormControl 
                fetchProducts()


            } else {
                console.error("Failed to update the Sale!", data);
                setSnackbarMessage("Failed to update the Sale!\nPlease try again!");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }

        } catch (error) {
            console.error('An error occured while updating the Sale!', error);
            setSnackbarMessage("An error occured while updating the Sale!");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    // Close snackbar function
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <Box backgroundColor="#e8eaf6" p={8} width='100%'>
            <TableContainer
                component={Paper}
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
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
                        Sales
                    </h1>
                    <Button
                        variant='contained'
                        size='large'
                        href="/sales/add/"
                        endIcon={<AddIcon />}
                        sx={{ fontWeight: 'bold', backgroundColor: '#3949ab' }}
                    >
                        ADD
                    </Button>
                </Box>
                <Divider />
                <Table arial-label="sale table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Product
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Customer
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Quantity
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center"
                            >
                                Price
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id}
                                hover
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}>
                                <TableCell align="center">{sale.product_name}</TableCell>
                                <TableCell align="center">{sale.user_name}</TableCell>
                                <TableCell align="center">{sale.quantity}</TableCell>
                                <TableCell align="center">{formatLocale(sale.price)}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="edit sale" onClick={() => updateSale(sale)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal Component for editing sale*/}
            <Modal open={openModal}
                onClose={() => setOpenModal(false)}>

                <Box backgroundColor="#FFF" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, p: 4, borderRadius: '8px' }}>

                    <h2 align="center">Edit Sale</h2>

                    {/* UserId field configuration */}
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel>Customer</InputLabel>
                        <Select
                            label="Customer"
                            name="user_id"
                            value={formValues.user_id}
                            onChange={handleInputChange}
                            required
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* ProductId field configuration */}
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel>Product</InputLabel>
                        <Select
                            label="Product"
                            name="product_id"
                            value={formValues.product_id}
                            onChange={handleInputChange}
                            required
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    {/* Quantity field configuration */}
                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={formValues.quantity}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" size="large" onClick={handleFormSubmit} sx={{ backgroundColor: "#3949ab" }}>
                            Update Sale
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar Component */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Box >

    );

}

export default Sales; 