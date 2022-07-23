// Importing the Requirements
import { React, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import award from "../../store/action/category";
import cart from "../../store/action/cart";
import storage from '../../services/localStorage';
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaPlus, FaAward } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to Render Add Nominations UI
function AddNominations() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [selectedAward, setSelectedAward] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSubProduct, setSelectedSubProduct] = useState("");
  const [selectedSubSubProduct, setSelectedSubSubProduct] = useState("");
  const [productName, setproductName] = useState("");
  const awardList = useSelector((state)  =>  state.category.awardList);
  const productList = useSelector((state)  =>  state.category.productList);
  const subProductList = useSelector((state)  =>  state.category.subProductList);
  const subsubProductList = useSelector((state)  =>  state.category.subsubProductList);
  const nominationList=useSelector((state) => state.category.nominationList)
  const cartList=useSelector((state)  =>  state.cart.cartList);
  const userDetail = useSelector((state)  =>  state.user.userDetail);
  const {state} = useLocation()
  const [validated, setValidated] = useState(false);
  const firstParent = "5ea9af9b5aebf3609433697c";
  
  useEffect(()  =>  {
    dispatch(award.getAwardList());
    dispatch(award.getProductList(firstParent, "subProduct"));
  }, []);

  useEffect(()  =>  {
    if(state && state?.id !== ""){
      dispatch(award.getNominationById({"_id": state?.id}))
    }
  }, [state])

  useEffect(()  =>  {
    
    if(state && state.id !== ""){
      setSelectedAward(nominationList?.awardCategory)
      fetchProductList(nominationList?.productCategory, "firstParent")
      fetchProductList(nominationList?.productSubCategory, "subsubproduct")
      setSelectedSubSubProduct(nominationList?.productSubSubCategory)
      setproductName(nominationList?.productName)
    }

  }, [nominationList])
  
  const fetchProductList = (parent, flag, edit = false)  =>  {
  
    if(selectedAward === "" && !state?.id){
      toast.warn("Please Choose Award Category first !")
      return; 
    }

    if(flag === "firstParent"){  
      setSelectedProduct(parent);
      const level = {
        productlevel: '2',
        productId: parent,
        nomId: cartList.nomineeId || nominationList?._id
      }
      dispatch(cart.updateCart(level));
      dispatch(award.getProductList(parent,flag));
    }

    if(flag === "subsubproduct"){
      setSelectedSubProduct(parent);
      const level = {
        productlevel: '3',
        productId: parent,
        nomId: cartList.nomineeId|| nominationList?._id
      }
      dispatch(cart.updateCart(level));
      dispatch(award.getProductList(parent,flag));
    }

    if(flag === "lastlevel"){
      setSelectedSubSubProduct(parent);
      const level = {
        productlevel: '4',
        productId: parent,
        nomId: cartList.nomineeId || nominationList?._id
      }
      dispatch(cart.updateCart(level))
    }
  };

  const onChangeAward = (value)  =>  {
    setSelectedAward(value);
    const cartData = {
      awardId: value,
      cart: true,
      level: "1",
      user: storage.getUserId(),
    }
    dispatch(cart.saveCart(cartData))
  }

  const handleSubmit=(event) => {
    
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      toast.warn("Please fill all the required fields !")
    }
    
    else{

      const level = {
        ProductName: productName,
        nomId: cartList.nomineeId || nominationList?._id,
        productlevel: "-1",
      }

      dispatch(cart.updateCart(level))
      console.log("Added to Cart Successfully !");
      toast.success("Added to Cart Successfully !")
      setTimeout(() => navigate("/checkout"), 6000);
    }

    setValidated(true);
  };

  return (
    <div className = "nominee_workflow">

      <ToastContainer />

      <div className = "inner_title">
        <h2>Add Award Nominations</h2>
      </div>

      <div className = "personal_details">
      
        <div className = "inner_form">
      
          <Form noValidate validated={validated} onSubmit={handleSubmit} >
      
            {/* Award Category Type */}
            <Form.Group className = "mb-4" controlId="formGroupEmail">
              <Form.Label>Choose your Award category <span className = "required">*</span></Form.Label>
              <Form.Select required value = {selectedAward} onChange = {(e) => onChangeAward(e.target.value)}>
                <option value = "">Choose your Award category</option>
                {awardList?.map((item, key)  =>  (
                  <option key = {key} value = {item._id}>
                    {item.awardName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
      
            {/* Product / Brand Category Type */}
            <Form.Group className = "mb-4" controlId="formGroupSelect">
              <Form.Label>Choose Product / Brand category <span className = "required">*</span></Form.Label>
              <Form.Select required value = {selectedProduct} onChange = {(e)  =>  fetchProductList(e.target.value,'firstParent')} >
                <option value = "" >Choose Product / Brand category</option>
                {productList?.map((item, key)  =>  (
                  <option key = {key} value = {item._id}>
                    {item.productName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
           
            {/* Product / Brand Category Type: Level - 1 */}
            <Form.Group className = "mb-4" controlId="formGroupSelect">
              <Form.Label>Choose Product / Brand category Level 1 <span className = "required">*</span></Form.Label>
              <Form.Select className = "subsub-selelct" required   value = {selectedSubProduct} onChange = {(e)  =>  fetchProductList(e.target.value,'subsubproduct')}>
                <option value = "" >Choose Product / Brand category Level 1</option>
                {subProductList?.map((item, key)  =>  (
                  <option key = {key} value = {item._id}>
                    {item.productName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
              
            {/* Product / Brand Category Type: Level - 2 */}
            <Form.Group className = "mb-4" controlId="formGroupSelect">
              <Form.Label>Choose Product / Brand category Level 2 <span className = "required">*</span></Form.Label>
              <Form.Select  required value = {selectedSubSubProduct} onChange = {(e) => fetchProductList(e.target.value,'lastlevel')} >
                <option value = "">Choose Product / Brand category Level 2</option>
                {subsubProductList?.map((item, key)  =>  (
                  <option key = {key} value = {item._id}>
                    {item.productName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Product / Brand Name */}
            <Form.Group className = "mb-4" controlId="formGroupSelect1">
              <Form.Label>Enter Product / Brand name <span className = "required">*</span></Form.Label>
              <Form.Control required value = {productName} onChange = {(e) => setproductName(e.target.value)} type="text" placeholder="Enter product" />
            </Form.Group>
            
            <div className = "form_btns">
              <Button type="submit" className = "custom_btn brown_btn w-100" >Add to Cart <span><FaShoppingCart /></span></Button>
            </div>
          </Form>

        </div>
      </div>
    </div>
  );
}

export default AddNominations;
