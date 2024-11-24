import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import { useCallback, useEffect, useState } from "react";
import { formatLocale } from "../../../utils/formatLocale";

const Products = () => {

    // useState hooks for managing alerts
    const [openAlert, setOpenAlert] = useState(false) // Controls the visibility of the alert
    const [alertMessage, setAlertMessage] = useState('') // Holds the message to be displayed in the alert
    const [alertSeverity, setAlertSeverity] = useState('') // Defines the "type" of the alert's severity

    // useState hook to store the Products llisting
    const [products, setProducts] = useState([]);

    // useState hook to manage Users data
    const [users, setUsers] = useState([]);

    // useState hook to manage a Product data
    const [product, setProduct] = useState({});

    // useState hook to control the opening an closing of the Update Modal
    const [openModal, setOpenModal] = useState(false);

    // Function to fetch all the already registered Products
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProducts(data)
                console.log('Products listed with succes!', data);
            } else {
                console.error('Failed to fetch the Products listing', data);
            }
        } catch (error) {
            console.log('An error occured while fetching the Products listing!', error);
        }
    };

    // useEffect hook to synchronize all the data queried from the fetchProducts
    useEffect(() => {
        fetchProducts();
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


    // useState hook to manage form inputted data
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        is_active: true, // Default value
        user_id: '' // Parent(User) key
    })

    // Function for handling form default state and input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Fucntion to handle the opening of the modal upon click on edit button 
    function handleProductUpdate(product) {
        setProduct(product);

        // Populating form with the "Product" data 
        setFormData({
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            is_active: product.is_active, // Default value
            user_id: product.user_id // Parent (User)
        });

        // Opening the edit Product Modal
        setOpenModal(true);
    }

    // Function for submitting the update of a Product
    async function updateProduct() {

        // Check if all the required fields are filled
        if (!formData.name || !formData.quantity || !formData.price || !formData.user_id) {
            setAlertMessage('To proceed with the creation, all the required fileds must be filled out!');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return
        }

        // Check if the given Quantity or Price are greater than 0
        if (formData.quantity <= 0 || formData.price <= 0.00) {
            setAlertMessage('A product needs to have at least 1 unit and a Price greater than 0.00!');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/products/${product.id}/change/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Product updated with success!', data)
                setAlertMessage('The Product was updated with success!');
                setAlertSeverity('success');
                setOpenAlert(true);;

                // Closes the Edit Product Modal
                setOpenModal(false)

                // Fetch the Product listing considering the updated data
                fetchProducts()

                // Fetch the User to ensure newly registered Users are listed in the FormControl 
                fetchUsers()

            } else {
                console.error('Failed to update the Product!', data);
                setAlertMessage('Failed to update the Product!\nPlease try again!');
                setAlertSeverity('error');
                setOpenAlert(true);

            }
        } catch (error) {
            console.error('An error occured while updating the Product!', error);
            setAlertMessage('An error occured while updating the Product!');
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    }

    return (
        <Box backgroundColor="#e8eaf6" p={8} width='100%'>
            <TableContainer
                component={Paper}
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <h1 align="center">Products</h1>
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
                                align="center"
                            >
                                Status
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: ' bold' }}
                                align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}
                                hover
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}>
                                <TableCell align="center">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">
                                    {product.user_name}
                                </TableCell>
                                <TableCell align="center">
                                    {product.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {formatLocale(product.price)}
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
                                        {product.is_active ? (
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
                                        aria-label="Edit"
                                        onClick={() => handleProductUpdate(product)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal Component for editing a Product*/}
            <Modal open={openModal}
                onClose={() => setOpenModal(false)}>

                <Box backgroundColor="#FFF" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, p: 4, borderRadius: '8px' }}>

                    <h2 align="center">Edit Product</h2>

                    {/* Name field configuration */}
                    <TextField
                        label="Product"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    {/* Quantity field configuration */}
                    <TextField
                        label="Quantidade"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    {/* Price field configuration */}
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    {/* UserId field configuration */}
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel>Customer</InputLabel>
                        <Select
                            label="Customer"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            required
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* IsActive checkbox configuration */}
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={formData.is_active}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
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
                        <Button variant="contained" size="large" onClick={updateProduct} sx={{ backgroundColor: "#3949ab" }}>
                            Update Product
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar for returning on-screen alerts*/}
            <Snackbar
                open={openAlert}
                autoHideDuration={6000} // Duration on milliseconds before closing the alert
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'down', horizontal: 'left' }} // Snackbar's screen relative position
            >
                <Alert
                    onClose={() => setOpenAlert(false)}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box >


    );

};

export default Products;
