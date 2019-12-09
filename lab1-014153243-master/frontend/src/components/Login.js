import React, { Component } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { fetchLogin, toSignUp } from "../actions/loginActions";
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { getUserQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
// import cookie from "react-cookie";
// import cookie from "react-cookies";
// import { Redirect } from "react-router";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false, errMsg: ""
    }
    this.loginBuyer = this.loginBuyer.bind(this);
    this.toSignUpBuy = this.toSignUpBuy.bind(this);
  }
  toSignUpBuy(e) {
    e.preventDefault();
    console.log("test 1");
    this.props.toSignUp();
  }
  loginBuyer(e) {
    e.preventDefault();
    // console.log("inside" + e.target.length);
    const formdata = new FormData(e.target);
    const data = {
      username: formdata.getAll("username")[0],
      password: formdata.getAll("password")[0]
    };
    // for (let i = 0; i < e.target.length; i++) {
    //   console.log("testing" + e.target[i].name);
    // }
    // this.props.fetchLogin(data);
    this.props.client.query({
      query: getUserQuery,
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
    console.log("testing auth flag: " + this.state.login);
    var redirectVar, dispMsg;
    if (this.state.login === true) {
      cookie.save("cookieBuy", {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      redirectVar = <Redirect to="/home" />;
    }
    if (this.state.errMsg === "Invalid User") {
      dispMsg = (
        <div class="text-center">
          <p>{this.state.errMsg}</p>
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card my-5">
                <div class="card-body">
                  <h3 class="card-title">Sign in with your Grubhub account</h3>
                  {dispMsg}
                  <form id="loginForm" onSubmit={this.loginBuyer}>
                    <div class="form-label-group">
                      <label class="label-new" for="inputEmail">
                        Email
                      </label>
                      <input
                        class=""
                        type="email"
                        id="inputEmail"
                        class="form-control"
                        placeholder=""
                        name="username"
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
                        id="inputPassword"
                        class="form-control"
                        name="password"
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
                        Keep me signed in
                      </label>
                    </div>
                    <button class="btn btn-lg btn-danger btn-block">
                      Sign in
                    </button>
                    <div class="text-center">
                      <p> </p>
                      <p>or</p>
                    </div>

                    <div class="text-center">
                      <Link
                        value="Create your account"
                        to={{ pathname: "/SignUpBuyer" }}
                      >
                        Create Your Account
                      </Link>
                    </div>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);


export default withApollo(Login)
// export default graphql(getUserQuery, { name: "getUserQuery" })(Login);
// export default graphql(getUserQuery, { options: (props) => ({ variables: { "email_id": "w", "password": "w" } }) })(Login)