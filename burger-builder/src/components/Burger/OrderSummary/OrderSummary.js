import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
            {this.props.ingredients[igKey]}
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
          <strong>Total: {this.props.total}$</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.closeModal}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
