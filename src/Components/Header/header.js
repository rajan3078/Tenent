import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/listcard";
const Header = () => {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => setCoin(response.data));
  }, []);

  return (
    <div className="header p-2y">
      <h2>Crypto</h2>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-2">
          <input
            className="form-control me-2"
            type="search"
            onChange={handleSearch}
            placeholder="Search"
            aria-label="Search"
          ></input>
        </div>
      </div>

      <div className="p-5 content d-flex flex-wrap justify-content-center mt-2">
        {coin
          .filter((currency) =>
            currency.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((currency) => (
            <Card {...currency} />
          ))}
      </div>
    </div>
  );
};

export default Header;
