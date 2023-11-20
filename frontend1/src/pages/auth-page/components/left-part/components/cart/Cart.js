import React,{useState} from "react";
import PhonePrice from "../../../../../../layout/phone-price/PhonePrice";
import "./Cart.css";
import { ethers} from "ethers";
import checkTier from "../../../../../../functions/checkTier";
import checkPrice from "../../../../../../functions/checkPrice";
import checkTotalPrice from "../../../../../../functions/checkTotalPrice";
import { address_A,abi_A } from "../../../../../../abi/ContractA";
import { address_B,abi_B } from "../../../../../../abi/ContractB";
import { UserContext } from "../../../../../../Hook";


const Cart = ({ cartArray, currentState }) => {
  const {flag1,setflag1}=React.useContext(UserContext);
  const [coupon, setcoupon] = useState("");
  const [flag, setFlag] = useState(true);
  const[textCoupon,setTextCoupon]=useState("Add Coupon")
  const [coupon1, setcoupon1] = useState("0");
  const [coupon2, setcoupon2] = useState(checkTotalPrice(cartArray));
  const [color,setColor]=useState("white")
  const [flag2,setFlag2]=useState(false);



  async function ClaimCoupon(coupon){
    if(checkTotalPrice(cartArray)<=5)
    {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
    });
    const provider = new ethers.BrowserProvider(window.ethereum);
      //   console.log(provider);
      setflag1("0")
      await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(address_A, abi_A, signer);
            console.log(provider)
            console.log(signer)
            if(coupounBronze.includes(coupon.toString()))
            {
            try{
              setflag1("1")
              setcoupon1("5")
              setcoupon2("0")
              setFlag(true)
              setTextCoupon("Coupon added")
              setColor("green")
            const transaction = await contract.claimWithCoupon(coupon)
              transaction.wait().then((res) => {
                console.log(res)
              });
              console.log("hello")
              setflag1("1")
              setcoupon1("5")
              setcoupon2("0")
              
            console.log(flag1)

             
            }catch(e){console.log(e)}
          }
          else
          {
            setcoupon1("0")
              setcoupon2(checkTotalPrice(cartArray))
              setTextCoupon("Add coupon")
              setFlag(false)
              setFlag2(true)
              setColor("red")

          }
          }else
          {
            setcoupon1("0")
            setcoupon2(checkTotalPrice(cartArray))
            setTextCoupon("Add coupon")
            setFlag(false)
            setFlag2(true)
            setColor("red")
          }

          // if(flag){
            
          //   // setTextCoupon("Coupon added")
          //   // setColor("green");
          // }
          // else
          // {
            
          //   // setTextCoupon("Add coupon")
          //   setColor("rgba(100, 115, 165, 1)")
          // }  
          
        
  }

 
  console.log(cartArray);
  const coupounBronze =["deal100","deal101","deal102","deal103","deal104"]

  return (
    <div className="cartWrapper">
      <h4>Your cart</h4>
      <p>Get your exclusive web3 phone number now</p>

      <div className="cartWrapperColumn">
        {cartArray.map((num, i) => (
          <PhonePrice
            number={`${num}`}
            tier={checkTier(num.toString())}
            price={`${checkPrice(num.toString())}`}
            key={i}
          />
        ))}
      </div>

      <div className="cartWrapperRow">
        <div className="cartWrapperTotalCount " style={{ border: "0px" }}>
          <div className="cartWrapperSubtotal">Subtotal</div>
          <div className="cartWrapperPrice">{`BUSD $${checkTotalPrice(
            cartArray
          )}`}</div>
        </div>
        <div className="cartWrapperTotalCount " style={{ margin: "-6% 0 0 0" }}>
          <div className="cartWrapperSubtotal">Referral reward</div>
          <div className="cartWrapperPrice" id="cart1">{`BUSD $${coupon1}`}</div>
        </div>
      </div>

      <div className="cartWrapperTotalCount">
        <div className="cartWrapperTotal">Total</div>
        <div className="cartWrapperPrice" id="cart2">{`BUSD $${coupon2}`}</div>
      </div>

      

      {(currentState === "claimOrder" || currentState === "showCart") && (
        <div className="cartWrapperCoupon">
          Coupon code
          <form className="cartWrapperCouponForm" onSubmit={async(e)=>{e.preventDefault();await ClaimCoupon(coupon)}}>
            <input placeholder="Enter coupon code" value={coupon} onChange={(e)=>{setcoupon(e.target.value)}} />
            {flag2 && !flag && <p style={{color:`${color}`}}>invalid coupon</p>}
            <button
              className="enters"
              style={{ marginTop: "-5%", background: "rgba(27, 31, 57, 1)", color:`${color}`}}
            >
              {textCoupon}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
