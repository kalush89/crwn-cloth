import { useState } from "react";
import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';
const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const googleSignIn = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
 
        setFormFields({...formFields, [name]: value})
     };

     const handleSubmit = async (event) => {
         event.preventDefault();

         try {
             const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
            console.log(user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
          console.log('Unable to sign in', `${errorCode}, ${errorMessage}`);
          alert("Email or password does not match");
           
        }
     }
    return (
        <div className="sign-in-container">
             <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
            <div className="buttons-container">
            <Button buttonType="google-sign-in" type="submit">Sign In</Button>
            <Button type="button" buttonType='google' onClick={googleSignIn}>
                Google Sign In
            </Button>
            </div>
            </form>
        </div>
    )
}

export default SignInForm;