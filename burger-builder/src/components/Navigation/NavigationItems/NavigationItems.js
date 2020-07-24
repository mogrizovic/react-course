import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact clicked={props.close}>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem clicked={props.close} link="/orders">
          Orders
        </NavigationItem>
      ) : null}
      {props.isAuthenticated ? (
        <NavigationItem clicked={props.close} link="/logout">
          Logout
        </NavigationItem>
      ) : (
        <NavigationItem clicked={props.close} link="/auth">
          Login
        </NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
