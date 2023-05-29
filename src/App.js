import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card/listcard";
import axios from "axios";

function App() {
  const [coin,setCoin]=useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = (e) => setSearch(e.target.value);

  const addCart = (data) => {
    const itemIndex = cartItems.findIndex(item => item.id === data.id);

    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      const newItem = { id: data.id, current_price: data.current_price, name: data.name, image: data.image, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };


  const addqty = () => {
    const itemIndex = cartItems.findIndex(item => item.id === item.id);
    const updatedCartItems = [...cartItems];
    updatedCartItems[itemIndex].quantity += 1;
    setCartItems(updatedCartItems);
  }

  const minusqty = (item) => {
    if (item.quantity > 1) {
      const itemIndex = cartItems.findIndex(item => item.id === item.id);
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  }
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.current_price * item.quantity,
      0,
    );

  };

  const handleDeleteItem = itemId => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== itemId)
    );
  };

  const clr=()=>{

    setCartItems([])
  }
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => setCoin(response.data));
  }, []);

  return (
    <div className="App">
      <div className="header p-2y">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-2">
            <input
              className="form-control me-2"
              type="search"
              onChange={handleSearch}
              placeholder="Search.."
              aria-label="Search"
            ></input>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-2">
            <button
              type="button"
              className="btn btn-primary row justify-content-center"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              CART
            </button>
          </div>
        </div>

        <div className="p-5 content d-flex flex-wrap justify-content-center mt-2">
          {coin
            .filter((currency) =>
              currency.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((currency) => (
              <Card key={currency.id} currency={currency} addCart={addCart} />
            ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="row-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Items: {cartItems.length}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Total Price: ${calculateTotal()}
                  </h6>
                  <button className="btn btn-primary">Checkout</button>
                  <button className="btn btn-danger" onClick={clr}>Clear</button>
                </div>
              </div>
            </div>
            <div className="container mt-4">
              <div className="row">
                <div className="row-md-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <img src={item.image} alt={item.name} width="40" height="40" />
                        <p className="card-text">Price: ${item.current_price}</p>
                        <div className="input-group mb-3">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              minusqty(item)
                            }
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              addqty(item)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
