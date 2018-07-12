import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { db } from '../../firebase';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const initialState = {
  name: 'Jan',
  lastname: 'Kowalski',
  email: 'jan.kowalski@email.com',
  address: 'Warszawsa 2',
  city: 'Warszawa',
  postCode: '44-100',
  country: 'Polska',
}

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {...initialState},
      newData: {}
    }
  }
  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    const id = localStorage.getItem('currentUserID');
    if (id) {
      db.onceGetUsers().then(snapshot => {
        const userInfo = snapshot.val();
        
        this.setState({
          currentUser: userInfo[id],
          newData: userInfo[id]
        });
      });
    }
  }

  changeInputValue = name => event => {
    let currentState = Object.assign({}, this.state.newData);
    currentState[name] = event.target.value;
    this.setState({
      newData: currentState
    });
  };

  updateUser = (id, data) => {
    if (id) {
      db.updateUser(id, data).then(() => {
        this.fetchUserData();
      });
    } else {
      alert('Cannot update guest user.')
    }
  }
  
  render() {
    const { classes } = this.props;
    const { currentUser, newData } = this.state;
    const id = localStorage.getItem('currentUserID');
    console.log('dane', currentUser);
    console.log('dane name', currentUser.name);

    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('name')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('lastname')}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('email')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('address')}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('city')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('country')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Post Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.changeInputValue('postCode')}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button onClick={() => this.updateUser(id, newData)} color="primary">Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h4 className={classes.cardTitle}>{currentUser.name + ' ' + currentUser.lastname}</h4>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b>First name:</b> {currentUser.name || 'User first name'}
                </p>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b>Last name:</b> {currentUser.lastname || 'User last name'}
                </p>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b> Email:</b> {currentUser.email || 'User email'}
                </p>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b>Address:</b> {currentUser.address || 'User address'}
                </p>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b>City:</b> {currentUser.city || 'User city'}
                </p>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b>Post code:</b> {currentUser.postCode || 'User post code'}
                </p>
                <p className={classes.description} style={{textAlign: 'left'}}>
                  <b>Country:</b> {currentUser.country || 'User country'}
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  };
}

export default withStyles(styles)(UserProfile);
