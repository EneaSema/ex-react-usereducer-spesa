export default function App() {
  // milestone 1
  // array fornito
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  return (
    <>
      <h1>EX - Carrello della spesa</h1>
      <ul>
        {products.map((p, i) => {
          return (
            <li key={i}>
              <span>
                {p.name} {p.price.toFixed(2)} €
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
