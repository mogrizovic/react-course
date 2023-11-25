import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {props.ingredients[igKey]}
        </li>
      );
    }
  );
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout.</p>
      <p>
        <strong>Total: {props.total}$</strong>
      </p>
      <Button btnType="Danger" clicked={props.closeModal}>
        CANCEL
        </Button>
      <Button btnType="Success" clicked={props.continuePurchase}>
        CONTINUE
        </Button>
    </Aux>
  );
}

export default OrderSummary;
