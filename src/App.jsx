// importo useState

import { useState } from "react";

function App() {
  // array di oggetti fornito dalla traccia
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  //  creo stato locale addedProducts ( inizialmente array vuoto), devo importare useState
  const [addedProducts, setAddedProducts] = useState([]);

  //   funione updateProductQuantity
  const updateProductQuantity = (name, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }
    setAddedProducts((curr) =>
      curr.map((p) => (p.name === name ? { ...p, quantity } : p))
    );
  };

  function addTocart(p) {
    // soluzione milestone 2
    // const isProductAlreadyAdded = addedProducts.some(
    //   (ap) => ap.name === p.name
    // );
    //  if (isProductAlreadyAdded) {
    //   return;
    // }

    // soluzione milestone 3

    const addedProduct = addedProducts.find((ap) => ap.name === p.name);
    if (addedProduct) {
      updateProductQuantity(addedProduct.name, addedProduct.quantity + 1);
      return;
    }

    setAddedProducts([...addedProducts, { ...p, quantity: 1 }]);
  }
  function removeFromCart(product) {
    return setAddedProducts((curr) =>
      curr.filter((ap) => ap.name !== product.name)
    );
  }

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
            <button onClick={() => addTocart(p)}>Aggiungi al Carrello</button>
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
                      updateProductQuantity(ap.name, parseInt(e.target.value))
                    }
                  />{" "}
                  {""}
                  <span>
                    x{""} {ap.name} {ap.price.toFixed(2)} € {""}{" "}
                  </span>
                </p>

                <button onClick={() => removeFromCart(ap)}>
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
