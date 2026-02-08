import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Cart from "./components/cart/cart.jsx";
import Footer from "./components/footer/footer.jsx";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import CartErrorBoundary from "./components/ui/CartErrorBoundary.jsx";
import ProductErrorBoundary from "./components/ui/ProductErrorBoundary.jsx";

// Lazy load components for code splitting
const Home = React.lazy(() => import("./components/home/home.jsx"));
const Menu = React.lazy(() => import("./components/menu/menu.jsx"));
const Store = React.lazy(() => import("./components/store/store.jsx"));
const Contact = React.lazy(() => import("./components/contact/contact.jsx"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route 
              path="/our-menu" 
              element={
                <ProductErrorBoundary>
                  <Menu />
                </ProductErrorBoundary>
              } 
            />
            <Route 
              path="/our-store" 
              element={
                <ProductErrorBoundary>
                  <Store />
                </ProductErrorBoundary>
              } 
            />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
        <CartErrorBoundary>
          <Cart />
        </CartErrorBoundary>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
