import React from "react";
import { TipsProvider } from "./context/TipsContext";
import TipsList from "./components/TipsList";
import AddTipForm from "./components/AddTipForm";

function App() {
  return (
    <TipsProvider>
      <div className="min-h-screen bg-gray-900 text-white p-2">
        <TipsList />
        <AddTipForm />
      </div>
    </TipsProvider>
  );
}

export default App;
