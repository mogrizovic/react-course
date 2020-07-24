import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    sideDrawerIsVisible: false
  }

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { sideDrawerIsVisible: !prevState.sideDrawerIsVisible };
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar
          clicked={this.toggleSideDrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          close={this.toggleSideDrawerHandler}
          open={this.state.sideDrawerIsVisible}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null && state.auth.userId != null,
  };
};

export default connect(mapStateToProps)(Layout);
