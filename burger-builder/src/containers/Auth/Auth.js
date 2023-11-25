import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  const [formControls, setFormControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    }
  });

  const [isSignup, setIsSignup] = useState(false);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...formControls,
      [controlName]: {
        ...formControls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          formControls[controlName].validation
        ),
        touched: true,
      },
    };
    setFormControls(updatedControls);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules && rules.required) {
      isValid = isValid && value.trim() !== "";
    }

    if (rules && rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules && rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }

    if (rules && rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = isValid && pattern.test(value);
    }

    return isValid;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const isSignIn = !isSignup;
    props.onAuth(
      formControls.email.value,
      formControls.password.value,
      isSignIn
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const elementsArray = [];
  for (let key in formControls) {
    elementsArray.push({
      id: key,
      config: formControls[key],
    });
  }

  let form = (
    <form onSubmit={onSubmitHandler}>
      {elementsArray.map((el) => {
        return (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={(event) => inputChangedHandler(event, el.id)}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
          />
        );
      })}

      <Button btnType="Success">SUBMIT</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errMessage = null;
  if (props.error) {
    errMessage = <p>{props.error}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errMessage}
      {form}
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignIn) =>
      dispatch(actions.auth(email, pass, isSignIn)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
