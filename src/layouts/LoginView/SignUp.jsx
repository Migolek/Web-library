import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { auth, db } from '../../firebase';

const styles = theme => ({
  container: {
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const initialState = {
  open: false,
  name: '',
  lastname: '',
  email: '',
  password: '',
  country: '',
  address: '',
  postCode: '',
}

class FormDialog extends React.Component {
  state = {
    open: false,
    name: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    address: '',
    postCode: '',
    error: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, ...initialState });
    console.log(this.state);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { 
      name,
      lastname,
      email,
      password,
      country,
      address,
      postCode, } = this.state;
    if (email === '' || password === '') {
      this.setState({ error: 'Email and password cannot be empty.'});
      return false;
    }
    if (password.length < 6) {
      this.setState({ error: 'Password is too short.'});
      return false;
    }
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {

        const userData = {
          name,
          lastname,
          email,
          password,
          country,
          address,
          postCode,
        }
        db.doCreateUser(authUser.user.uid, userData)
          .then(response => {
            this.setState(() => ({ ...initialState }));
          })
          .catch(error => {
            this.setState({error: error});
          });
      })
      .catch(error => {
        this.setState({error: error});
      });
    
    window.confirm('You have been successfully regitered.');
    this.setState({ ...initialState });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" className="forgotPassword-btn" onClick={this.handleClickOpen}>
          Register
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.container} onSubmit={this.onSubmit} noValidate >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To register to this website, please fill all required fields.
              </DialogContentText>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="lastname"
                label="Last name"
                className={classes.textField}
                value={this.state.lastname}
                onChange={this.handleChange('lastname')}
                margin="normal"
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                type="password"
                onChange={this.handleChange('password')}
                margin="normal"
              />
              <TextField
                id="country"
                label="Country"
                select
                className={classes.textField}
                value={this.state.country}
                onChange={this.handleChange('country')}
                margin="normal"
              >
                <option value="Poland" selected>Poland</option>
                <option value="Russia">Russia</option>
                <option value="England">England</option>
                <option value="China">China</option>
                <option value="Spain">Spain</option>
                <option value="Norway">Norway</option>
                <option value="USA">USA</option>
              </TextField>
              <TextField
                id="address"
                label="Address"
                className={classes.textField}
                value={this.state.address}
                type="text"
                onChange={this.handleChange('address')}
                margin="normal"
              />
              <TextField
                id="postcode"
                label="Post code"
                className={classes.textField}
                value={this.state.postCode}
                type="text"
                onChange={this.handleChange('postCode')}
                margin="normal"
              />
            </DialogContent>
            <div>
              <span style={{ margin: '32px', color: '#e42626', fontWeight: 500 }}>{this.state.error}</span>
            </div>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);