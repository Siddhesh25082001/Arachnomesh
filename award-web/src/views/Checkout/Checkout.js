// Importing the Requirements
import { React, useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";
import { FiXCircle,FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cart from "../../store/action/cart";
import Payment from "../../store/action/payment";
import storage from '../../services/localStorage';

import './Checkout.css'
import tick from './tick.png'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Checkout Function to render Checkout
function Checkout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const orderData = useSelector((state) => state.payment.orderData);
  const [referral, setReferral] = useState("");
  const [previousReferral, setpreviousReferral] = useState("");
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [discountState, setDiscountState] = useState(0);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [cartCount, setCartCount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Use Effect for Getting the current logged in user from userDetails
  useEffect(() => {

    if (userDetail && userDetail.user)    dispatch(cart.getCart({ id: userDetail?.user?._id }));
    else                                  dispatch(cart.getCart({ id: userDetail?._id }));

    return() => dispatch(Payment.removeOrder())
 
  }, [userDetail, cartCount]);

  // Use Effect for Setting the cartCount and the the discountState for the Nominee
  useEffect(() => {

    if (Object.keys(cartList).length && cartList?.firstNomineeDiscount !== 0) {

      // If the cart conatins atleast one Item
      if(cartCount > 0)               setDiscountState(cartList?.firstNomineeDiscount);
    }
  
    if (cartList?.result?.length)     setCartCount(cartList?.result?.length);

  }, [cartList]);

  // Use Effect for setting the DiscountState
  useEffect(() => {
    
    if(cartCount !== null && cartCount === 0){
     
      goToNomination();
      setDiscountState(0)
    }
  
  }, [cartCount])

  // Function to Redirect to the Nomination Page
  const goToNomination = () => {

    toast.warn("Please Add a Product in the Cart !")
    setTimeout(() => navigate("/addnominations"), 6000);

  };
  
  // Function to Remove the Cart Item
  const removeCartItem = (id) => {

    let ids = [];
    
    if (!Array.isArray(id)) {
    
      ids.push(id);
      document.getElementById(id).style.display = "none";
    
      let newCount = cartCount - 1;
      setCartCount(newCount);

      if(newCount === 0){
        
        toast.warn("Please Add a Product in the Cart !")
        setTimeout(() => navigate("/AddNominations"), 6000);

      }
  
    } 
    
    else {
      ids = id;
      document.getElementById("parent-item").style.display = "none";
    }

    dispatch(cart.removeCart({ nomineeId: ids }));
    window.location.reload()
  
  };

  // Function to Apply the Promo Code
  const ApplyPromo = () => {

    // If a valid Referral Code is applied 
    if (referral !== "") {
     
      if (referral === previousReferral) {
        console.log({
          "Current Referral Code": referral,
          "Previous Referral Code": previousReferral
        })
        toast.warn("Same Referral Code can’t be applied more than once !")
        return;
      }

      setIsDisabled(true);
      setpreviousReferral(referral);

      if (referral.length === 7) {
      
        let discountValue = referral.slice(2, 6);
        let discountNum = parseInt(discountValue);
        let totalwithoutgst = cartList?.totalwithoutgst / 100;
        let firstNomineeDiscout = cartList?.firstNomineeDiscount;
        let totalwithgst = cartList?.amount / 100;
        let subtotal = totalwithoutgst+firstNomineeDiscout;
        console.log(totalwithoutgst, totalwithgst, discountValue, discountNum, subtotal, typeof(discountValue))

        if (!Number.isNaN(discountNum)) {
            
          if(totalwithgst > 0){
            
            let discountAmount = Math.round((parseInt(discountValue) / 13) * 100);
            let discountStateState = discountState + discountAmount
            console.log(discountStateState, discountAmount);
            setDiscountState(discountStateState);   
          
            if(discountStateState >= subtotal){
              cartList.amount = 0
              cartList.GST = 0
              setReferralDiscount(discountAmount);
              setDiscountState(subtotal);
              return;
            } 
            
            setReferralDiscount(discountAmount);
         
            cartList.GST = Math.round((subtotal - discountStateState) * 0.18)
            cartList.amount = ((subtotal - discountStateState) + cartList?.GST) * 100;
          }
          
          else  toast.warn("Referral Code Can’t be Applied Here !")
          
        } 
        
        else {
          toast.warn("Invalid Referral Code !");
          return false;
        }

      } 
      
      else {
        toast.warn("Invalid Referral Code !");
        return false;
      }
    } 
    
    // If the Referral Code is not valid
    else {
      toast.warn("Please Enter a Valid Referal Code !");
    }
  };

  // Function to Remove the Promo Code
  const RemovePromo = () => {

    setReferral("");
    setpreviousReferral("");
    setIsDisabled(false)
    
    let firstNomineeDiscount = cartList?.firstNomineeDiscount
    let totalwithoutgst = cartList?.totalwithoutgst / 100;
    let subtotal = totalwithoutgst + firstNomineeDiscount;
    setDiscountState(firstNomineeDiscount)

    cartList.GST = Math.round((subtotal - firstNomineeDiscount) * 0.18)
    cartList.amount = ((subtotal - firstNomineeDiscount) + cartList?.GST) * 100;
  }

  // Function to Pay
  const payment = () => {

    let amount = cartList?.amount / 100;
    if (amount === 0) {
    
      if (referralDiscount === 0) {
        setReferralDiscount(discountState);
      }
      amount = 0;
      setShowPopup(true)
      
      dispatch(
        Payment.paymentWithZeroAmount(
          {
            amount: amount,
            awards: cartList?.nominations,
            id: storage.getUserId(),
          },
          confirmBooking
        )
      );
          
    } 
    
    else  createRzpayOrder();
  };

  // Function to Confirm
  const confirmBooking = (orderDetails) => {

    orderDetails.signatureData = {
      order_id: orderDetails.order_id,
      signature: "signature_" + orderDetails.order_id,
    };
    
    dispatch(
      Payment.confirmBooking({
        order: orderDetails,
        sucessData: orderDetails.signatureData,
        discount: referral + "/" + referralDiscount,
      })
    );
    
    setReferral("");
  };

  // Function to Create A Razorpay Order
  const createRzpayOrder = () => {

    let amount = cartList?.amount;
    
    dispatch(
      Payment.getOrder({
        amount: amount,
        awards: cartList?.nominations,
        id: storage.getUserId(),
      })
    );
  };

  // Use Effect for Razorpay
  useEffect(() => {

    if (Object.keys(orderData).length) {
      payWithRazor(cartList?.nominations);
    }

  }, [orderData]);

  // Function to Pay with Razorpay with Channelier Credentials
  const payWithRazor = (awards) => {
    
    let orderAmount = orderData["amount_due"];

    const options = {
      key:  window.location.hostname === "award.channelier.com" ? "rzp_live_Vu91ZM8D7czH94" : "rzp_test_bZXQCFaZruHgii",
      amount: orderAmount,
      currency: "INR",
      name: "Channelier Awards",
      description: "Amount for channelier awards",
      image: "./assets/images/footer-channelier.png",
      order_id: orderData["id"],
      modal: {
        escape: true,
      },
      notes: { user_id: storage.getUserId(), awards: awards },
      theme: {
        color: "#0c238a",
      },
    };

    options.handler = (response, error) => {
    
      console.log(response, "resp");
      options.response = response;
      let orderDetails = orderData;
    
      dispatch(
        Payment.confirmBooking({
          order: orderDetails,
          sucessData: response,
          discount: referral + "/" + referralDiscount,
        })
      );
    
      setShowPopup(true);
    };

    options.modal.ondismiss = () => {
      toast.error("Transaction Cancelled !");
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Function to Load the Script
  const loadScript = (src) => {

    return new Promise((resolve) => {
    
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    
    });
  };

  // Function for Negative Amount Check
  const negativeCheck=(amount)=>{
   
    if(amount <= 0)   return 0
    return amount
  }

  // Function to Edit Nominations
  const editNomination = (id) => {
    
    navigate('/addnominations', {
      state: {
        id
      }
    })
  }

  // Function to Handle Payment - If the Payment is successful, then the Popup is shown 
  const handlePayment = () => {
    
    if(payment()){
      setShowPopup(true);
      console.log('Payment Successful !')
    }
    
  }

  // Use Effect for Loading the Scripts
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  // Return the Checkout UI
  return (

    <div className = "nominee_workflow">

      <ToastContainer />
    
      <div className = "inner_title">
        
        <div>
          <h2 onClick = {() => navigate("/cart")}>Cart</h2>
          <h6 className = "mb-0"> {cartCount > 1 ? cartCount +' Items' : cartCount + ' Item'} in Cart</h6>
        </div>
      
        <div>
          <Link to="/addnominations">
            <Button className = "custom_btn brown_btn">Add Award Nominations +</Button>
          </Link>
        </div>

      </div>

      <Row>

        <Col lg="12">
          <div className = "cart_details1">

            <div className = "cart_inner">
              <div className = "table-responsive  cart_table">
                <table className = "table">

                  {/* Table Heading */}
                  <thead style = {{textAlign: "center"}}>
                    <tr>
                      <th>Award category</th>
                      <th>Category</th>
                      <th>Product/Brand Name</th>
                      <th>Edit Nomination</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {cartList?.result?.map((item, key) => (

                       <tr id = {item?._id} key = {key} style = {{textAlign: "center"}}>
                        
                        {/* Award Category Name */}
                        <td><p className = "mb-0"> {item?.awardCategory?.awardName}</p></td>
                        
                        {/* Product Category Name */}
                        <td><p className = "mb-0">{item?.productCategoryName}</p>{" "}</td>
                        
                        {/* Product Name */}
                        <td><p className = "fw-bold">{item?.productName}</p></td>
                        
                        {/* Edit Button */}
                        <td>
                          {" "}
                          <span className = "edit" onClick = {() => editNomination(item?._id)} ><FiEdit /></span>
                        </td>

                        {/* Price */}
                        <td>
                          {" "}
                          <p className = "mb-0">
                            {" "}
                            <FaRupeeSign />{item?.awardCategory?.amount}
                          </p>
                        </td>
                       
                        {/* Remove */}
                        <td>
                          {" "}
                          <span className = "cut" onClick = {() => removeCartItem(item?._id)} ><FiXCircle /></span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
              </div>
            </div>

            <div className = "cart_inner h-auto" style = {{maxHeight: "none"}}>
              
              <div className = "referal_input" style = {{margin: "10px 0px"}}>

                <FloatingLabel  controlId = "floatingInput" label = "Enter Your Referral Code"  className = "mb-0" style = {{width: "85%"}}>
                  <Form.Control
                    value = {referral}  disabled = {isDisabled} onChange = {(e) => setReferral(e.target.value)} type = "text" placeholder = "Referral Code" />
                </FloatingLabel>

                <div>
                  <Button className = "custom_btn brown_btn" onClick = {() => ApplyPromo()} disabled = {isDisabled} >Apply</Button>
                </div>

                <div>
                  <Button className = "custom_btn brown_btn" onClick = {() => RemovePromo()} disabled = {!isDisabled} >Remove</Button>
                </div>
              
              </div>

              <div className = "billing cart_table">

                <h6 className = "mb-3 fw-bold">Billing Summary</h6>

                {/* Sub Total */}
                <p>
                  <label>Sub Total</label>{" "}
                  <span>
                    <FaRupeeSign />{" "}
                    {negativeCheck(cartList?.totalwithoutgst / 100 +  cartList?.firstNomineeDiscount) }
                    {" "}
                  </span>
                </p>

                {/* Discount */}
                {discountState !== 0 && (
                  <p>
                    <label>Discount</label>{" "}
                    <span>
                      <FaRupeeSign />
                      (-{negativeCheck(discountState)})
                    </span>
                  </p>
                )}

                {/* GST */}
                <p>
                  <label>GST</label>{" "}
                  <span>
                    <FaRupeeSign />
                    {negativeCheck(cartList?.GST)}
                  </span>
                </p>

                {/* Grand Total */}
                <p>
                  <label>
                    <strong>Grand Total</strong>
                  </label>{" "}
                  <span>
                    <strong>
                      <FaRupeeSign />
                      {negativeCheck(cartList?.amount / 100)}
                    </strong>
                  </span>
                </p>

              </div>
            </div>

            <div className = "form_btns text-center mb-2">
              <Button type="button" className = "custom_btn brown_btn w-50" onClick = {handlePayment} >
                Pay 
                <FaRupeeSign /> {negativeCheck(cartList?.amount / 100)}
              </Button>
            </div>

          </div>
        </Col>
        
      </Row>

      <div className= {`popupContainer ${showPopup ? 'show' : ''}`} >
          <div className="popup">
              <img src = {tick} alt = "Success" />
              <h2>Payment received !</h2>
              <p>To complete the nomination, fill the questionnaire and send the samples</p>
              <div className="buttons">
                  <button id="close1" className="btn btns" type="button"><a href = '/nominated'>Go to Questionnaire</a></button>
              </div>
          </div>
      </div>

    </div>
  );
}

// Exporting the Checkout UI
export default Checkout;