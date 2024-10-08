// Importing
import { useState } from 'react';
import './style.css'

function UserSignUp() {

    // useState hook to manage form input data
    // Initial state of the formData is set with empty strings for each field
    const [formData, setFormData] = useState ({
        name: '',
        email: '',
        password: '',
        document:'',
        is_active: true // Default value
    })

    // Function for handling form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(defaultState => ({...defaultState,[name]: value}));
    };

    // Function for submitting the creation of a User
    async function submitUser() {
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
                document:'',
                is_active: true // Default value
            })
        } else {
            console.error("Failed to sign up the User:", data);
            alert('Failed to Sign Up!\nPlease try again!')
        }}
        catch(error) {
            console.error('Error Signing Up:', error)
            alert('An error occured while signing up!')
        };
    }

    return(
        <div id="user-signup-form">
            <h2>Sign Up</h2>
            <form>
                <label form='name'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='user-signup-name-input'
                    value={formData.name}
                    onChange={handleChange}
                />
                
                <label form='email'>E-mail</label>
                <input
                    type='email'
                    name='email'
                    id='user-signup-email-input'
                    value={formData.email}
                    onChange={handleChange}
                />
                
                <label form='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='user-signup-pswd-input'
                    value={formData.password}
                    onChange={handleChange}
                />
                
                <label form='document'>Document</label>
                <input
                    type='text'
                    name='document'
                    id='user-signup-document-input'
                    value={formData.document}
                    onChange={handleChange}
                />
                
                {/*inclding " is_active" field in the data sent*/}
                <input type='hidden' name='is_active' value={formData.is_active}/>

                <input
                    type='button' 
                    value='Sign-up'
                    onClick={submitUser}
                />
            </form>
        </div>
    )
}

export default UserSignUp;