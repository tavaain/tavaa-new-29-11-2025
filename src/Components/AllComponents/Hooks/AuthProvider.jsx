import { jwtDecode } from "jwt-decode";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";

import app from "../../Authentication/firebase/firebase.config";


export const AuthContext = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [maulLoading, setMaulLoading] = useState(true);  
    const [DLoading, setDLoading] = useState(true);
    
    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const dateNow = new Date();
            return decodedToken.exp < dateNow.getTime() / 1000;
        } catch (error) {
            console.error('Invalid token', error);
            return true;
        }
    };
    
    // Logout function
    const handleAdminLogout = () => {
        localStorage.removeItem('token');
        <Navigate to={"/adminLoginPanel"} replace />
        // window.location.href = "/adminLoginPanel";
    };
    

    const sendEmailVerificationLink = (getUser) => {
        return sendEmailVerification(getUser)
    }


    

    const userEmailUpdate = (email) => {
        return updateEmail(user, email)
    }

    const userPasswordUpdate = (password) => { 
        return updatePassword(user, password);
    }

    

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth).then(() => setUser(null))
    }

    const updateNameAndPhoto = (user, displayName, photoUrl) => {
        return updateProfile(user, {
            displayName: displayName,
            photoURL: photoUrl
        })
    }

    const ForgotPassword = (email) => {
        return sendPasswordResetEmail(auth , email)
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            if (isTokenExpired(token)) {
                handleAdminLogout();
            } else {
                const checkInterval = setInterval(() => {
                    if (isTokenExpired(token)) {
                        handleAdminLogout();
                        clearInterval(checkInterval);
                    }
                }, 60000); // Check every minute
            }
        }


        const unscubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
        return () => {
            return unscubcribe();
        };
    }, []);

    const authInfo = {
        user, loading,setMaulLoading,maulLoading, userPasswordUpdate, logOut, createUser, signInUser,
        userEmailUpdate, updateNameAndPhoto,DLoading, setDLoading, sendEmailVerificationLink,ForgotPassword
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;