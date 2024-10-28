// Importing
import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import './style.css';

function UserSignUp() {

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
            alert('To proceed with the Sign-up, all the required fileds must be filled out!');
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
                alert('Your user was created with success!')

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
                alert('Failed to Sign Up!\nPlease try again!')
            }
        }
        catch (error) {
            console.error('Error Signing Up:', error)
            alert('An error occured while signing up!')
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

                        {/*inclding " is_active" field in the data sent*/}
                        <input type='hidden' name='is_active' value={formData.is_active} />

                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{ backgroundColor: '#3949ab', marginTop: 1}}
                            onClick={submitUser}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserSignUp;