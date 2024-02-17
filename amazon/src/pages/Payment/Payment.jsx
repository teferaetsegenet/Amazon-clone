import React, {useContext, useState} from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import classes from "../Payment/Payment.module.css"
import { DataContext } from '../../Component/DataProvider/DataProvider';
import ProductCard from '../../Component/Products/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat';

function Payment() {

  const [{ user,basket }] = useContext(DataContext);
console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
}, 0);


const total = basket.reduce((amount, item) => {
  return item.price * item.amount + amount
}, 0);

const [cardError, setCardError]= useState(null)
const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e)=>{
    console.log(e);
    e?.error?.message? setCardError( e?.error?.message): setCardError("")
  };

  return (
    <LayOut> 
      {/* header */}
      <div className={classes.payment__header}>
        checkout({totalItem}) items
      </div>

        {/* payment method */}
        <section className={classes.Payment}>

          {/* address */}

      <div className={classes.flex}>
        <h3>Deliver Address</h3>
      <div >
        <div>{user?.email}</div>
        <div>1123 React Lane</div>
        <div>Chicaago, IL</div>
      </div>
      </div>
          <hr />

          {/* product */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <dir>
              {
                basket?.map((item)=><ProductCard product={item} flex={true}/>)
              }
            </dir>
          </div>
          <hr />

          {/* card form */}
          <div className={classes.flex}>
              <h3>Payment methods</h3>
              <div className={classes.payment__card__container}>
          <div className={classes.payment__ditails}>
            <form action="">
              {cardError && ( 
              <small style={{ color: "red" }}>{cardError}</small>
              )}
              {/* cardElement */}
                  <CardElement onChange={handleChange} />

                  {/* price */}
                  <div className={classes.payment__price}>
                    <div>
                      <span style={{display:"flex", gap:"10px"}}>
                        Total Order |<CurrencyFormat amount={total}/> 
                      </span>
                    </div>
                <button style={{backgroundColor: "orange"}}>
                  Pay Now
                </button>

                  </div>
            </form>
              </div>
          </div>
          </div>
        </section>
    </LayOut>
  )
}

export default Payment