import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import HomeScreenFilter from "./screens/HomeScreenFilter";
import SingleShop from "./screens/SingleShop";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route 
          path="/search/full/name/:name/price_min/:price_min/price_max/:price_max/brand/:brand/shop/:shop/color/:color/gender/:gender/order_by/:order_by" 
          component={HomeScreenFilter} 
          exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pagenumber"
          component={HomeScreen}
          exact
        />
        <Route 
          path="/search/full/name/:name/price_min/:price_min/price_max/:price_max/brand/:brand/shop/:shop/color/:color/gender/:gender/order_by/:order_by/page/:pagenumber" 
          component={HomeScreenFilter} 
          exact />
        <Route path="/products/:id" component={SingleProduct} exact/>
        <Route path="/products/shops/:id" component={SingleShop} exact/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
