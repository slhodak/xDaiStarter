import { BigNumber, utils } from 'ethers';
const { formatEther } = utils;

export default (props: any) => {
  const { symbol, tokenPriceInWei, amount, setAmount, handleBuy, setBuying } = props;
  return (
    // Clicking on the background closes the modal
    <div onClick={() => setBuying(false)} className="buy_modal">
      {/* Clicks inside the modal will not reach the background's click event handler */}
      <div onClick={(e) => e.stopPropagation()} className="buy_interface">
        <div className="Xit" onClick={() => setBuying(false)}>
          <svg className="xit_svg" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <g>
              <line strokeWidth="4" strokeLinecap="round" id="svg_1" y2="28" x2="28" y1="2" x1="2" stroke="#FFF" fill="none"/>
              <line strokeWidth="4" strokeLinecap="round" id="svg_2" y2="2" x2="28" y1="28" x1="2" stroke="#FFF" fill="none"/>
            </g>
          </svg>
        </div>
        <p className="medium_title">Buy {symbol}</p>
        <div className="amount_input">
        <div className="amount_buttons">
            <button className="amount_button" onClick={() => setAmount(amount.add(BigNumber.from("1")))}>
              <svg className="arrow_top" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <line strokeLinecap="round" id="svg_3" y2="5" x2="10" y1="8" x1="0" strokeWidth="2" stroke="#000" fill="none"/>
                  <line strokeLinecap="round" id="svg_4" y2="5" x2="10" y1="8" x1="18" strokeWidth="2" stroke="#000" fill="none"/>
                </g>
              </svg>
            </button>
            <button className="amount_button" onClick={() => setAmount(amount.sub(BigNumber.from("1")))}>
              <svg className="arrow_bottom" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <line strokeLinecap="round" id="svg_3" y2="5" x2="10" y1="0" x1="0" strokeWidth="2" stroke="#000" fill="none"/>
                  <line strokeLinecap="round" id="svg_4" y2="5" x2="10" y1="0" x1="18" strokeWidth="2" stroke="#000" fill="none"/>
                </g>
              </svg>
            </button>
          </div>
          <input className="amount_number" onChange={(e) => setAmount(BigNumber.from(e.target.value.toString()))} type="number" value={amount}></input>
          <p className="buy_descriptor">{symbol}</p>
        </div>
        <p className="buy_descriptor cost">Cost: {formatEther(amount.mul(tokenPriceInWei))} XDAI</p>
        <button className="btn buy_button" onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
}
