import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import './style.css';

function AddSale() {

    const [openAlert, setOpenAlert] = useState(false) // Controls the visibility of the alert
    const [alertMessage, setAlertMessage] = useState('') // Holds the message to be displayed in the alert
    const [alertSeverity, setAlertSeverity] = useState('') // Defines the "type" of the alert's severity

    // Instancing useNavigate function
    const navigateTo = useNavigate()

    // UseState hook to manage User data
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    // Function to fecth all the Users
    const fetchUsers = useCallback(() => {
        fetch('http://localhost:8080/api/users/')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }, []);

    // Function to fecth all the Products
    const fetchProducts = useCallback(() => {
        fetch('http://localhost:8080/api/products/')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }, []);

    // useEffect hook to synchronize all the data queried from the fetchUsers
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // useEffect hook to synchronize all the data queried from the fetchProducts
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // useState hook to manage form input data
    // Initial state of the formData is set with empty strings for each field
    const [formData, setFormData] = useState({
        quantity: '',
        user_id: '', // Parent(User) key
        product_id: '', // Parent(Product) key
    });

    // Function for handling form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(defaultState => ({ ...defaultState, [name]: value }));
    };

    // Function for submitting the creation of a Product
    async function submitSale() {

        // Check if all the required fields are filled
        if (!formData.quantity || !formData.user_id || !formData.product_id) {
            setAlertMessage('To proceed with the creation, all the required fileds must be filled out!');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return
        }

        // Check if the given Quantity is bigger than 0
        if (formData.quantity <= 0) {
            setAlertMessage('A sale needs to have at least 1 unit!');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/sales/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Sale created with success!', data);
                setAlertMessage('The sale was created with success!');
                setAlertSeverity('success');
                setOpenAlert(true);

                // Reseting the form data
                setFormData({
                    quantity: '',
                    user_id: '',
                    product_id: '',
                })

                // Navigate to the Sales listing
                setTimeout(() => {
                    navigateTo('/sales')
                }, 2000);

            } else {
                console.error('Failed to create Sale!', data);
                setAlertMessage('Failed to register Sale!\nPlease try again!');
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        }
        catch (error) {
            console.log('And error occured while creating the Sale!', error);
            setAlertMessage('An error occured while registering the Sale!');
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    }

    return (
        <div id='sale-creation-form'>
            <Card elevation={10} sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant='h4' component='h2' gutterBottom>
                        Register a New Sale
                    </Typography>
                    <form>
                        {/* Quantity field configuration */}
                        <TextField
                            label='Quantity'
                            variant='outlined'
                            name='quantity'
                            type='number'
                            margin='normal'
                            fullWidth
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />

                        {/* UserId field configuration */}
                        <FormControl variant='outlined' fullWidth margin='normal'>
                            <InputLabel>Customer</InputLabel>
                            <Select
                                label='Customer'
                                name='user_id'
                                margin='normal'
                                fullWidth
                                value={formData.user_id}
                                onChange={handleChange}
                                required
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))};
                            </Select>
                        </FormControl>

                        {/* ProductId field configuration */}
                        <FormControl variant='outlined' fullWidth margin='normal'>
                            <InputLabel>Product</InputLabel>
                            <Select
                                label='Product'
                                name='product_id'
                                margin='normal'
                                fullWidth
                                value={formData.product_id}
                                onChange={handleChange}
                                required>

                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.id}>
                                        {product.name}
                                    </MenuItem>
                                ))};
                            </Select>
                        </FormControl>

                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{ backgroundColor: '#3949ab', marginTop: 1 }}
                            onClick={submitSale}>
                            Register Sale
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Snackbar for returning on-screen alerts */}
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={() => setOpenAlert(false)}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddSale;