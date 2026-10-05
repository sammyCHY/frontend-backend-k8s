import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setMessage(`${data.message}: ${data.database}`);
      })
      .catch(() => {
        setMessage("Unable to connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>Three-Tier Application</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;