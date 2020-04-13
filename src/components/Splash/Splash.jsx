import React from 'react';
import './Splash.css';
import Button from '@material-ui/core/Button';

// type AcceptedProps = {
//   testProp: string,
//   optionalProp?: string
// };

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    }

  render() {
    return (
        <div className="Splash">
            <div className="mainContainer">
                <div className="top">
                <img src="/logo1.png" alt=""/>
                </div>
                <div className="middle">
                <p>helpMeDecide is a community-based decision helper.</p><hr />
                <p> Stuck at a crossroads?</p>
                <p>Let the Community Decide</p><hr />
                </div>
                <div className="bottom">
                <Button className="loginButton" variant="contained" onClick={this.props.login} color="primary">Login</Button>
                <Button className="loginButton" variant="contained" onClick={this.props.register} color="primary">Register</Button>
                </div>
            </div>
        </div>
    );
  }

}

export default Splash;
