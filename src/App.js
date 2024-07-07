import { Route, Routes } from "react-router-dom";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import Header from "./Components/utils/Header";
import Footer from "./Components/utils/Footer";
import './App.css'

import { useSelector } from "react-redux";
import Loader from "./Components/utils/Loader";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail";
import OrderPage from "./Components/OrderPage";


function App() {
  const loading = useSelector((state) => state.loader.loader);
  console.log(loading)
  return (
    <>
      <Header />
      {loading && <Loader />}
        <Routes>

          <Route path="/" element={<Categories />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/cart" element={<Cart />}/>
          <Route path="/product-detail/:id" element={<ProductDetail />}/>
          <Route path="/orders" element={<OrderPage />} />
        </Routes>

      {/* <Footer /> */}
    </>

  );
}

export default App;
