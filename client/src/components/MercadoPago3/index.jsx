import React, { Component } from "react";
import { payment, processPayment } from "./../../services/mercado-pago";

export class MercadoPago3 extends Component {
  componentDidMount() {}

  async checkout() {
    const response = await payment();
    console.log(response);
    const form = document.getElementById("merc-pago-form");
    const script = document.createElement("script");
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.async = true;
    script.setAttribute("data-preference-id", response.body.id);
    form.appendChild(script);
    script.addEventListener("load", () => {
      global.init_point = response.body.sandbox_init_point;
    });
  }

  submitForm(event) {
    event.preventDefault();
    console.log("form submitted");
    console.log(event.target);

    // const data = new FormData(event.target);
    // const response = await processPayment(data);
  }

  render() {
    return (
      <div>
        <button onClick={this.checkout}>checkout</button>
        <form
          // action="api/transaction/process-payment"
          // method="POST"
          onSubmit={this.submitForm}
          id="merc-pago-form"
        ></form>
      </div>
    );
  }
}

export default MercadoPago3;
