import React from "react";
import style from "./App.module.scss";
import { Select } from "./Select";

function App() {
  return (
    <div className="App">
      <main className={style.main}>
        <Select />
      </main>
    </div>
  );
}

export default App;
