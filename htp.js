import React from 'react';
import { Image, Form,Segment,Label,Icon,Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../../../asset/css/htp.css'
import { history } from '../../../history'
import firebase from '../../../function/firebaseConfig'
import { 
  Col, 
  Badge, 
  Table, 
  Row, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap'
import { Save} from 'react-feather';
class HTP extends React.Component {
  constructor() {
    super();
    this.state = {
      detect:'',
      valueA: '',valueB1: '',valueB2: '',valueC: '',valueD: '',valueE: '',
      pointA: '',pointB1: '',pointB2: '',pointC: '',pointD: '',pointE: '',
      
      modalSave:false,
      modalfinish:false,
      
      totaltime:"",
      totalline:"",
      statepic:'House',
      
      pointHouse:'',
      pointTree:'',
      pointPerson1:'',
      pointPerson2:'',
      sumpoint:"",
      
      userId: '',
      userName:'',
      userAge:'',
      userEducation:'',
      userJob:'',
      userSex:'',
      userImg_house:'',
      userImg_tree: '',
      userImg_person:'',
      userImg__oppositesex:'',
      userTime_house:'',
      userTime_tree:'',
      userTime_person:'',
      userTime_oppositesex: '',
      userstrokes_numberhouse:'',
      userstrokes_numbertree:'',
      userstrokes_numberperson:'',
      userstrokes_numberops:'',
      person:null
    };
  }
  gettime=(arraytime_start,arraytime_end)=>{
    let hour = parseInt(arraytime_end[0], 10 ) - parseInt(arraytime_start[0], 10 )
    let minute= parseInt(arraytime_end[1], 10 ) - parseInt(arraytime_start[1], 10 )
    let second = parseInt(arraytime_end[2], 10 ) - parseInt(arraytime_start[2], 10 )
    let totaltime
    if(second < 0){
      second= second+60
      minute= minute-1
    }
    if(minute <0){
      minute = minute+60
      hour = hour-1
    }
    if(minute!= 0){
      totaltime = minute+" นาที "+second+" วินาที "
    }else{
      totaltime = second+" วินาที "
    }
    return totaltime
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('selectUser'))
    const arraytime_housestart =user.time_housestart.split(':');
    const arraytime_houseend =user.time_houseend.split(':');
    const timeHouse = this.gettime(arraytime_housestart ,arraytime_houseend)

    const arraytime_treestart =user.time_treestart.split(':');
    const arraytime_treeend =user.time_treeend.split(':');
    const timeTree = this.gettime(arraytime_treestart ,arraytime_treeend)

    const arraytime_personstart =user.time_personstart.split(':');
    const arraytime_personend =user.time_personend.split(':');
    const timePerson = this.gettime(arraytime_personstart ,arraytime_personend)

    const arraytime_oppositesexstart =user.time_oppositesexstart.split(':');
    const arraytime_oppositesexend =user.time_oppositesexend.split(':');
    const timeOppositesex = this.gettime(arraytime_oppositesexstart ,arraytime_oppositesexend)

    console.log(user)
    this.gettime(user,"time_personstart","time_personend")
    this.gettime(user,"time_oppositesexstart","time_oppositesexhouseend")
    this.setState({
      userId: user.user_id,
      userName:user.name,
      userAge:user.age,
      userEducation:user.education,
      userJob:user.job,
      userSex:user.sex,
      userImg_house: user.image_house,
      userImg_tree: user.image_tree,
      userImg_person: user.image_person,
      userImg__oppositesex: user.image_oppositesex,
      userstrokes_numberhouse:user.strokes_numberhouse,
      userstrokes_numbertree:user.strokes_numbertree,
      userstrokes_numberperson:user.strokes_numberperson,
      userstrokes_numberops:user.strokes_numberops,
      person: user.person,
      totaltime:timeHouse,
      userTime_tree:timeTree,
      userTime_person:timePerson,
      userTime_oppositesex:timeOppositesex ,
      totalline:user.strokes_numberhouse,
    }); 
  }
  toggleModalSave = () => {
    this.setState((prevState) => ({
      modalSave: !prevState.modalSave,
    }));
  };
  toggleModalFinish = () => {
    this.setState((prevState) => ({
      modalSave: !prevState.modalSave,
      modalfinish: !prevState.modalfinish,
    }));
  };
  NextPic = () =>{
      const point = this.state.pointA+this.state.pointB1+this.state.pointB2+this.state.pointC+this.state.pointD+this.state.pointE
      console.log(point);
      if(this.state.statepic === "House"){
        console.log(this.state.statepic+" done");
        this.setState({
          pointHouse:point,
          statepic: "Tree",
          valueA: '',valueB1: '',valueB2: '',valueC: '',valueD: '',valueE: '',
          pointA: '',pointB1: '',pointB2: '',pointC: '',pointD: '',pointE: '',
          totaltime:this.state.userTime_tree,
          totalline:this.state.userstrokes_numbertree
        }); 
        this.toggleModalSave()
      }
      else if(this.state.statepic === "Tree"){
        console.log(this.state.statepic+" done");
        this.setState({
          pointTree:point,
          statepic: "Person",
          valueA: '',valueB1: '',valueB2: '',valueC: '',valueD: '',valueE: '',
          pointA: '',pointB1: '',pointB2: '',pointC: '',pointD: '',pointE: '',
          totaltime:this.state.userTime_person,
          totalline:this.state.userstrokes_numberperson
        });
        this.toggleModalSave()
      }
      else if(this.state.statepic === "Person"){
        console.log(this.state.statepic+" done");
        this.setState({
          pointPerson1:point,
          statepic: "Oppositesex",
          valueA: '',valueB1: '',valueB2: '',valueC: '',valueD: '',valueE: '',
          pointA: '',pointB1: '',pointB2: '',pointC: '',pointD: '',pointE: '',
          totaltime:this.state.userTime_oppositesex,
          totalline:this.state.userstrokes_numberops
        });
        this.toggleModalSave()
      }
      else if(this.state.statepic === "Oppositesex"){
        console.log(this.state.statepic+" done");
        const total = this.state.pointHouse+this.state.pointTree+this.state.pointPerson1+point
        this.setState({
          pointPerson2:point,
          sumpoint: total,
          statepic: "finish"
        },()=>{
          console.log(this.state.sumpoint)
          this.savePoint()
        });
      }
  }
  savePoint = () =>{
    console.log("total: "+ this.state.sumpoint)
    const pointUser = []
    pointUser.push({
      pointHouse: this.state.pointHouse,
      pointTree: this.state.pointTree,
      pointPerson1: this.state.pointPerson1,
      pointPerson2: this.state.pointPerson2,
      total: this.state.sumpoint,
      userId:this.state.userId
    })
    localStorage.setItem('pointUser', JSON.stringify(pointUser[0]))
    this.toggleModalFinish()
  }

  back = () =>{
    history.push('/totalreview_htp')
  }

  Notdetect = () =>{
    this.setState(() => ({
      detect:"ตรวจไม่พบ"
    }));
      console.log("can't evaluated")
      const pointUser = []
      pointUser.push({
        pointHouse: "-",
        pointTree: "-",
        pointPerson1: "-",
        pointPerson2: "-",
        total: "-",
        userId:this.state.userId
      })
      localStorage.setItem('pointUser', JSON.stringify(pointUser[0]))
      this.toggleModalFinish()
    
  }
  
  render() {
    return (
      <div >
        <div class="">
          <p id="header">แบบฟอร์มการให้คะแนน</p>
        </div>
        <Container>
        <Row>
          <Col>
            <Button id='font_button' floated='left' onClick={this.back}>กลับหนัาหลัก</Button>
          </Col>
        </Row>
        <br/>
          <Row>
            <Col className="justify-content-center ">
              <Label as='a' basic id="green2">
                <Icon name='user' size="small" />
                ชื่อ : {this.state.userName}
              <Label.Detail>
                อายุ {this.state.userAge } ปี {"\n"}
                เพศ {this.state.userSex==="female"
                  ? "หญิง"
                  : "ชาย"
                  }{"\n"}
                อาชีพ {this.state.userJob}{"\n"}
              </Label.Detail>
              </Label>
            </Col>
           <div className="mt-2 d-flex flex-column  " 
             
          >
            <div className="d-flex justify-content-center "
              style={{
                backgroundColor: '#bee5eb',
              }}
            >
              {this.state.statepic === "House"
              ? <Image
              className="mt-4 mb-4 ml-4 mr-4"
              src={this.state.userImg_house}
              width="492"
              height="299" />
              : this.state.statepic === "Tree"
                ? <Image
                className="mt-4 mb-4 ml-4 mr-4"
                src={this.state.userImg_tree}
                width="364"
                height="427"  />
                : this.state.statepic === "Person"
                  ? <Image
                  className="mt-4 mb-4 ml-4 mr-4"
                  src={this.state.userImg_person}
                  width="364"
                  height="427"  />
                  : <Image
                  className="mt-4 mb-4 ml-4 mr-4"
                  src={this.state.userImg__oppositesex}
                  width="364"
                  height="427"   />
              }
            </div>
            <div className="d-flex justify-content-center ">
              <p id="header">{this.state.statepic}</p>
            </div>
              <div className="d-flex justify-content-center mt-2"> 
              < h2><Badge id="badge" color='info' pill >ระยะเวลา  {this.state.totaltime}</Badge></h2>
              < h2><Badge id="badge" color='info' pill className="ml-2">จำนวนเส้น  {this.state.totalline} เส้น</Badge></h2>
              </div>
            </div>
            <Col className="mt-2">
            <Form id="form" ><Segment id="peach">
              <Form.Field>
               ตรวจพบภาพตรงตามโจทย์ : <b>{this.state.detect}</b>
              </Form.Field>
              <Form.Group inline>
                <Form.Radio
                  label='ตรวจพบ'
                  value='1'
                  name='detect'
                  checked={this.state.detect === 'ตรวจพบ'}
                  onClick={() => this.setState({
                    detect: "ตรวจพบ",
                  })
                  }
                  
                />
                <Form.Radio
                  label='ตรวจไม่พบ'
                  value='0'
                  name='detect'
                  checked={this.state.detect === 'ตรวจไม่พบ'}
                  onClick={() => this.setState({
                    detect: "ตรวจไม่พบ"
                  }),this.Notdetect
                  }
                />
              </Form.Group>
            </Segment>
            <Segment id="green">
              <Form.Field>
                A. ขนาด : <b>{this.state.valueA}</b>
              </Form.Field>
              <Form.Group inline>
                <Form.Radio
                  label='เล็ก'
                  value='-1'
                  name='A'
                  checked={this.state.valueA === 'เล็ก'}
                  onClick={() => this.setState({
                    valueA: "เล็ก",
                    pointA:-1
                    
                  })
                  }
                  
                />
                <Form.Radio
                  label='ปกติ'
                  value='0'
                  name='A'
                  checked={this.state.valueA === 'ปกติ'}
                  onClick={() => this.setState({
                    valueA: 'ปกติ',
                    pointA:0
                  })}
                />
                <Form.Radio
                  label='ใหญ่'
                  value='1'
                  name='A'
                  checked={this.state.valueA === 'ใหญ่'}
                  onClick={() => this.setState({
                    valueA: 'ใหญ่',
                    pointA:1
                  })}
                />
              </Form.Group>
            </Segment>
            <Segment id="green2">
              <Form.Field>
                B. ตำแหน่งของภาพ : <b>{this.state.valueB1}</b> <b>{this.state.valueB2}</b>
              </Form.Field>
              <Form.Group inline>
                <span>
                  แนวตั้ง
                </span>
                <div className='ml-2'>
                  <Table bordered size="xs" >
                    <thead>
                      <tr >
                        <th id="latte">
                          <Form.Radio
                            label='ซ้าย'
                            value='-1'
                            name='B1'
                            checked={this.state.valueB1 === 'ริมซ้าย'}
                            onClick={() => this.setState({
                              valueB1: 'ริมซ้าย',
                              pointB1:-1
                            })}
                          // defaultChecked
                          />
                        </th>
                        <th id="pink">
                          <Form.Radio
                            label='กลาง'
                            value='0'
                            name='B1'
                            checked={this.state.valueB1 === 'ตรงกลาง'}
                            onClick={() => this.setState({
                              valueB1: 'ตรงกลาง',
                              pointB1:0
                            })}
                          />
                        </th>
                        <th id='peach'>
                          <Form.Radio
                            label='ขวา'
                            value='1'
                            name='B1'
                            checked={this.state.valueB1 === 'ริมขวา'}
                            onClick={() => this.setState({
                              valueB1: 'ริมขวา',
                              pointB1:1
                            })}
                          />
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </div>
              </Form.Group>
              <Form.Group inline>
                <span>
                  แนวนอน
                </span>
                <div className="ml-2 w-75 ">
                  <Table bordered size="xs" >
                    <thead>
                      <tr >
                        <th className="d-flex justify-content-center" id="latte">
                        <Form.Radio
                          label='บน'
                          value='-1'
                          name='B2'
                          checked={this.state.valueB2 === 'ด้านบน'}
                          onClick={() => this.setState({
                            valueB2: 'ด้านบน',
                            pointB2:-1
                          })}
                        // defaultChecked
                        />
                        </th>
                      </tr>
                      <tr>
                        <th className="d-flex justify-content-center" id="pink">
                        <Form.Radio
                          label='กลาง'
                          value='0'
                          name='B2'
                          checked={this.state.valueB2 === 'ตรงกลาง'}
                          onClick={() => this.setState({
                            valueB2: 'ตรงกลาง',
                            pointB2:0
                          })}
                        />
                        </th>
                      </tr>
                      <tr>
                        <th className="d-flex justify-content-center" id ="peach">
                        <Form.Radio
                          label='ล่าง'
                          value='1'
                          name='B2'
                          checked={this.state.valueB2 === 'ด้านล่าง'}
                          onClick={() => this.setState({
                            valueB2: 'ด้านล่าง',
                            pointB2:1
                          })}
                        />
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </div>
              </Form.Group>
            </Segment>
            <Segment id="green" >
              <Form.Field>
                C. ระยะเวลาที่ใช้: <b>{this.state.valueC}</b>
              </Form.Field>
              <Form.Group inline>
                <Form.Radio
                  label='น้อย'
                  value='-1'
                  name='C'
                  checked={this.state.valueC === 'น้อย'}
                  onClick={() => this.setState({
                    valueC: 'น้อย',
                    pointC:-1
                  })}
                />
                <Form.Radio
                  label='ปานกลาง'
                  value='0'
                  name='C'
                  checked={this.state.valueC === 'ปานกลาง'}
                  onClick={() => this.setState({
                    valueC: 'ปานกลาง',
                    pointC:0
                  })}
                />
                <Form.Radio
                  label='มาก'
                  value='1'
                  checked={this.state.valueC === 'มาก'}
                  onClick={() => this.setState({
                    valueC: 'มาก',
                    pointC:1
                  })}
                />
              </Form.Group>
            </Segment>
            <Segment id="green2" >
              <Form.Field>
                D. ความต่อเนื่องของเส้น : <b>{this.state.valueD}</b>
              </Form.Field>
              <Form.Group inline>
                <Form.Radio
                  label='น้อย'
                  value='-1'
                  checked={this.state.valueD === 'น้อย'}
                  onClick={() => this.setState({
                    valueD: 'น้อย',
                    pointD:-1
                  })}
                />
                <Form.Radio
                  label='ปานกลาง'
                  value='0'
                  checked={this.state.valueD === 'ปานกลาง'}
                  onClick={() => this.setState({
                    valueD: 'ปานกลาง',
                    pointD:0
                  })}
                />
                <Form.Radio
                  label='ดีมาก'
                  value='1'
                  checked={this.state.valueD === 'ดีมาก'}
                  onClick={() => this.setState({
                    valueD: 'ดีมาก',
                    pointD:1
                  })}
                />
              </Form.Group>
            </Segment>
            <Segment id="green" >
              <Form.Field>
                E. คุณภาพภาพวาดโดยรวม : <b>{this.state.valueE}</b>
              </Form.Field>
              <Form.Group inline>
                <Form.Radio
                  label='น้อย'
                  value='-1'
                  name='D'
                  checked={this.state.valueE === 'น้อย'}
                  onClick={() => this.setState({
                    valueE: 'น้อย',
                    pointE:-1
                  })}
                />
                <Form.Radio
                  label='ปานกลาง'
                  value='0'
                  name='D'
                  checked={this.state.valueE === 'ปานกลาง'}
                  onClick={() => this.setState({
                    valueE: 'ปานกลาง',
                    pointE:0
                  })}
                />
                <Form.Radio
                  label='ดีมาก'
                  value='1'
                  checked={this.state.valueE === 'ดีมาก'}
                  onClick={() => this.setState({
                    valueE: 'ดีมาก',
                    pointE:1
                  })}
                />
              </Form.Group>
            </Segment>
            <div className='d-flex justify-content-center'>
              {this.state.pointA===""||this.state.pointB1 ===""||this.state.pointB2 ===""||this.state.pointC ===""||this.state.pointD  ===""||this.state.pointE ==="" ||this.state.detect ==="" || this.state.detect ==="ตรวจไม่พบ"
                ? <Button
                    className="mt-2 mb-4 "
                    size={30}
                    color="warning"
                    // onClick={this.toggleModalAlert}>
                    disabled
                    >
                    <Save size={15} className="mr-2" />
                    กรุณาให้คะแนนครบทุกช่อง
                  </Button>
                : <Button
                    className="mt-2 mb-4 "
                    size={30}
                    color="info"
                    onClick={this.toggleModalSave}>
                    <Save size={15} className="mr-2" />
                    ถัดไป
                  </Button>
              }
              
            </div>
          </Form>
            </Col>
          </Row>
        </Container>
          <Modal
                isOpen={this.state.modalSave}
                toggle={this.toggleModalSave}
                className={`modal-dialog-centered ${"modal-sm"}`}
                fade={true}
                backdrop={true}
                backdropTransition={true}
              >
              <ModalHeader toggle={this.toggleModalSave}>
                  บันทึกการให้คะแนน
                  </ModalHeader>
                  
                  <ModalBody>
                  คุณต้องการบันทึกใช่หรือไม่?
                  </ModalBody>
                  <ModalFooter>
                      <Button color="info" onClick={this.NextPic}>
                          ตกลง
                      </Button> 
                    {/* {this.state.statepic !== "finish"
                      ? <Button color="info" onClick={this.NextPic}>
                          ตกลง
                        </Button>
                      : <Button color="info" onClick={this.savePoint}>
                          ตกลง
                        </Button> 
                      } */}
                  </ModalFooter>
            </Modal>
            <Modal
                isOpen={this.state.modalfinish}
                toggle={this.toggleModalFinish}
                className={`modal-dialog-centered ${"modal-sm"}`}
                fade={true}
                backdrop={true}
                backdropTransition={true}
              >
              <ModalHeader toggle={this.toggleModalFinish}>
                {this.state.detect == "ตรวจพบ"
                 ? "บันทึกการให้คะแนนสำเร็จ"
                 : "ตรวจไม่พบภาพตามโจทย์" 
                }
                  </ModalHeader>
                  
                  <ModalBody>
                  {this.state.detect == "ตรวจพบ"
                    ? "คุณให้คะแนนเรียบร้อยแล้ว ไปยังหน้าสรุปผล"
                    : "คุณตรวจไม่พบรูปตามโจทย์ใช่หรือไม่"
                  }
                 
                  </ModalBody>
                  <ModalFooter>
                      <Button color="info" href="/result_htp">
                            {this.state.detect == "ตรวจพบ"
                          ? "ตกลง"
                          : "ใช่"
                        }
                        </Button> 
                  </ModalFooter>
            </Modal>
      </div>
    )
  }
}

export default HTP;
