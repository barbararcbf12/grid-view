import React from "react";
import { Grid } from "./components/Grid/Grid";

function App() {
  return (
    <div className="space-y-3 h-screen">
      <main className="p-3 flex justify-center">
        <div className="rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-lg w-full flex justify-center">
          <Grid />
        </div>
      </main>
    </div>
  );
}

export default App;
