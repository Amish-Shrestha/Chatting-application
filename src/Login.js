import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import { actionTypes } from './reducer';
import { useStateValue} from './StateProvider';

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
            <div className='login_container'>

            </div>
            <Button onClick={signIn}>
                Just with google
            </Button>
        </div>
    )
}

export default Login
