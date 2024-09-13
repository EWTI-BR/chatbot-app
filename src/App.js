import React, { useState, useEffect } from "react";
import Chatbot from './Chatbot';
import "./App.css";

const App = () => {
  const [PocOwner, setPocOwner] = useState("");

  useEffect(() => {
    const owner = window.location.search.replace(/[^a-zA-Z]/g, ""); // Get the 'owner' parameter from the query string

    // If there's no 'owner' parameter, set a default value
    setPocOwner(owner ? owner.replace(/[^a-zA-Z]/g, "") : "ewti");
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(./assets/${PocOwner}.png)`, backgroundSize: "cover" }}>
      <Chatbot dataFolder={PocOwner} />
    </div>
  );
};

export default App;
