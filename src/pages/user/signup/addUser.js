// Importing
import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import './style.css';

function AddUser() {

    // UseState hook for managing alerts
    const [openAlert, setOpenAlert] = useState(false) // Controls the visibility of the alert
    const [alertMessage, setAlertMessage] = useState('') // Holds the message to be displayed in the alert
    const [alertSeverity, setAlertSeverity] = useState('') // Defines the "type" of the alert's severity

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
                setAlertMessage('Your user was created with success!')
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
            } else {
                console.error('Failed to sign up the User:', data);
                setAlertMessage('Failed to Sign Up!\nPlease try again!')
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        }
        catch (error) {
            console.error('Error Signing Up:', error)
            setAlertMessage('An error occured while signing up!')
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    }

    // Array of field configurations
    const fields = [
        { label: 'Nome', name: 'name', type: 'text' },
        { label: 'E-mail', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Document', name: 'document', type: 'text' }
    ];

    return (
        <div id='user-signup-form'>
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant='h4' component='h2' gutterBottom>
                        Cadastre-se
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
                            sx={{ backgroundColor: '#3949ab', marginTop: 1 }}
                            onClick={submitUser}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Snackbar for alerts*/}
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