import React, { Component } from "react";

export class MercadoPago2 extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      console.log(window.Mercadopago);
      window.Mercadopago.setPublishableKey(process.env.REACT_APP_PUBLIC_TOKEN);
    });
  }

  render() {
    return <div></div>;
  }
}

export default MercadoPago2;
