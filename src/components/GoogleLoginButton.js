/*import { useAuth } from '../context/AuthContext'; // Importing the useAuth hook from the AuthContext
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import Swal from 'sweetalert2'; // Importing the Swal library for displaying alerts

// import React, { useEffect } from "react";

const GoogleLoginButton = () => {
    const { setUser } = useAuth(); // Getting the setUser function from the useAuth hook
    const navigate = useNavigate(); // Getting the navigate function from react-router-dom

    // useEffect(() => {
    //   window.gapi.load('auth2', function() {
    //     window.gapi.auth2.init({
    //       client_id: 'TU_CLIENT_ID_DE_GOOGLE', // Reemplaza con tu Client ID de Google
    //     });
    //   });
    // }, []);

    const onSignIn = async (googleUser) => {
        const profile = googleUser.getBasicProfile(); // Getting the basic profile information of the user
        const id_token = googleUser.getAuthResponse().id_token; // Getting the ID token of the user

        try {
            const response = await fetch("http://localhost:5500/google-login", {
                method: "POST",
                headers: {
                    "Content-Type: "application/json" // Setting the content type header to JSON
                },
                body: JSON.stringify({ token: id_token }) // Sending the ID token in the request body
            });

            if (response.ok) {
                const data = await response.json(); // Parsing the response data as JSON
                localStorage.setItem('userToken', data.access_token); // Storing the user token in local storage
                localStorage.setItem('user', JSON.stringify(data.user)); // Storing the user object in local storage
                sessionStorage.setItem('userToken', data.access_token); // Storing the user token in session storage
                sessionStorage.setItem('user', JSON.stringify(data.user)); // Storing the user object in session storage
                setUser({ ...data.user, isAuthenticated: true }); // Updating the user state with the received user data
                Swal.fire({
                    title: '¡Inicio de sesión exitoso! 🎉',
                    text: '¡Bienvenido de nuevo!',
                    icon: 'success',
                    confirmButtonText: 'Vamos allá',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }); // Displaying a success alert
                navigate(data.user.profile.role === "Proveedor" ? '/providerdashboard' : '/userdashboard'); // Navigating to the appropriate dashboard based on the user's role
            } else {
                const errorData = await response.json(); // Parsing the error response data as JSON
                Swal.fire({
                    title: '¡Error en el inicio de sesión! 😢',
                    text: `Error: ${errorData.msg}`,
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }); // Displaying an error alert with the error message
            }
        } catch (error) {
            Swal.fire({
                title: '¡Error en el inicio de sesión! 😢',
                text: `Error: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Entendido',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }); // Displaying an error alert with the error message
        }
    };

    const handleGoogleLogin = () => {
        const auth2 = window.gapi.auth2.getAuthInstance(); // Getting the Google Auth instance
        auth2.signIn().then(onSignIn); // Signing in with Google and calling the onSignIn function
    };

    return (
        <button className="btn btn-danger" onClick={handleGoogleLogin}>
            Iniciar sesión con Google
        </button>
    );
};

export default GoogleLoginButton; */
