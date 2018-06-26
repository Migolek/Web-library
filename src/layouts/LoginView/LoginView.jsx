import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
  }
}

class LoginView extends Component {
  render() {
    return (
      <div style={styles.wrapper}> 
        <Card className='login-card'>
          <CardMedia
            className='login-cardMedia'
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              Web library
            </Typography>
            <form style={styles.form}>
              <TextField
                id="name"
                label="Name"
                className="login-nameInput"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="password-input"
                label="Password"
                className="login-passwordInput"
                type="password"
                autoComplete="current-password"
                margin="normal"
              />
            </form>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" className="login-btn">
              Sign in
            </Button>
            <Button variant="contained" className="forgotPassword-btn">
              Register
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default LoginView;