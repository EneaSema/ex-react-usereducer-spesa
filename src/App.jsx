import { useState } from "react";

export default function App() {
  // milestone 1
  // array fornito
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  // milestone 2

  const [addedProducts, setAddedProducts] = useState([]);

  console.log("addedProduct inizio", addedProducts);

  const updateProductQuantity = (name, quantity) => {
    setAddedProducts((curr) =>
      curr.map((p) => (p.name === name ? { ...p, quantity } : p))
    );
  };

  const addToCart = (p) => {
    // soluzione milestone 2
    // const isProdcutAlreadyAdded = addedProducts.some(
    //   (pf) => pf.name === p.name
    // );
    // if (isProdcutAlreadyAdded) {
    //   updateProductQuantity(p);
    // }
    const isProdcutAdded = addedProducts.find((pf) => pf.name === p.name);
    if (isProdcutAdded) {
      updateProductQuantity(isProdcutAdded.name, isProdcutAdded.quantity + 1);
      return;
    }
    setAddedProducts([...addedProducts, { ...p, quantity: 1 }]);
  };

  console.log("addedProduct aggiornato", addedProducts);

  const removeToCart = (ap) => {
    setAddedProducts((curr) => curr.filter((p) => p.name !== ap.name));
  };

  const totalToPay = addedProducts.reduce((acc, ap) => {
    return acc + ap.price * ap.quantity;
  }, 0);

  return (
    <>
      <h1>EX - Carrello della spesa</h1>

      <h2>Prodotti tra cui scegliere</h2>
      <ul>
        {products.map((p, i) => {
          return (
            <li key={i}>
              <span>
                {p.name} ({p.price.toFixed(2)} )€{" "}
                <button onClick={() => addToCart(p)}>
                  Aggiungi al carrello
                </button>
              </span>
            </li>
          );
        })}
      </ul>

      {addedProducts.length > 0 && (
        <>
          <h2>Prodotti nel carrello</h2>
          <ul>
            {addedProducts.map((ap, i) => {
              return (
                <li key={i}>
                  <span>
                    {ap.name} {ap.price.toFixed(2)} € {ap.quantity} {``}
                    <button onClick={() => removeToCart(ap)}>
                      Rimuovi dal carrello
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
          <p>Costo del carrello: {totalToPay.toFixed(2)} €</p>
        </>
      )}
    </>
  );
}
