import React, { Component } from "react";
import { BrowserRouter, Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper" >
        <div className="row">
          <div className="col s12 center-align">
            <h4>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Stuff about how expressing gratitude is good for you here...
            </p>
            <br />
            <div className="group">
              <Link
                to="/register"
                className="btn"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default Landing;