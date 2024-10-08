// Importing
import './style.css'

function UserSignUp() {
   
    return(
        <div id="user-signup-form">
            <h2>Sign Up</h2>
            <form>
                <label form='name'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='user-signup-name-input'
                />
                
                <label form='email'>E-mail</label>
                <input
                    type='email'
                    name='email'
                    id='user-signup-email-input'
                />
                
                <label form='password'>Password</label>
                <input
                    type='text'
                    name='password'
                    id='user-signup-pswd-input'
                />
                
                <label form='document'>Document</label>
                <input
                    type='text'
                    name='document'
                    id='user-signup-document-input'
                />
                
                <input
                    type='button' 
                    value='Sign-up'
                />
            </form>
        </div>
    )
}

export default UserSignUp;