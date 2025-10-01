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

  function addTocart(p) {
    const isProductAlreadyAdded = addedProducts.some(
      (ap) => ap.name === p.name
    );
    if (isProductAlreadyAdded) {
      return;
    }

    setAddedProducts([...addedProducts, { ...p, quantity: 1 }]);
  }
  console.log(addedProducts);

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
                {ap.name} {ap.price.toFixed(2)} € {""} quantity:{``}
                {ap.quantity}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default App;
