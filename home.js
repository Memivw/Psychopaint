import React from 'react';
import {Col,Row,Container, } from 'react-bootstrap'
import '../../asset/css/home.css'
import HoverImage from "react-hover-image";
import firebase from '../../function/firebaseConfig'
import { history } from '../../history'

class Home extends React.Component {
    constructor(){
      super();
      this.state = {
        username: ""
      }
    }

    componentDidMount(){
      localStorage.setItem('type',"")
    }
    
    render() {
      return (
        <div>
        {/* <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/home">
                    <Icon inverted name='home'  className="d-inline-block align-top"/>{' '}
                    PSYCHO PAINT
                    </Navbar.Brand>
         </Navbar> */}
        
        <p id="header" style={{marginTop:"1cm"}}>กรุณาเลือกหัวข้อที่ต้องการประเมิน</p>
        <Container  className="d-flex justify-content-center">
            <Row >
              <Col >
              <HoverImage src="/CDT_gray2.png" 
                  hoverSrc="/CDT_color.png" 
                  className='resize'
                  onClick={(event) =>{
                    localStorage.setItem('type',"CLOCK DRAWING TEST")
                    history.push('/totalreview')
                  }}
                />
              </Col>
              <Col>
              <HoverImage src="/HTP_gray2.png" 
                  hoverSrc="/HTP_color.png" 
                  href='/htp'
                  className='resize'
                  onClick={(event) =>{
                    localStorage.setItem('type',"HOUSE THREE PERSON")
                    history.push('/totalreview_htp')
                  }}
                  />
            </Col>
            </Row>
      
          </Container>
       </div>
      )
    }
  }
  
  export default Home;
