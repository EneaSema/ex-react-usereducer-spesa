// importo useState

import { useReducer } from "react";

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case `ADD_ITEM`:
      const addedProduct = addedProducts.find(
        (ap) => ap.name === action.payload.name
      );

      // soluzione milestone 2
      // const isProductAlreadyAdded = addedProducts.some(
      //   (ap) => ap.name === p.name
      // );
      //  if (isProductAlreadyAdded) {
      //   return;
      // }

      // soluzione milestone 3

      if (addedProduct) {
        action.payload.quantity = addedProduct.quantity + 1;
      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }

    case `UPDATE_QUANTITY`:
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map((p) =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      );

    case `REMOVE_ITEM`:
      return addedProducts.filter((ap) => ap.name !== action.payload);

    default:
      return addedProducts;
  }
}

function App() {
  // array di oggetti fornito dalla traccia
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  //  creo stato locale addedProducts ( inizialmente array vuoto), devo importare useState
  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  //   funione updateProductQuantity

  const totalToPay = addedProducts.reduce(
    (acc, ap) => acc + ap.price * ap.quantity,
    0
  );

  return (
    <>
      <h1>EX - Carrello della spesa</h1>
      <h2>Lista dei prodotti</h2>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            {p.name} {p.price.toFixed(2)} €{" "}
            <button
              onClick={() => dispatchCart({ action: `ADD_ITEM`, payload: p })}
            >
              Aggiungi al Carrello
            </button>
          </li>
        ))}
      </ul>

      {addedProducts.length > 0 && (
        <>
          <h2>Lista prdotti nel Carrello</h2>
          <ul>
            {addedProducts.map((ap, i) => (
              <li>
                <p>
                  <input
                    type="number"
                    value={ap.quantity}
                    onChange={(e) =>
                      dispatchCart({
                        type: `UPDATE_QUANTITY`,
                        payload: {
                          name: ap.name,
                          quantity: parseInt(e.target.value),
                        },
                      })
                    }
                  />{" "}
                  {""}
                  <span>
                    x{""} {ap.name} {ap.price.toFixed(2)} € {""}{" "}
                  </span>
                </p>

                <button
                  onClick={() =>
                    dispatchCart({ type: `REMOVE_ITEM`, payload: ap.name })
                  }
                >
                  Rimuovi dal Carrello
                </button>
              </li>
            ))}
          </ul>
          <span>Totale da pagare:{totalToPay.toFixed(2)}€</span>
        </>
      )}
    </>
  );
}

export default App;
