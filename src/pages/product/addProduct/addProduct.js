// Importing
import { useCallback, useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar } from '@mui/material'
import './style.css';

function AddProduct() {

    // useState hooks for managing alerts
    const [openAlert, setOpenAlert] = useState(false) // Controls the visibility of the alert
    const [alertMessage, setAlertMessage] = useState('') // Holds the message to be displayed in the alert
    const [alertSeverity, setAlertSeverity] = useState('') // Defines the "type" of the alert's severity

    // UseState hook to manage User data
    const [users, setUsers] = useState([]);

    // Function to fecth all the Users
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

    // useState hook to manage form input data
    // Initial state of the formData is set with empty strings for each field
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        is_active: true, // Default value
        user_id: '', // Parent(User) key
    })

    // Function for handling form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(defaultState => ({ ...defaultState, [name]: value }));
    }

    // Function for submitting the creation of a Product
    async function submitProduct() {

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
            const response = await fetch('http://localhost:8080/api/products/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json();

            if (response.ok) {
                console.log('Product created with success!', data);
                setAlertMessage('The product was created with success!');
                setAlertSeverity('success');
                setOpenAlert(true);


                // Resetting the form data
                setFormData({
                    name: '',
                    quantity: '',
                    price: '',
                    is_active: true, // Default value
                    user_id: '', // Parent(User) key
                })
            } else {
                console.error('Failed to create Product!', data);
                setAlertMessage('Failed to register Product!\nPlease try again!');
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        }
        catch (error) {
            console.log('And error occured while creating the Product!', error);
            setAlertMessage('An erro occured while registering the Product!');
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    }

    return (
        <div id='product-creation-form'>
            <Card elevation={10} sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant='h4' component='h2' gutterBottom>
                        Create a New Product
                    </Typography>
                    <form>
                        {/* Name field configuration */}
                        <TextField
                            label='Name'
                            variant='outlined'
                            name='name'
                            type='text'
                            margin='normal'
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

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

                        {/* Price field configuration */}
                        <TextField
                            label='Price'
                            variant='outlined'
                            name='price'
                            type='currency'
                            margin='normal'
                            fullWidth
                            value={formData.price}
                            onChange={handleChange}
                            required
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

                        {/* Including " is_active" field on the formData */}
                        <input type='hidden' name='is_active' value={formData.is_active} />

                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{ backgroundColor: '#3949ab', marginTop: 1 }}
                            onClick={submitProduct}
                        >
                            add product
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Snackbar for returning on-screen alerts*/}
            <Snackbar
                open={openAlert}
                autoHideDuration={6000} // Duration on milliseconds before closing the alert
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar's screen relative position
            >
                <Alert
                    onClose={() => setOpenAlert(false)}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddProduct