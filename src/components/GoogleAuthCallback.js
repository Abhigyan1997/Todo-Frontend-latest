import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extract code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          // Exchange the authorization code for user data
          const response = await axios.get(`http://localhost:5000/api/auth/google/callback?code=${code}`);
          const userData = response.data;
          console.log(userData);
          // Save user data (e.g., in context or local storage)
          // Redirect to the dashboard or another page
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;
