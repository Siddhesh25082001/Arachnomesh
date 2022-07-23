import { React , useState, useEffect } from 'react';
import leaves from "../../../../assets/img/leaves.png";
 import { Modal , Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function HomeModal(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userDetail=useSelector((state)=>state.user)
    //  console.log(userDetail);
    useEffect(() => {
      if (!userDetail.isLoggedOut && !userDetail.isLoggedIn) {
         handleShow()
        }
    }, [userDetail]);
    

    return(
        <>
  
        <Modal className='homeModal' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          
          </Modal.Header>
          <Modal.Body> <h6 className='mb-3'>To know more about Channelier FMCG Awards 2021, drop your number here.</h6>
            <Form>
                <Form.Group className="form_row mb-0" controlId="formBasicEmail">
                  <Form.Control  type="text" placeholder="Enter Mobile Number"  />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className='p-2'>
           <Button className='custom_btn brown_btn m-auto' variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default  HomeModal