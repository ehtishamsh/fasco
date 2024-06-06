import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import Product from "./pages/Product";
import ShoppingCart from "./pages/ShoppingCart";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loader from "./components/Loader";
import Checkout from "./pages/Checkout";
import FilterPage from "./pages/FilterPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import WishlistPage from "./pages/WishlistPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Products from "./pages/admin/Products";
import NewProduct from "./pages/admin/new/NewProduct";

function App() {
  const checktoken = localStorage.getItem("token");
  const checkuser = JSON.parse(localStorage.getItem("user") || "{}");
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <Router>
            <Routes>
              <Route element={<Layout />} path="/">
                <Route element={<Homepage />} path="/" />
                <Route element={<Product />} path="/:category/:brand?/:title" />
                <Route element={<FilterPage />} path="/filter/:category" />
                <Route element={<Homepage />} />
                <Route element={<ShoppingCart />} path="/cart" />
                <Route element={<WishlistPage />} path="/wishlist" />
                {checktoken && (
                  <Route element={<Checkout />} path="/checkout" />
                )}
                {!checktoken && !checkuser && (
                  <>
                    <Route element={<SigninPage />} path="/signin" />
                    <Route element={<SignupPage />} path="/signup" />
                  </>
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
              {checktoken && checkuser.role === "admin" && (
                <Route element={<AdminLayout />} path="/">
                  <Route element={<AdminDashboard />} path="/admin" />
                  <Route element={<Products />} path="/admin/products" />
                  <Route element={<NewProduct />} path="/admin/products/new" />
                </Route>
              )}
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
