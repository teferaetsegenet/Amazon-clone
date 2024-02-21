// import React, {useContext, useState} from 'react'
// import LayOut from '../../Component/LayOut/LayOut'
// import classes from "../Payment/Payment.module.css"
// import { DataContext } from '../../Component/DataProvider/DataProvider';
// import ProductCard from '../../Component/Products/ProductCard';
// import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat';
// import { axiosInstance} from "../../Api/axios";
// import { db } from '../../Utility/firebase';
// import { useNavigate } from 'react-router-dom';
// import { ClipLoader } from 'react-spinners';
// import { Type } from '../../Utility/action.type';

// function Payment() {

//   const [{ user,basket },dispatch] = useContext(DataContext);
// console.log(user);

//   const totalItem = basket?.reduce((amount, item) => {
//     return item.amount + amount;
// }, 0);


// const total = basket.reduce((amount, item) => {
//   return item.price * item.amount + amount
// }, 0);

// const [cardError, setCardError]= useState(null)
// const [processing, setProcessing] = useState(false)

// const stripe = useStripe();
// const elements = useElements();
// const navigate = useNavigate()


// const handleChange = (e)=>{
//     console.log(e);
//     e?.error?.message? setCardError( e?.error?.message): setCardError("")
//   };


//   const handlePayment = async (e) =>{
//     e.preventDefalt();

//     try{
//       setProcessing(true)
//       // 1...backend || function----->contact to the client secret
//      const response = await axiosInstance({
//       method: "POST",
//       url: `/payment/create?total = ${total * 100}`
//     });

//     console.log(response.data);
//     const clientSecret = response.data?.clientSecret;
//     // console.log(clientSecret);

//     // 2....client side (react side confirmation)
// const {paymentIntent} = await stripe.confirmCardPayment(
//   clientSecret, 

//   {payment_method:{
//     card : elements.getElement(CardElement), 
//   },
// });

// console.log(paymentIntent);


// // 3....after the confirmation ----> order firestore database save, clear basket
// await db
// .collection("users")
// .doc(user.uid)
// .collection("orders")
// .doc(paymentIntent.id)

// .set({
//   basket:basket,
//   amount:paymentIntent.amount,
//   created:paymentIntent.created,
// })



// dispatch({ type: Type.EMPTY_BASKER });

// setProcessing(false)
// navigate("/orders", {state: {msg:"you have placed new Order"}});


// }catch (error) {
//   console.log(error);
//   setProcessing(false)
// }

// };

//   return (
//     <LayOut> 
//       {/* header */}
//       <div className={classes.payment__header}>
//         checkout({totalItem}) items
//       </div>

//         {/* payment method */}
//         <section className={classes.Payment}>

//           {/* address */}

//       <div className={classes.flex}>
//         <h3>Deliver Address</h3>
//       <div >
//         <div>{user?.email}</div>
//         <div>1123 React Lane</div>
//         <div>Chicaago, IL</div>
//       </div>
//       </div>
//           <hr />

//           {/* product */}
//           <div className={classes.flex}>
//             <h3>Review items and delivery</h3>
//             <dir>
//               {
//                 basket?.map((item)=><ProductCard product={item} flex={true}/>)
//               }
//             </dir>
//           </div>
//           <hr />

//           {/* card form */}
//           <div className={classes.flex}>
//               <h3>Payment methods</h3>
//               <div className={classes.payment__card__container}>
//           <div className={classes.payment__ditails}>
//             <form onSubmit={handlePayment}>
//               {cardError && ( 
//               <small style={{ color: "red" }}>{cardError}</small>
//               )}
//               {/* cardElement */}
//                   <CardElement onChange={handleChange} />

//                   {/* price */}
//                   <div className={classes.payment__price}>
//                     <div>
//                       <span style={{display:"flex", gap:"10px"}}>
//                         <p>Total Order |</p> <CurrencyFormat amount={total} /> 
//                       </span>
//                     </div>

//                 <button type="submit" className={classes.submitpaynow}>
//                 {
//                   processing?(
//                 <div className={classes.loading}>
//                   <ClipLoader color="gray" size={12}/>
//                   <p>Please Wait...</p>
//                 </div>
//                   ):"Pay Now"
//                 }
              
//                 {/* Pay Now */}
            
              
              
//               </button>

//                   </div>
//             </form>
//               </div>
//           </div>
//           </div>
//         </section>
//     </LayOut>
//   )
// }

// export default Payment 


// Gezu


import React,{useContext, useState} from 'react'
import Layout from "../../Component/LayOut/LayOut"
import classes from './Payment.module.css'
import{DataContext} from "../../Component/DataProvider/DataProvider"
import ProductCard from "../../Component/Products/ProductCard"
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import {axiosInstance} from '../../Api/axios'

// import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import {db} from '../../Utility/firebase'
import {useNavigate} from 'react-router-dom'
import {Type} from '../../Utility/action.type'

function Payment() {
  const [{user,basket},dispatch]=useContext(DataContext);

  const [cardError,setCardError]=useState(null)
  // console.log(user)
  const [processing,setProcessing]= useState(false)

  const totalItem=basket?.reduce((amount,item)=>{
      return item.amount + amount
  },0)

  const total=basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

  const stripe = useStripe();
  const elements = useElements();
  const navigate= useNavigate()
   
 const handleChange = (e)=>{
    e?.error?.message? setCardError(e?.error?.message): setCardError("")   
 }

 const handlePayment = async (e) => {
  e.preventDefault();

  try {
    setProcessing(true);

    // Ensure user is defined before accessing user.uid
    if (!user) {
      throw new Error("User is not authenticated");
    }

    // Ensure stripe is properly initialized
    if (!stripe) {
      throw new Error("Stripe is not initialized");
    }

    // Backend request to get client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`,
    });

    const clientSecret = response.data?.clientSecret;
    console.log(response.data)

    // Confirm card payment with stripe
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // Save order data to Firestore
    await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });
    //empty the basket
  dispatch({type: Type.EMPTY_BASKET});

    setProcessing(false);
    navigate("/orders", { state: { msg: "You have placed a new order" } });
  } catch (error) {
    console.error(error);
    setProcessing(false);
  }
};


  return (
    <Layout>
      {/* header  */}
    <div className={classes.payment__header}>Checkout {totalItem} items</div>

{/* payment method */}

<section className={classes.payment}>

{/* address */}

<div className={classes.flex}>
  <h3>Delivery Address</h3>
  <div>
  <div>{user?.email}</div>
  <div>123 React Lane</div>
  <div>Chicago, IL</div>
  </div>
  
</div>
<hr />

{/* product */}
<div className={classes.flex}>
  <h3>Review items and delivery</h3>
  <div>
    {
      basket?.map((item)=><ProductCard product={item} flex={true}/>)
    }
  </div>
</div>
<hr />
{/* card form */}
<div className={classes.flex}>
  <h3>Payment methods</h3>
  <div className={classes.payment__card__container}>
<div className={classes.payment__details}>
  <form onSubmit={handlePayment} >
    {/* error */}
    {
      cardError && <small style={{color:"red"}}>{cardError}</small>
    }
    {/* card element */}
  <CardElement onChange={handleChange}/>

  {/* price */}
  <div className={classes.payment__price}>
    <div>
      <span style={{display:"flex", gap:"10px"}}>

        <p>Total Order |</p> <CurrencyFormat amount={total} /> 
      </span>
      </div>
      <button type='submit'>
        {processing?(
<div className={classes.loading}>
  <ClipLoader color="grey" size={12} />
  <p>Please Wait ...</p>
</div>
        ):"Pay Now"
        }
        
        </button>
  </div>
  </form>
</div>
  </div>
</div>

</section>
</Layout>
  )
}

export default Payment