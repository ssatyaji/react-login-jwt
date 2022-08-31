import React from "react";
import { withAuth } from "../context/AuthContext"
import StatusButton from "./StatusButton";

class  Profile extends React.Component {
  componentDidMount() {
    this.props.initUser();
  }

  render() {
    return (
      <div>
        <h2> Halaman Profile: {this.props.user.email}</h2>
        <hr />
        <StatusButton />
      </div>
    )
  }
}

export default withAuth(Profile);