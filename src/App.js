import Home from "./components/home/home";
import Menu from "./components/menu/menu";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./components/store/store";
import Contact from "./components/contact/contact";
import Cart from "./components/cart/cart";
import Footer from "./components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/our-menu" element={<Menu />} />
        <Route path="/our-store" element={<Store />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
