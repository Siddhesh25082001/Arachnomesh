// Importing the requiremnts
import { React, useEffect, useState } from "react";
import payment from "../../store/action/payment";
import { useDispatch, useSelector } from "react-redux";
import storage from "../../services/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Function to render the Nominated UI
function Nominated() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [fakestate, setFakeState] = useState(false);
  
  const userDetail = useSelector((state) => state.user.userDetail);
  const userNominationList = useSelector((state) => state.payment.userNomination);
  
  // Use Effect fro getting the Nominations of the user
  useEffect(() => {
    dispatch(payment.getUserNominationById({ userId: storage.getUserId() }));
    setTimeout(() => {
      setFakeState(true);
    }, 2000);
  }, [fakestate]);

  // Navigating to the Questionnaire
  const navigateToQuestion = (id, name) => {
    navigate("/questionnaire", {
      state: {
        nominationId: id,
        productName: name,
      },
    });
  };

  return (
  
  <div className="nominee_workflow">

      <ToastContainer />

      <div className="inner_title">
        <h2>Successfully Nominated</h2>
      </div>
    
      <div className="table-responsive">
        <div className="cart_details nominated_page">
    
          <div className="tr_row tr_header">
            <div className="td_col" style={{ textAlign: "center"}}>Award category</div>
            <div className="td_col" style={{ textAlign: "center"}}>Category</div>
            <div className="td_col" style={{ textAlign: "center"}}>Product/Brand Name</div>
            <div className="td_col" style={{ textAlign: "center"}}>Payment Status</div>
            <div className="td_col" style={{ textAlign: "center"}}>Questionnaire Status</div>
          </div>

          {userNominationList?.map((item, key) => (
            <div className="tr_row" key={key}>
              <div className="td_col" style={{ textAlign: "center"}}>{item?.awardName[0]}</div>
              <div className="td_col" style={{ textAlign: "center"}}>
                {`
                  ${item?.productCategory[0] || ""} | 
                  ${ item?.productSubCategory[0] || ""} |
                  ${item?.productSubSubCategory[0] || ""}`
                }
              </div>
              <div className="td_col" style={{ textAlign: "center"}}>{item?.productName}</div>
              <div className="td_col" style={{ textAlign: "center"}}>
                {item.payment ? (
                  "Paid"
                ) : (
                  <Link to={"/checkout"} title="Checkout">
                    Pending
                  </Link>
                )}
              </div>

              {item.answerSubmitted !== undefined && item.answerSubmitted ? (
                <div
                  className="td_col" style={{ textAlign: "center"}}
                  onClick={() =>
                    navigateToQuestion(item?._id, item?.productName)
                  }
                >
                  <Button className="custom_btn brown_btn">
                    Already filled
                  </Button>{" "}
                </div>
              ) : (
                <div className="td_col" style={{ textAlign: "center"}}>
                  <Button
                    disabled={item?.payment ? false : true}
                    className="custom_btn brown_btn"
                    onClick={() =>
                      navigateToQuestion(item?._id, item?.productName)
                    }
                  >
                    Click here to fill
                  </Button>{" "}
                </div>
              )}
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Nominated;
