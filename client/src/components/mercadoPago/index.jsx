import React, { Component } from "react";
import MPSrc from "./../../utilities/MPJS-WebTokenize";

export class MercadoPago extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const form = document.getElementById("merc-pago-form");
    const script = document.createElement("script");
    console.log(MPSrc);
    script.src = { MPSrc };
    script.async = true;
    script.setAttribute("data-public-key", process.env.REACT_APP_PUBLIC_TOKEN);
    script.setAttribute("data-transaction-amount", "100");
    form.appendChild(script);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    console.log(event);
  }

  render() {
    return (
      <div>
        <form
          // onSubmit={this.onSubmit}
          id="merc-pago-form"
          action="http://localhost:5000/api/transaction/payment"
          method="POST"
        ></form>
      </div>
    );
  }
}

export default MercadoPago;
