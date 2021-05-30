import React from 'react';
import { Image,Form,Segment ,Header, Loader,Icon} from 'semantic-ui-react'
import { Col, Row, Container} from 'react-bootstrap'
import '../../../asset/css/totalreview_CDT.css'
import { history } from '../../../history'
import firebase from '../../../function/firebaseConfig'
import {
    Button, 
  } from 'reactstrap'
import {Save } from 'react-feather';
class ResultHTP extends React.Component {
    constructor() {
        super();
        this.state = {
          result: '-',
          status:'not done',
          pointHouse:'',
          pointTree:'',
          pointPerson1:'',
          pointPerson2:'',
          total:"",

          userImg_house:'',
          userImg_tree: '',
          userImg_person:'',
          userImg__oppositesex:'',

          userName:'',
          userAge:'',
          userEducation:'',
          userJob:'',
          userSex:'',
          
          person:null,
          loading: false,
          repoint :false,
        };
      }

    componentDidMount() {
        const username = localStorage.getItem('username')
        const user = JSON.parse(localStorage.getItem('selectUser'))
        const point = JSON.parse(localStorage.getItem('pointUser'))
        let getResult = firebase.database().ref().child("userPsychologist").child(username).child("label_htp").child(user.user_id)
        this.setState({
            userId: user.user_id,
            person:user.person,
            userName:user.name,
            userAge:user.age,
            userEducation:user.education,
            userJob:user.job,
            userSex:user.sex,
            userImg_house: user.image_house,
            userImg_tree: user.image_tree,
            userImg_person: user.image_person,
            userImg__oppositesex: user.image_oppositesex,
            
        })

        
        if(user.status != "done"){
            this.setState({
                status:"not done",
                pointHouse:point.pointHouse,
                pointTree:point.pointTree,
                pointPerson1:point.pointPerson1,
                pointPerson2:point.pointPerson2,
                total:point.total,
            })
        }
        if(localStorage.getItem('pointUser') != null){
            if(user.status == "done" && user.user_id == point.userId){
                this.setState({
                    status:"done",
                })
                getResult.on('value', snapshot => {
                    var data = snapshot.val();
                    if(point.total == data.total&&point.pointHouse == data.pointHouse&&point.pointTree==data.pointTree
                        &&point.pointPerson1 == data.pointPerson1&&point.pointPerson2 == data.pointPerson2
                        ){
                        this.setState({   
                            pointHouse:data.pointHouse,
                            pointTree:data.pointTree,
                            pointPerson1:data.pointPerson1,
                            pointPerson2:data.pointPerson2,
                            total:data.total,
                            result:data.result,
                            loading: true 
                        },()=>{
                            console.log(this.state.result)
                        })
                    }else {
                        this.setState({
                            status:"not done",
                            repoint:true,
                            pointHouse:point.pointHouse,
                            pointTree:point.pointTree,
                            pointPerson1:point.pointPerson1,
                            pointPerson2:point.pointPerson2,
                            total:point.total,
                        })
                    }
                })
            }
            else if(user.status == "done" && user.user_id != point.userId){
                this.setState({
                    status:"done",
                })
                getResult.on('value', snapshot => {
                    var data = snapshot.val();
                        this.setState({
                            pointHouse:data.pointHouse,
                            pointTree:data.pointTree,
                            pointPerson1:data.pointPerson1,
                            pointPerson2:data.pointPerson2,
                            total:data.total,
                            result:data.result,
                            loading: true 
                        },()=>{
                            console.log(this.state.result)
                        })
                })
            }
        }else{
            this.setState({
                    status:"done",
                })
                getResult.on('value', snapshot => {
                    var data = snapshot.val();
                        this.setState({
                            pointHouse:data.pointHouse,
                            pointTree:data.pointTree,
                            pointPerson1:data.pointPerson1,
                            pointPerson2:data.pointPerson2,
                            total:data.total,
                            result:data.result,
                            loading: true 
                        },()=>{
                            console.log(this.state.result)
                        })
                })
        }

       
    }
    
    savePoint = () =>{
        const username = localStorage.getItem('username')
        let getPath = firebase.database().ref().child("userPsychologist").child(username).child("label_htp").child(this.state.userId)
        getPath.set({
          pointHouse: this.state.pointHouse,
          pointTree: this.state.pointTree,
          pointPerson1: this.state.pointPerson1,
          pointPerson2: this.state.pointPerson2,
          total: this.state.total,
          result:this.state.result
        })
        if(this.state.status == "not done"&&this.state.repoint==false){
            let setSuccess = firebase.database().ref().child("RewriteHTP").child(this.state.userId).child("label_info")
        setSuccess.set({
          person: this.state.person+1,
        } ,()=>{
            console.log("done ")
            history.push('/totalreview_htp')
          })
        }else{
            history.push('/totalreview_htp')
        }
      }

    handleClick() {
        history.push("/htp");
    }
    handleBack() {
        history.push("/totalreview_htp");
    }
    render() {
        console.log(localStorage.getItem('pointUser'))
        return (
            <div>    
                <Container>
                    <Row>
                    <Col className="w-50">
                    <Row >
                        <Col >
                            <Image
                                src={this.state.userImg_house}
                                width="250"
                                height="250" />
                            <p id="point">{this.state.pointHouse}</p>
                        </Col>
                        <Col>
                            <Image
                                src={this.state.userImg_tree}
                                width="250"
                                height="250"  />
                            <p id="header">{this.state.pointTree}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image
                                src={this.state.userImg_person}
                                width="250"
                                height="250"  />
                            <p id="header"> {this.state.pointPerson1}</p>
                        </Col>
                        <Col>
                            <Image
                                src={this.state.userImg__oppositesex}
                                width="250"
                                height="250"  />
                            <p id="header">{this.state.pointPerson2}</p>
                        </Col>
                    </Row>
                </Col>
                <Col className="align-self-center">
               
                <Form id="form" >
                        <Segment >
                        <Row className="ml-2">
                                <Icon circular name='user' size="huge"  inverted  color="teal"/> 
                                <Col>
                                <p >ชื่อ :  {this.state.userName}</p>
                                <p >อายุ :  {this.state.userAge} ปี</p>
                                <p >เพศ : {this.state.userSex==="female"
                                            ? "หญิง"
                                            : "ชาย"
                                            }</p>
                                <p >อาชีพ :  {this.state.userJob}</p>
                            </Col> 
                            </Row>
                            <Form.Field>
                            <p id="header">คะแนนรวม {this.state.total} คะแนน</p>
                            </Form.Field>
                            { this.state.status=="done"&&this.state.loading == false
                                ? <Loader active inline='centered'>กำลังโหลดข้อมูล</Loader>
                                : this.state.status=="done"&&this.state.loading == true
                                   ? <p id="header">ผลการประเมิน : {this.state.result !="-"
                                            ? this.state.result
                                            : "ไม่สามารถประเมินได้"
                                   } </p>
                                   : <Form.Group inline>
                                            <Form.Radio
                                                label='สภาวะปกติ'
                                                value='0'
                                                checked={this.state.result === 'สภาวะปกติ'}
                                                onClick={() => this.setState({
                                                    result: 'สภาวะปกติ'
                                                })
                                                }
                                            />
                                            <Form.Radio
                                                label='สภาวะซึมเศร้า'
                                                value='-1'
                                                checked={this.state.result === 'สภาวะซึมเศร้า'}
                                                onClick={() => this.setState({
                                                    result: 'สภาวะซึมเศร้า'
                                                })}
                                            />
                                            <Form.Radio
                                                label='สภาวะอารมณ์หุนหันพลันแล่น'
                                                value='1'
                                                checked={this.state.result === 'สภาวะอารมณ์หุนหันพลันแล่น'}
                                                onClick={() => this.setState({
                                                    result: 'สภาวะอารมณ์หุนหันพลันแล่น'
                                                })}
                                            />
                                            <Form.Radio
                                                label='ไม่สามารถประเมินได้'
                                                value='-'
                                                checked={this.state.result === 'ไม่สามารถประเมินได้'}
                                                onClick={() => this.setState({
                                                    result: 'ไม่สามารถประเมินได้'
                                                })}
                                            />
                                        </Form.Group>
                            }
                        </Segment>
                    </Form>
                    
                    <div className='d-flex justify-content-center mt-4'>
                    {this.state.status ==="done"
                        ? <div>
                             <Button
                                size={30}
                                color="danger"
                                onClick={this.handleClick}
                                className="mr-4"
                                >
                                <Save size={15} className="mr-2" />
                                ประเมินใหม่
                            </Button>
                            <Button
                                size={30}
                                color="info"
                                onClick={this.handleBack}
                                >
                                ย้อนกลับ
                            </Button>
                          </div>
                        :<Button
                            size={30}
                            color="info"
                            onClick={this.savePoint}
                            >
                            <Save size={15} className="mr-2" />
                            บันทึก
                        </Button>
                        }
                        
                    </div>
                </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default ResultHTP;