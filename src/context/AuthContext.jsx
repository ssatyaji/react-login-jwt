import React from "react";
import axios from "axios";

const axiosRequest = axios.create();
const AuthContext = React.createContext();

//konfigurasi axios
axiosRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  //`Bearer ${token}`
  config.headers.Authorization = token;
  return config;
})

export class AuthContextProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: localStorage.getItem("user") || "",
      token: localStorage.getItem("token") || "",
      isLoggedIn: localStorage.getItem("token") === null ? false : true,
    };
  }

  initUser = () => {
    return axiosRequest.get("http://localhost:3000/api/profile")
    .then((res) => {
      this.setState({ user: res.data });
      return res;
    })
  }

  //login
  login = (credentials) => {
    return axiosRequest
      .post("http://localhost:3000/api/login", credentials)
      .then((res) => {
        const { token } = res.data;

        localStorage.setItem("token", token);

        this.setState({
          token,
          isLoggedIn: true,
        });

        return console.log(res);
      });
  };

  //logout
  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
    });

    return console.log("Logout");
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          initUser: this.initUser,
          ...this.state,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

//Higher order Component
export const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(context) => (
            <WrappedComponent {...this.props} {...context} />
          )}
        </AuthContext.Consumer>
      );
    }
  };
};
