import React from "react";

export default function MercadoPago(props) {
  return (
    <div>
      <h1>HOLA</h1>
      <form action="/api/transaction/payment" method="POST">
        <script
          src="https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js"
          data-public-key={process.env.PUBLIC_TOKEN}
          data-transaction-amount={props.amount}
        ></script>
      </form>
    </div>
  );
}
