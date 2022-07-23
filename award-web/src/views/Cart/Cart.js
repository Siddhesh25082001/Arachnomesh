import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import cart from "../../store/action/cart";
import { useDispatch, useSelector } from "react-redux";
import storage from '../../services/localStorage';

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function Cart() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cartList);
  const userDetail=useSelector((state) => state.user.userDetail);
  const [cartCount,setCartCount]=useState(0);
  const navigate = useNavigate();
 console.log(userDetail);
  useEffect(() => {
  

      dispatch(cart.getCart({ id:storage.getUserId() }));
  
    
   
  }, []);

  useEffect(() => {
    if (cartList) {
      setCartCount(cartList?.result?.length)
    }
   
  }, [cartList])
  

  const removeCartItem = (id) => {
    let ids = [];
    if (!Array.isArray(id)) {
      ids.push(id);
      document.getElementById(id).style.display = "none";
      setCartCount(cartCount-1)
    } else {
      ids = id;
      document.getElementById("parent-item").style.display = "none";
      
    }
    dispatch(cart.removeCart({ nomineeId: ids }));
  };

  const editNomination=(id)=>{
    navigate('/addnominations',
    {
      state: {
        id
      }
    }
    )
  }

  const goToCheckout = () => {
    if(cartCount){
    navigate("/checkout");
    }else{
    toast.warn("Please add a product in the cart !")
    }
  };

  return (
    <div className="nominee_workflow">

      <ToastContainer />

      <div className="inner_title">
        <div>
          <h2>Cart</h2>
          <h6 className="mb-0">{cartCount>1?cartCount+' Items':cartCount+' Item'} in Cart</h6>
        </div>

        <div>
         
            <Button className="custom_btn brown_btn"  onClick={() => navigate("/addnominations")} >Add Award Nominations +</Button>
        
        </div>
      </div>

      <div className=" table-responsive">
        <div className="cart_details">
          <div className="tr_row tr_header">
            <div className="td_col">Award category</div>
            <div className="td_col">Category</div>
            <div className="td_col">Product/Brand Name</div>
            <div className="td_col">Edit Nomination</div>
            <div className="td_col">Price</div>
            <div className="td_col">
              {/* <Button
                className="custom_btn remove_btn"
                onClick={() => removeCartItem(cartList?.nominations)}
              >
                Remove all
              </Button> */}
              Remove
            </div>
          </div>

          <div id="parent-item">
            {cartList?.result?.map((item, key) => 
             
            (
             

              <div key={key} id={item?._id} className="tr_row">
                <div className="td_col">{item?.awardCategory?.awardName}</div>
                <div className="td_col">{item?.productCategoryName}</div>
                <div className="td_col">{item?.productName}</div>
                <div className="td_col">
                  <Button className="custom_btn brown_btn" onClick={()=>editNomination(item?._id)}>Edit</Button>
                </div>
                <div className="td_col">
                  <FaRupeeSign /> {item?.awardCategory?.amount}
                </div>
                <div className="td_col">
                  <span className="close_icon" onClick={() => removeCartItem(item?._id)}> <BsXLg/></span>
                </div>
              </div>
           
            ))}
          </div>

        </div>
      </div>

      <div className="cart_btn w-100 text-center mt-3">
        <Button
          onClick={()=>goToCheckout()}
          className="custom_btn bg_dark_brown big_btn"
        >
         Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
