import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Gallery from "../components/gallery/Gallery";
import FullPhoto from "../components/fullPhoto/FullPhoto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/:id" element={<FullPhoto />} />
      </Routes>
    </Router>
  );
}

export default App;
