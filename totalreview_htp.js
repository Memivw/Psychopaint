import React from 'react';
import { Image, Menu, Card, Header, Loader } from 'semantic-ui-react'
import { Col, Row } from 'react-bootstrap'
import '../../../../asset/css/totalreview_CDT.css'
import firebase from '../../../../function/firebaseConfig'
import { history } from '../../../../../src/history'
class TotalReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      user_success: [],
      id_success: [],
      user_unsuccess: [],
      activeItem: 'ทั้งหมด',
      success: 0,
      loading: false,
      total_user: 0,
      strokes_house:0,
      strokes_tree:0,
      strokes_person:0,
      strokes_ops:0,
    }
  }
  componentDidMount() {
    console.log(this.state.user_success)
    const username = localStorage.getItem('username')
    this.getSuccess(username)
  }

  getSuccess = (username) => {
    const setUser = []
    let getUser = firebase.database().ref().child("userPsychologist").child(username).child("label_htp")
    getUser.on('value', snapshot => {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        setUser.push(key)
      });
      this.getData(setUser)
    })
  }
  getStrokes = (user) =>{
    let getHouse = firebase.database().ref().child("RewriteHTP").child(user).child("drawing_info/house/strokes")
    getHouse.on('value', snapshot => {
      this.setState({
        strokes_house: snapshot.numChildren()
      })
    })
    let getTree = firebase.database().ref().child("RewriteHTP").child(user).child("drawing_info/tree/strokes")
    getTree.on('value', snapshot => {
      this.setState({
        strokes_tree: snapshot.numChildren()
      })
    })
    let getPerson = firebase.database().ref().child("RewriteHTP").child(user).child("drawing_info/person/strokes")
    getPerson.on('value', snapshot => {
      this.setState({
        strokes_person: snapshot.numChildren()
      })
    })
    let getOps = firebase.database().ref().child("RewriteHTP").child(user).child("drawing_info/oppositesex/strokes")
    getOps.on('value', snapshot => {
      this.setState({
        strokes_ops: snapshot.numChildren()
      })
    })
  

  }
  
  getData = (setSuccess) => {
    let getInfo = firebase.database().ref().child("RewriteHTP")
    getInfo.on('value', snapshot => {
      var data = snapshot.val();
      this.setState({
        total_user: snapshot.numChildren()
      }) 
      // console.log("data: ", data)
      // console.log("length: ",snapshot.numChildren())

      for (let item in data) {
        for (let i = 0; i < setSuccess.length; i++) {
          console.log(item)
          console.log(setSuccess[i])
          if (item === setSuccess[i]) {
            // console.log("success",setSuccess[i])
            this.getStrokes(item)
            this.setState({ success: 1 })
            this.state.user_success.push({
              user_id: item,
              age: data[item].personal_info.age,
              education: data[item].personal_info.education,
              job: data[item].personal_info.job,
              sex: data[item].personal_info.sex,
              name:data[item].personal_info.name,
              image_house: data[item].drawing_info.house.url,
              image_tree: data[item].drawing_info.tree.url,
              image_person: data[item].drawing_info.person.url,
              image_oppositesex: data[item].drawing_info.oppositesex.url,
              time_house: data[item].drawing_info.house.time_start_drawing,
              time_housestart: data[item].drawing_info.house.time_start_drawing,
              time_houseend: data[item].drawing_info.house.time_end_drawing,
              time_treestart: data[item].drawing_info.tree.time_start_drawing,
              time_treeend: data[item].drawing_info.tree.time_end_drawing,
              time_personstart: data[item].drawing_info.person.time_start_drawing,
              time_personend: data[item].drawing_info.person.time_end_drawing,
              time_oppositesexstart: data[item].drawing_info.oppositesex.time_start_drawing,
              time_oppositesexend: data[item].drawing_info.oppositesex.time_end_drawing,
              strokes_numberhouse:this.state.strokes_house,
              strokes_numbertree:this.state.strokes_tree,
              strokes_numberperson:this.state.strokes_person,
              strokes_numberops:this.state.strokes_ops,
              status: "done",
              person: data[item].label_info.person
            })
          }
        }
        if (this.state.success != 1) {
          // console.log("unsuccess",item)
          this.getStrokes(item)
          this.state.user_unsuccess.push({
            user_id: item,
            age: data[item].personal_info.age,
            education: data[item].personal_info.education,
            job: data[item].personal_info.job,
            sex: data[item].personal_info.sex,
            name:data[item].personal_info.name,
            image_house: data[item].drawing_info.house.url,
            image_tree: data[item].drawing_info.tree.url,
            image_person: data[item].drawing_info.person.url,
            image_oppositesex: data[item].drawing_info.oppositesex.url,
            time_housestart: data[item].drawing_info.house.time_start_drawing,
            time_houseend: data[item].drawing_info.house.time_end_drawing,
            time_house: data[item].drawing_info.house.time_start_drawing,
            time_treestart: data[item].drawing_info.tree.time_start_drawing,
            time_treeend: data[item].drawing_info.tree.time_end_drawing,
            time_personstart: data[item].drawing_info.person.time_start_drawing,
            time_personend: data[item].drawing_info.person.time_end_drawing,
            time_oppositesexstart: data[item].drawing_info.oppositesex.time_start_drawing,
            time_oppositesexend: data[item].drawing_info.oppositesex.time_end_drawing,
            strokes_numberhouse:this.state.strokes_house,
            strokes_numbertree:this.state.strokes_tree,
            strokes_numberperson:this.state.strokes_person,
            strokes_numberops:this.state.strokes_ops,
            status: "not done",
            person: data[item].label_info.person
          })
        }
        this.setState({ success: 0 })


      }
      this.setState({ loading: true })
    })
  }
  selectUser = (index, status) => {
    console.log(index, status)
    const infoUser = []
    if (status == "unsuccess") {
      infoUser.push(this.state.user_unsuccess[index])
      localStorage.setItem('selectUser', JSON.stringify(infoUser[0]))
      history.push('/htp', infoUser)
    } else if (status == "success") {
      infoUser.push(this.state.user_success[index])
      localStorage.setItem('selectUser', JSON.stringify(infoUser[0]))
      history.push('/result_htp', infoUser)
    }
    
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state.activeItem
    return (
      <div>
       <Menu id="menu" size="massive" text>
            <Menu.Item header>ประเภท : </Menu.Item>
            <Menu.Item
              name='ทั้งหมด'
              active={this.state.activeItem === 'ทั้งหมด'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='ประเมินแล้ว'
              active={this.state.activeItem === 'ประเมินแล้ว'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='ยังไม่ได้ประเมิน'
              active={this.state.activeItem === 'ยังไม่ได้ประเมิน'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right' id="menu_right">
              <Menu.Item
                name={this.state.total_user != 0 ?'จำนวนทั้งหมด '+this.state.total_user : null}
                disabled={true}
              />
            </Menu.Menu>
        </Menu>
        {
          this.state.loading == false &&  (
            <Loader active inline='centered'>กำลังโหลดข้อมูล</Loader>
          )
        }
        {this.state.loading == true &&
          (this.state.activeItem == 'ทั้งหมด' ?
            (<Card.Group id="gridcdt">
              {this.state.user_unsuccess.map((user_unsuccess, i) =>
                <Card fluid key={i}>
                  <Card.Content onClick={() => this.selectUser(i, "unsuccess")}>
                    <Image
                      floated='left'
                      size='mini'
                      src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                    />
                    <Row>
                      <Col>
                        <Card.Header>{user_unsuccess.user_id}</Card.Header>
                        <Card.Meta>{user_unsuccess.name}</Card.Meta>
                        <Card.Meta>อายุ {user_unsuccess.age} ปี</Card.Meta></Col>
                      <Col md={{ span: 3, offset: 2 }}>
                        {
                          user_unsuccess.status == "not done" ?
                            <p className="text-danger" >ยังไม่ได้ประเมิน</p> :
                            user_unsuccess.status == "done" ?
                              <p className="text-success" >ประเมินเสร็จแล้ว</p> : null
                        }
                        <p className="text-dark">ประเมินแล้ว {user_unsuccess.person} คน</p>
                      </Col>
                    </Row>
                  </Card.Content>
                </Card>
              )}
              {this.state.user_success.map((user_success, i) =>
                <Card fluid key={i}>
                  <Card.Content onClick={() => this.selectUser(i, "success")}>
                    <Image
                      floated='left'
                      size='mini'
                      src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                    />
                    <Row>
                      <Col>
                        <Card.Header>{user_success.user_id}</Card.Header>
                        <Card.Meta>{user_success.name}</Card.Meta>
                        <Card.Meta>อายุ {user_success.age} ปี</Card.Meta></Col>
                      <Col md={{ span: 3, offset: 2 }}>
                        {
                          user_success.status == "not done" ?
                            <p className="text-danger" >ยังไม่ได้ประเมิน</p> :
                            user_success.status == "done" ?
                              <p className="text-success" >ประเมินเสร็จแล้ว</p> : null
                        }
                        <p className="text-dark">ประเมินแล้ว {user_success.person} คน</p>
                      </Col>
                    </Row>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>)
            : this.state.activeItem == "ประเมินแล้ว" ?
              (<Card.Group id="gridcdt">
                {this.state.user_success.map((user_success, i) =>
                  <Card fluid key={i}>
                    <Card.Content onClick={() => this.selectUser(i, "success")}>
                      <Image
                        floated='left'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                      />
                      <Row>
                        <Col>
                          <Card.Header>{user_success.user_id}</Card.Header>
                          <Card.Meta>{user_success.name}</Card.Meta>
                          <Card.Meta>อายุ {user_success.age} ปี</Card.Meta></Col>
                        <Col md={{ span: 3, offset: 2 }}>
                          {
                            user_success.status == "not done" ?
                              <p className="text-danger" >ยังไม่ได้ประเมิน</p> :
                              user_success.status == "done" ?
                                <p className="text-success" >ประเมินเสร็จแล้ว</p> : null
                          }
                          <p className="text-dark">ประเมินแล้ว {user_success.person} คน</p>
                        </Col>
                      </Row>
                    </Card.Content>
                  </Card>
                )}
              </Card.Group>)
              : this.state.activeItem == "ยังไม่ได้ประเมิน" ?
                (<Card.Group id="gridcdt">
                  {this.state.user_unsuccess.map((user_unsuccess, i) =>
                    <Card fluid key={i}>
                      <Card.Content onClick={() => this.selectUser(i, "unsuccess")}>
                        <Image
                          floated='left'
                          size='mini'
                          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        />
                        <Row>
                          <Col>
                            <Card.Header>{user_unsuccess.user_id}</Card.Header>
                            <Card.Meta>{user_unsuccess.name}</Card.Meta>
                            <Card.Meta>อายุ {user_unsuccess.age} ปี</Card.Meta></Col>
                          <Col md={{ span: 3, offset: 2 }}>
                            {
                              user_unsuccess.status == "not done" ?
                                <p className="text-danger" >ยังไม่ได้ประเมิน</p> :
                                user_unsuccess.status == "done" ?
                                  <p className="text-success" >ประเมินเสร็จแล้ว</p> : null
                            }
                            <p className="text-dark">ประเมินแล้ว {user_unsuccess.person} คน</p>
                          </Col>
                        </Row>
                      </Card.Content>
                    </Card>
                  )}
                </Card.Group>)
                : null)
        }
      </div>
    )
  }
}

export default TotalReview;