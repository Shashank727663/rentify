import LoginPage from "./Components/Login";
import RegisterPage from "./Components/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./Components/HomePage";
import { useState, useEffect } from "react";
import sellerFlow from "./Components/SellerComponent";
import BuyerFlow from "./Components/buyerspage";
import AddListingForm from "./Components/AddListing";
import UpdateListingForm from "./Components/UpdateListingForm";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
  const [user, setUser] = useState({});
  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const onClickLogout = () => {
    // delete local storage key called users
    localStorage.removeItem("user");
    // redirect to login page
    window.location.href = "/login";
  };

  //useEffect to check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user) || {});

    if (user) {
      console.log(user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="App">
          <header>
            {isLoggedIn
              ? <nav className="flex justify-between items-center bg-blue-500 p-4">
                  <h1 className="text-white font-bold text-xl">Rentify</h1>
                  <div className="flex items-center">
                    <Link to="/home" className="text-white mr-4">
                      Home
                    </Link>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                </nav>
              : <nav className="flex justify-between items-center bg-blue-500 p-4">
                  <h1 className="text-white font-bold text-xl">Rentify</h1>
                  <div>
                    <Link to="/login" className="text-white">
                      Login
                    </Link>
                    <span className="text-white mx-4">|</span>
                    <Link to="/register" className="text-white mr-4">
                      New User? Sign Up
                    </Link>
                  </div>
                </nav>}
          </header>

          <main>
            <Switch>
              <Route exact path="/login">
                {isLoggedIn
                  ? <Redirect to="/home" />
                  : <LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
              </Route>

              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/home">
                <Home role={user.role} />
              </Route>
              <Route exact path="/seller-flow" component={sellerFlow} />
              <Route exact path="/buyer-flow" component={BuyerFlow} />
              <Route exact path = "/add-listing" component = {AddListingForm}></Route>
              <Route exact path="/update-listing/:listingId" component={UpdateListingForm}></Route>
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
