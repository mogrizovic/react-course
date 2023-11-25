import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

const BurgerBuilder = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchasable = (newIngredients) => {
    const sum = Object.keys(newIngredients)
      .map((objKey) => newIngredients[objKey])
      .reduce((aggr, el) => {
        return aggr + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setIsOrdering(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const closeModalHandler = () => {
    setIsOrdering(false);
  };

  const purchaseContinueHandler = () => {
    props.onPurchaseInit();
    props.history.push("/checkout");
  };

    const disabledInfo = {
      ...props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let spinner = <Spinner />;
    let orderSummary = null;
    let burger = props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      spinner
    );

    if (props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            price={props.price}
            purchasable={updatePurchasable(props.ings)}
            ordering={purchaseHandler}
            isAuth={props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <Aux>
          <OrderSummary
            ingredients={props.ings}
            closeModal={closeModalHandler}
            continuePurchase={purchaseContinueHandler}
            total={props.price}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={isOrdering} modalClosed={closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseBurgerInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
