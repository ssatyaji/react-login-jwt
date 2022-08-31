import React from "react";
import { withAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  }
  
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state)
  }

  render() {
    if(this.props.isLoggedIn){
      return <Navigate push to='/profile' />
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}
                  value={this.state.email}
                  type="text" placeholder="email" name="email" />

          <input onChange={this.handleChange} 
                  value={this.state.password}
                  type="password" placeholder="password" name="password" />
          
          <input type="submit" value="login" />
        </form>
      </div>
    )
  }
}

export default withAuth(Login);