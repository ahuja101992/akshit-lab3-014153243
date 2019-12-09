import React, { Component } from "react";
import "./../login.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { sign_in_res } from "../../actions/loginActions";
import gql from 'graphql-tag';
import { getBuyerQuery } from '../../queries/queries';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

class ResLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      errMsg: ""
    }
    this.loginResturant = this.loginResturant.bind(this);
  }
  loginResturant(e) {
    console.log("step1");
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = {
      username: formdata.getAll("username")[0],
      password: formdata.getAll("password")[0]
    };
    this.props.client.query({
      query: getBuyerQuery,
      variables: {
        email_id: formdata.getAll("username")[0],
        password: formdata.getAll("password")[0]
      },
    }).then((res) => {
      console.log("signInBuyer res", res)
      this.setState({ login: true });
      sessionStorage.setItem('name', res.data.user.first_name);
      sessionStorage.setItem('email_id', res.data.user.email_id);

    }).catch(err => { console.log("invalid user", err); this.setState({ errMsg: "Invalid User" }) });
  }

  render() {
    var redirectVar, dispMsg;
    if (this.state.login === true) {
      redirectVar = <Redirect to="/homeR" />;
      cookie.save("cookieRes", {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
    }
    if (this.state.errMsg === "Invalid User") {
      console.log("got this");
      dispMsg = (
        <div class="text-center">
          <p>Invalid username or password</p>
        </div>
      );
    }
    return (
      <div class="bg-light login-container">
        <div class="container">
          {redirectVar}
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-4 mx-auto border border-light">
              <div class="card my-5 border border-light">
                <div class="card-body bg-light">
                  <div class="titleImg"></div>
                  {dispMsg}
                  <form onSubmit={this.loginResturant}>
                    <div class="form-label-group">
                      <label class="label-new" for="inputEmail">
                        Username or email address
                      </label>
                      <input
                        class=""
                        name="username"
                        type="email"
                        id="inputEmail"
                        class="form-control"
                        placeholder=""
                        required
                        autofocus
                        maxLength="50"
                      />
                    </div>
                    <div class="form-label-group">
                      <label class="label-new" for="inputPassword">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="inputPassword"
                        class="form-control"
                        placeholder=""
                        required
                        maxLength="30"
                      />
                    </div>
                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        class="custom-control-label input-area label-new"
                        for="customCheck1"
                      >
                        Remember me
                      </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block">
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withApollo(Login)