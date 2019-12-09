import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { addSections } from "../../actions/orderAction";
import React, { Component } from "react";
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { addSectionMutation } from '../../mutation/mutation'
class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = { sectionName: "" };
    this.sectionChangeHandle = this.sectionChangeHandle.bind(this);
  }
  sectionChangeHandle = e => {
    this.setState({
      sectionName: e.target.value,
      sectionAdded: false
    });
  };
  submitSection = e => {
    e.preventDefault();
    let rest_email = sessionStorage.getItem("email_id");
    // let rest_email = "akshit@gmail.com";
    const data = {
      section_name: this.state.sectionName,
      email_id: rest_email
    };
    console.log("test " + JSON.stringify(data));
    this.props.addSectionMutation({
      variables: {
        section_name: this.state.sectionName,
        email_id: rest_email
      }
      // refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({ sectionAdded: true })
  };
  render() {
    let dispMsg = "";
    if (this.state.sectionAdded === true) {
      dispMsg = (
        <div class="text-center">
          <p>Section added successfully</p>
        </div>
      );
    }
    return (
      <div>
        <div class="section-container col-sm-11">
          <form onSubmit={this.submitSection}>
            <h3>Add Section</h3>
            {dispMsg}
            <div class="col-sm-4 input-container">
              <span class="section-name">Section Name:</span>
              <input
                type="text"
                name="section"
                onChange={this.sectionChangeHandle}
                required
              />
            </div>
            <button class="btn btn-primary col-sm-2 add-section" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(addSectionMutation, { name: "addSectionMutation" })
)(AddSection);
