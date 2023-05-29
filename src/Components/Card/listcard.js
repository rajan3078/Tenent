const Card = ({currency,addCart}) => {
  return (
    <div className="p-2">
      <div className="card pt-2" style={{ width: 300 }}>
        <div className="justify-content-center">
          <img src={currency.image} alt={currency.name} width="80" height="80" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{currency.name}</h5>
          <p className="card-text">Price:$ {currency.current_price}</p>
          <p>Rank:$ {currency.market_cap_rank}</p>
          <p>Market Cap:$ {currency.market_cap}</p>
          <button type="button" className="btn btn-primary" onClick={()=>{addCart(currency)}} >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
