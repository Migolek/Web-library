import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormDialog from './SignUp';

import { auth } from '../../firebase';
import logo from "../../assets/img/library.png";

const styles= {
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    width: '350px',
    minHeight: '280px',
    padding: '30px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  logo: {
    backgroundSize: 'contain',
    height: '150px',
  }
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: ''
};

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;
    auth.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        localStorage.setItem('auth', true);
        window.location.replace('/dashboard');
      })
      .catch(error => {
        this.setState({
          error,
        });
        localStorage.setItem('auth', '');
      });

    event.preventDefault();
  }

  asGuest = () => {
    localStorage.setItem('auth', true);
    window.location.replace('/dashboard');
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div style={styles.wrapper}> 
        <Card className='login-card' style={styles.card}>
          <CardMedia
            className='login-cardMedia'
            image={logo}
            title="Web library"
            style={styles.logo}
          />
          <form style={styles.form} onSubmit={this.onSubmit}>
            <CardContent style={styles.form}>
              <Typography gutterBottom variant="headline" component="h1" align="center">
                Web Library
              </Typography>
              <TextField
                id="name"
                label="Email"
                className="login-emailInput"
                value={email}
                onChange={this.handleChange('email')}
                margin="normal"
                helperText="Please enter your email."
              />
              <TextField
                id="password-input"
                label="Password"
                className="login-passwordInput"
                value={password}
                type="password"
                onChange={this.handleChange('password')}
                autoComplete="current-password"
                margin="normal"
                helperText="Please enter your password."
              />
              <Typography variant="body1" style={{color: 'red'}}>
                {error ? `${error}` : false}
              </Typography>
            </CardContent>
            <CardActions style={styles.cardActions}>
              <Button type="submit" variant="contained" color="primary" className="login-btn">
                Sign in
              </Button>
              <Button variant="contained" color="secondary" className="forgotPassword-btn" onClick={this.asGuest}>
                Guest
              </Button>
            </CardActions>
          </form>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <FormDialog />
          </div>
        </Card>
      </div>
    );
  }
}

export default LoginView;