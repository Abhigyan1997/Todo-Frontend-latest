import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Grid, TextField, Button, Typography, Link, AppBar, Toolbar,
  Card, CardContent, CardActions, InputAdornment, IconButton
} from '@mui/material';
import {
  Email, Lock, LockOpen, Visibility, VisibilityOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Notification from '../Notification/notification'; // Adjust the import path as needed
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setNotification({ message: 'Passwords do not match', severity: 'error' });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        email: formData.email,
        password: formData.password,
      });
  
      if (response.data.token) {
        setNotification({ message: 'Signup successful!', severity: 'success' });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setNotification({ message: error.response?.data?.error || 'An error occurred', severity: 'error' });
    }
  };
  
  const handleGoogleSuccess = (response) => {
    window.location.href = 'http://13.233.158.103/auth/google';
  };

  const handleGoogleFailure = (error) => {
    setNotification({ message: 'Google authentication failed', severity: 'error' });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
            TODO
          </Typography>
          <Button color="inherit" sx={{ color: '#fff' }} onClick={() => navigate('/')}>
            Login
          </Button>
          <Button color="inherit" variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }} onClick={() => navigate('/signup')}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
      <Card sx={{ mt: 5, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <CardActions sx={{ mt: 2, justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4, py: 1 }}>
                Signup
              </Button>
            </CardActions>
          </form>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography>
              Already have an account? <Link href="/">Login</Link>
            </Typography>
            <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
              />
            </Button>
          </CardContent>
        </CardContent>
      </Card>
      {notification && (
        <Notification
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification(null)}
        />
      )}
    </Container>
  );
};

export default Signup;
