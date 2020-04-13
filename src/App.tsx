import React from 'react';
import './App.css'
import Register from './components/Login/register'
import Login from './components/Login/login'
import Splash from './components/Splash/Splash'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router } from 'react-router-dom';


interface Props {

}

interface State {
  step: string
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // session: null,
      step: "Splash" 
    }
    this.stepLogin = this.stepLogin.bind(this);
    this.stepRegister = this.stepRegister.bind(this);
    this.stepLoggedIn = this.stepLoggedIn.bind(this);
    this.stepLogout = this.stepLogout.bind(this);
  }

  stepLogin(): void {
    this.setState({
      step: "Login"            
    })
  }

  stepRegister(): void {
    this.setState({
      step: "Register"
    })
  }

  stepLoggedIn(): void {
    this.setState({
      step: "Authed"
    })
  }

  stepLogout(): void {
    this.setState({
      step: "Splash"
    })
  }

  render() {
    if (this.state.step === "Splash") {
      return (
        <div className="App">
        <Splash login={this.stepLogin} register={this.stepRegister}/>
        </div>
      );
    } else if (this.state.step === "Login") {
      return (
        <div className="App">
        <Login register={this.stepRegister} authed={this.stepLoggedIn} splash={this.stepLogout}/>
        </div>
      );
    } else if (this.state.step === "Register") {
      return (
        <div className="App">
        <Register login={this.stepLogin} authed={this.stepLoggedIn}/>
        </div>
      );
    } else if (this.state.step === "Authed") {
      return (
      <div className="Main">
        <Router>
        <Navbar splash={this.stepLogout} />
        </Router>
        
<<<<<<< HEAD
        <Home splash={this.stepLogout}/>
=======
>>>>>>> 41d52bce1b534e59880bd3669fa05c22eeb86c9a
        </div>
    )
    }
  }
}

export default App;
