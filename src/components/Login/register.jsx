import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Register extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
        email: '',
        pass: '',
      //Next state Var
    }
    //Next state Method
    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler(event) {
    event.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"user":{"email":this.state.email,"password":this.state.pass}});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

fetch("http://localhost:3001/user/createuser", requestOptions)
  .then(response => response.json())
  .then(result => {
    try {
      localStorage.setItem('session', result.sessionToken);
      console.log('Session Token Saved in Local Storage')
     this.props.authed()
    } catch(error) {
      console.error(error);
    }
    
    //Call the SetState Prop Here to switch state to Logged In.

  })
  .catch(error => console.log('error', error));
    
  }
  render() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
      <img src="/logo1.png" alt=""/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form>
          <Grid container spacing={2}>
         
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              console.log(e.target.value)
              this.setState({
                email: e.target.value,
              })
              }}
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => {
              console.log(e.target.value)
              this.setState({
                pass: e.target.value,
              })
              }}
            
          />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Send me Email Updates"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.loginHandler}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
          <Grid item>
              <Link href="#" onClick={this.props.login} variant="body2">
                "Already have an account? Sign In"
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}
}

export default Register