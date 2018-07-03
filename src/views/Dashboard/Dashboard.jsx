import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from '@material-ui/icons/Store'
import Warning from "@material-ui/icons/Warning";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { db } from '../../firebase';

class Dashboard extends React.Component {
  state = {
    value: 0,
    usersAmount: 0,
    moviesAmount: 0
  };

  componentDidMount() {
    this.getUsersAmount();
    this.getMoviesAmount();
  }
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getUsersAmount = async () => {
    const usersAmount = await db.countUsers();
    this.setState({usersAmount: usersAmount});
  }

  getMoviesAmount = async () => {
    const moviesAmount = await db.countMovies();
    this.setState({moviesAmount: moviesAmount});
  }

  render() {
    const { classes } = this.props;
    const { moviesAmount, usersAmount } = this.state;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <ContentCopy />
                </CardIcon>
                <p className={classes.cardCategory}>Registered users</p>
                <h3 className={classes.cardTitle}>
                  {usersAmount ? usersAmount : 'Loading...'}
                </h3>
              </CardHeader>
              <CardFooter stats>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Movies avaiable</p>
                <h3 className={classes.cardTitle}>
                  {moviesAmount ? moviesAmount : 'Loading...'}
                </h3>
              </CardHeader>
              <CardFooter stats>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
