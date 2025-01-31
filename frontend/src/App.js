import React, { useState } from "react";
import WeaponCard from "./components/WeaponCard";
import Banner from "./components/Banner";
import Navbar from "./components/NavGun";
import Header from "./components/Header";
import Filter from "./components/WeaponFilter";
import Info from "./components/InfoArma";
import Form from "./components/FormInsert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [category, setCategory] = useState("Pistolas"); // Categoría inicial

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Navbar setCategory={setCategory} />
                <WeaponCard category={category} />
              </>
            }
          />
          <Route
            path="/comparador"
            element={<Filter initialCategory={category} />}
          />
          <Route
            path="/Armas"
            element={
              <>
                <Info />
                <Navbar setCategory={setCategory} />
                <WeaponCard category={category} />
              </>
            }
          />
          <Route path="/Form" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
