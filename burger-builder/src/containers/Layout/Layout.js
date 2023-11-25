import React, { useState } from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const toggleSideDrawerHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }

  return (
    <Aux>
      <Toolbar
        clicked={toggleSideDrawerHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        close={toggleSideDrawerHandler}
        open={sideDrawerIsVisible}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null && state.auth.userId != null,
  };
};

export default connect(mapStateToProps)(Layout);
