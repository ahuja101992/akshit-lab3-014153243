import React, { Component } from "react";
import "./profile.css";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { toProfileedit, getResProfile } from "../../actions/loginActions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { getBuyer } from '../../queries/queries';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

class Profileres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: null,
      last_name: null,
      phone_num: null,
      profile_image: null,
      rest_zip: null,
      rest_name: null
    }
    // this.getProfile = this.getProfile.bind(this);
  }
  componentDidMount() {
    console.log("cmponent mount");
    const email = sessionStorage.getItem("email_idRes");
    const data = {
      email_id: email
    };
    console.log("data    " + JSON.stringify(data));
    this.props.client.query({
      query: getBuyer,
      variables: {
        email_id: sessionStorage.getItem("email_id")
      },
    }).then((res) => {
      console.log("get buyer", res);
      this.setState({
        phone_num: res.data.user.phone_num,
        first_name: res.data.user.first_name,
        last_name: res.data.user.last_name,
        profile_image: res.data.user.profile_image,
        rest_name: res.data.user.rest_name,
        rest_zip: res.data.user.rest_zip,
        phone_num: res.data.user.phone_num
      })
      // this.setState({ login: true });
      // sessionStorage.setItem('name', res.data.user.first_name);
      // sessionStorage.setItem('email_id', res.data.user.email_id);

    }).catch(err => { console.log("invalid user", err); this.setState({ errMsg: "Invalid User" }) });
  }

  gotoEditProfile = e => {
    e.preventDefault();
    console.log("test 1");
    this.props.toProfileEditPage();
  };
  render() {
    var redirectVar;
    if (!cookie.load("cookieRes")) {
      redirectVar = <Redirect to="/reslogin" />;
    }
    if (this.props.toProfilePage == true) {
      console.log("goto profile edit page " + this.props.toProfilePage);
      redirectVar = <Redirect to="/Profileresedit" />;
    }
    return (
      <div>
        {redirectVar}

        <div
          class="profile-container col-sm-12"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div class="modal-body row" style={{ height: "100%" }}>
            <div class="col-md-4 border">
              <span>
                <div class="list-group">
                  <h4>Your Account</h4>
                  <a
                    href="#"
                    class=" list-group-item-action disabled boder-1 profile-tab label"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    class=" list-group-item-action disabled boder-1 profile-tab label"
                  >
                    Saved Resurants
                  </a>
                </div>
              </span>
            </div>
            <div class="col-md-8">
              <div class="container emp-profile">
                <div class="row profile-container">
                  <div>
                    <img
                      src={
                        this.state.profile_image
                          ? this.state.profile_image
                          : require("./profilepic.png")
                      }
                      class="rounded profile-image"
                      alt="avatar"
                    />
                  </div>
                  <div class="col-md-6">
                    <div class="profile-head">
                      <h5>{this.state.rest_name}</h5>
                      <h7>Registered Email: {this.state.email_id}</h7>
                      <h3>Profile</h3>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <Link
                      type="button"
                      class="btn btn-default"
                      name="btnAddMore"
                      value="Edit Profile"
                      to={{ pathname: "/Profileresedit" }}
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <label>Name</label>
                          </div>
                          <div class="col-md-6">
                            <p>
                              {this.state.first_name +
                                " " +
                                this.state.last_name}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Email</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.state.email_id}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Phone Number</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.state.phone_num}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Resturant Name</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.state.rest_name}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Resturant Zip Code</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.state.rest_zip}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Cuisine</label>
                          </div>
                          <div class="col-md-6">
                            <p>{this.state.cuisine}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withApollo(Profileres);

