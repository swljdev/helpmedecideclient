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
import './login.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
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
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"user":{"email":this.state.email,"password":this.state.pass}});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

fetch("http://localhost:3001/user/login", requestOptions)
  .then(response => response.json())
  .then(result => {
    if ("error" in result) {
      alert(result.error)
    } else if (result.sessionToken !== undefined){
      try {
          localStorage.setItem('session', result.sessionToken);
          this.props.authed()
        } catch(error) {
          console.error(error);
        }
      }
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
          Sign in
        </Typography>
        <form>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.loginHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={this.props.register} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}
}

export default Login;