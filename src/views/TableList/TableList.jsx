import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SimpleDialogWrapped from '../../components/Dialog/Dialog'
// core components
import { db } from '../../firebase';

const styles = {
  card: {
    width: 270,
    margin: '15px 5px', 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class TableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    db.onceGetVideos().then(snapshot => {
      const movies = snapshot.val();
      const moviesArray = Object.values(movies).map(value=> {
        return {...value};
      })
      this.setState({movies: moviesArray});
    });
  }

  renderMovies = () => {
    const movies = this.state.movies;
    const { classes } = this.props;

    return movies.map((movie, index) => (
      <Card className={classes.card} key={index}>
        <div style={{
          height: '300px', 
          backgroundImage: `url('${movie.thumb_url}')`, 
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center'}}>
        </div>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${movie.name} (${movie.release_date})`}
          </Typography>
          <Typography component="p" style={{marginBottom: '10px'}}>
            <b>Name:</b> {movie.name}
          </Typography>
          <Typography component="p" style={{marginBottom: '10px'}}>
          <b>Director:</b> {movie.director}
          </Typography>
          <Typography component="p" style={{marginBottom: '10px'}}>
          <b>Year of production:</b> {movie.release_date}
          </Typography>
          <Typography component="p" style={{marginBottom: '10px'}}>
          <b>Aviable amount:</b> {movie.amount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClickOpen}>
            <b>Reserve movie</b> 
          </Button>
          <SimpleDialogWrapped
            open={this.state.open}
            onClose={this.handleClose}
          />
        </CardActions>
      </Card>
    ))
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container style={{justifyContent: 'space-around'}}>
        {this.renderMovies()}
      </Grid>
    );
  }
}

export default withStyles(styles)(TableList);
