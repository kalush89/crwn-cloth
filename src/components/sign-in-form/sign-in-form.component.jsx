import { useState } from "react";
import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () => {
   // const { setCurrentUser } = useContext(UserContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const googleSignIn = async () => {
        await signInWithGooglePopup();
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
           // setCurrentUser(user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
          console.log('Unable to sign in', `${errorCode}, ${errorMessage}`);
          alert("Email or password does not match");
           
        }
     }
    return (
        <SignInContainer>
             <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
            <ButtonsContainer>
            <Button type="submit">Sign In</Button>
            <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={googleSignIn}>
                Google Sign In
            </Button>
            </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;