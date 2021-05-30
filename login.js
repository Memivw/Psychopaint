import React from 'react';
import { Col,Form,Card,Button, } from 'react-bootstrap'
import '../../asset/css/login.css'
// import firebase from '../../function/firebaseConfig';
import { history } from '../../history'

class LOGIN extends React.Component {
    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
          status: "",
        }
      }

      // login with firebase
      // login_firebase = () => {
      //   const email = this.state.username
      //   const pass = this.state.password
      //   const res = firebase.auth().signInWithEmailAndPassword(email,pass)
      //   .then(response => {
      //     this.setState({
      //       currentUser: response.user,
      //       status: "yes",
      //     })
      //   })
      //   .catch(error => {
      //     this.setState({
      //         status: "no"
      //     })
      //   })
      // }

      // login with username
      login = () => {
        const email = this.state.username
        const pass = this.state.password
        if (email == "psy001" || email == "psy002" || email == "psy003" || email == "psy004" || email == "psy005"){
          if(pass == "test"){
            localStorage.setItem('username', email);
            localStorage.setItem('login',true);
            this.setState({ status: "yes"})
            history.push("/")
          }else{
            this.setState({ status: "no"})
          }
        }else{ this.setState({ status: "no"}) }
      }

 render(){
  return (
        <div class="bg">
              <Card id="login" style={{width:'30em'}}>
              <p id="header">ยินดีต้อนรับ!</p>
              <Form>
              <Col xs={12}>
              <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>บัญชีผู้ใช้</Form.Label>
              <Form.Control placeholder="บัญชีผู้ใช้" onChange={e => {
                this.setState({
                    username: e.target.value
                })
              }}/>
              </Form.Group>
              </Col>
          <  Col xs={12}>
          <Form.Group controlId="formGroupPassword">
          <Form.Label>รหัสผ่าน</Form.Label>
          <Form.Control type="password" placeholder="รหัสผ่าน" onChange={e => {
            this.setState({
                password: e.target.value
            })
          }}/>
          </Form.Group>
          {
           this.state.status == "no" ?
            <Form.Label id="err">*บัญชีผู้ใช้และรหัสผ่านไม่ถูกต้อง</Form.Label> : null
          }
          </Col>
          <Button id="cen" variant="secondary" onClick={this.login}>เข้าสู่ระบบ</Button>
          {/* <p id="regis">คุณยังไม่มีบัญชีผู้ใช้งาน? <a href="/register">ลงทะเบียน</a></p> */}
          </Form>
          </Card>
          </div>
        )
    }
}
export default LOGIN;