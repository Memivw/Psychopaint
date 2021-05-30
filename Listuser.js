import React, { Component } from 'react';
import { Image, Divider, Form, Checkbox, Icon, Menu, Grid, Card } from 'semantic-ui-react'
import { Col, Row, Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import '../../../../asset/css/totalreview_CDT.css'
import { db } from '../../../../function/firebaseConfig'
class Listuser extends React.Component {
  render() {
    // const {userinfo} = this.props
    return (
        <div>
            {this.props.userinfo.map((userinfo, i) => (
                <Card.Group id="gridcdt" key={i}>
                    <Card fluid >
                        <Card.Content onclick={this.props.userinfo} >
                            <Image
                                floated='left'
                                size='mini'
                                src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                            />
                            <Row>
                                <Col>
                                    <Card.Header>{userinfo.user_id}</Card.Header>
                                    <Card.Meta>อายุ {userinfo.age} ปี</Card.Meta></Col>
                                <Col md={{ span: 2, offset: 1 }}>
                                    <p className="text-danger" >ยังไม่ได้ประเมิน</p>
                                    <p className="text-dark">ประเมินแล้ว 5 คน</p>
                                </Col>
                            </Row>
                        </Card.Content>
                    </Card>
                </Card.Group>
            ))}
        </div>    
    )
  }
}

export default Listuser;