import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import { actionTypes } from './reducer';
import { useStateValue} from './StateProvider';
import './login.css';
import logo from './trinity_college_logo.jpg';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch
           ({
            type: actionTypes.SET_USER,
            user: result.user,
        });
        })
        .catch((error) => alert(error.message));
        
    }
    return (
        <div className='login'>
             <div className='container'>
            <div className='header'>
                <h3 style={{fontStyle:"italic",fontSize:"40px" ,fontWeight:600}}>
                    Login Page
                 </h3>   
            </div>
            </div>
            <div className='login_container'>
            <Button onClick={signIn}>
                <h6>Just with google</h6>
            </Button>
            </div>
        </div>
    )
}

export default Login
