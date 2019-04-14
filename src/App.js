import React, { Component } from "react";
import "./Style.css";
import Logo from "./images/MDR_logo.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      userpw: "",
      userCreds: [{}]
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/usercreds")
      .then(res => res.json())
      .then(res => {
        this.setState({
          userCreds: res.data
        });
      });
  }

  updateUser(user) {
    this.setState({ user: user.target.value.substr(0, 50) });
  }

  updateUserPw(userpw) {
    this.setState({ userpw: userpw.target.value.substr(0, 50) });
  }

  passwordValidation() {
    const { userCreds } = this.state;
    const userDetails = userCreds.map(() => {
      const found = userCreds.find(e => e.Username === this.state.user);

      return {
        UserID: found ? found.UserID : null,
        Username: found ? found.Username : null,
        Password: found ? found.Password : null
      };
    });

    if (
      this.state.user === userDetails[0].Username &&
      this.state.userpw === userDetails[0].Password
    ) {
      this.props.history.push(`/home/${userDetails[0].UserID}`);
    } else {
      alert("Wrong Username or Password!");
    }
  }

  render() {
    return (
      <form className="form">
        <img src={Logo} alt="" className="form-signin-pic" />

        <div className="form-signin">
          <div className="form-signin-p1">Please sign in</div>
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            onChange={this.updateUser.bind(this)}
            value={this.state.user}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            style={{ marginTop: "2px", marginBottom: "10px" }}
            onChange={this.updateUserPw.bind(this)}
            value={this.state.userpw}
          />
          <input type="checkbox" /> Remember me
        </div>

        <button
          type="button"
          className="btn btn-primary"
          style={{ width: 250 }}
          onClick={() => this.passwordValidation()}
        >
          Sign In
        </button>

        <div className="text-muted">© 2019 MDR Brands</div>
      </form>
    );
  }
}

export default App;
