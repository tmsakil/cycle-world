import React, { useEffect } from 'react';
import './SocialLogin.css'
import FacebookLogo from '../../Images/facebook.png'
import GoogleLogo from '../../Images/google.png'
import GithubLogo from '../../Images/github.png'
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';


const SocialLogin = () => {

    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [signInWithFacebook, facebookUser, loading, facebookError] = useSignInWithFacebook(auth)
    const [signInWithGoogle, googleUser, loading1, googleError] = useSignInWithGoogle(auth)
    const [signInWithGithub, githubUser, loading2, githubError] = useSignInWithGithub(auth)

    useEffect(() => {
        if (googleUser || facebookUser || githubUser) {
            navigate(from, { replace: true });
        }
    })
    useEffect(() => {
        if(googleError || facebookError || githubError){
            toast.error(googleError?.message || facebookError?.message || githubError?.message)
        }
    },[googleError,facebookError, githubError])

    return (

        <div className='signin-logo-container'>
            <img onClick={() => signInWithFacebook()} src={FacebookLogo} alt="" />
            <img onClick={() => signInWithGoogle()} src={GoogleLogo} alt="" />
            <img onClick={() => signInWithGithub()} src={GithubLogo} alt="" />
        </div>
    );
};

export default SocialLogin;