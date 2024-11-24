// Importing
import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css';

function AddUser() {

    // useState hooks for managing alerts
    const [openAlert, setOpenAlert] = useState(false) // Controls the visibility of the alert
    const [alertMessage, setAlertMessage] = useState('') // Holds the message to be displayed in the alert
    const [alertSeverity, setAlertSeverity] = useState('') // Defines the "type" of the alert's severity

    // Instancing useNavigate function
    const navigateTo = useNavigate()

    // useState hook to manage form input data
    // Initial state of the formData is set with empty strings for each field
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        document: '',
        is_active: true // Default value
    })

    // Function for handling form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(defaultState => ({ ...defaultState, [name]: value }));
    };

    // Function for submitting the creation of a User
    async function submitUser() {

        // Check if all required fileds are filled
        if (!formData.name || !formData.email || !formData.password || !formData.document) {
            setAlertMessage('To proceed with the Sign-up, all the required fileds must be filled out!');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json();

            if (response.ok) {
                console.log('User created with success!', data);
                setAlertMessage('Your user was created with success!');
                setAlertSeverity('success');
                setOpenAlert(true);

                // Resetting the form data
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    document: '',
                    is_active: true // Default value
                })

                // Navigate to the Users listing
                setTimeout(() => {
                    navigateTo('/users/')
                }, 2000);

            } else {
                console.error('Failed to sign up the User!', data);
                setAlertMessage('Failed to Sign Up!\nPlease try again!');
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        }
        catch (error) {
            console.error('An error occured while Signing Up!', error);
            setAlertMessage('An error occured while signing up!')
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    }

    // Array of field configurations
    const fields = [
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'E-mail', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Document', name: 'document', type: 'text' }
    ];

    return (
        <div id='user-signup-form'>
            <Card elevation={10} sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant='h4' component='h2' gutterBottom>
                        Create a new User
                    </Typography>
                    <form>
                        {fields.map((field) => (
                            <TextField
                                key={field.name}
                                label={field.label}
                                variant='outlined'
                                name={field.name}
                                type={field.type}
                                margin='normal'
                                fullWidth
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                            />
                        ))}

                        {/* Including " is_active" field on the formData */}
                        <input type='hidden' name='is_active' value={formData.is_active} />

                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{ fontWeight: 'bold', backgroundColor: '#3949ab', marginTop: 1 }}
                            onClick={submitUser}
                        >
                            sign-up
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

export default AddUser;