import { React} from 'react';
import leaves from "../../../../assets/img/leaves.png";
import { Row, Col } from "react-bootstrap";

function HomeSection(){

    return(
        <section className="home_section">
            <div className="container-fluid">
                <Row>
                    <Col lg='12'>
                       <div className="bannerContent" >
                           <img src={leaves} className="leaf_img" alt="leaves_img" />
                           <div className='bannerHeading'> 
                                <h1 className="textHeading">CHANNELIER <br/> FMCG AWARDS</h1>
                                <h2 className="text2021">2022</h2>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default  HomeSection