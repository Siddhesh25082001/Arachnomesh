import { Row, Col , Container} from "react-bootstrap";

import about from "../../../../assets/img/about_us.png";

function AboutFMCG(){
    return(
        <div className="aboutSection">
            <section className="inner_about bg-brown" id="about">
                <div className="section_title">
                    <h2 className="text-white">About</h2>
                </div>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="about_txt">
                                <h3 className="text-white mb-4">Channelier</h3>
                                <p className="text-white"> Channelier is India's First Distribution Management Platform with Sales Force automation capabilities on Cloud that offers a unified business suite to manage the entire distribution network. Its supports catalog based ordering for all intermediaries such as distributors, wholesalers as well as retailers. Also, it allows real time monitoring of the on-ground sales team.
                                </p>
                            </div>
                        
                        </Col>
                        <Col lg='6'>
                            <div className="about_img text-center">
                                <img src={about}  alt='about' />
                            </div>
                        
                        </Col>
                    </Row>

                </Container>
            </section>

            <section className="inner_about">
              
                <Container>
                    <Row>

                        <Col lg='6'>
                            <div className="about_img text-center">
                                <img src={about}  alt='about' className="mob_mar_2" />
                            </div>
                        
                        </Col>
                        <Col lg='6'>
                            <div className="about_txt">
                                <h3 className="text-black text-end mb-4">Awards </h3>
                                <p className="text-black text-end"> Channelier FMCG Awards is the world’s biggest FMCG award honoring FMCG brands and products. The annual Channelier FMCG Awards recognizes and celebrates the success of FMCG companies across India. It provides a unique opportunity for FMCG brands to get recognized and showcase themselves and their products to the Indian market.
                                </p>
                            </div>
                        
                        </Col>
                       
                    </Row>

                </Container>
            </section>

        </div>
    )
}

export default AboutFMCG