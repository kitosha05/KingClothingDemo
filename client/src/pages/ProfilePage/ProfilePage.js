import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import FileUpload from '../../components/FileUpload/FileUpload'
import './ProfilePage.scss'

const ProfilePage = ({currentUser}) =>{
    const {displayName, email} = currentUser
    return(
       <Container>
           <Col className='col-md-8 offset-md-2 justify-content-center align-items-center'>
             <Card style={{ width: '18rem' }}>
                 <FileUpload/>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                    <Card.Body>
                         <Card.Title>{displayName}</Card.Title>
                         <Card.Text>
                              {email}
                        </Card.Text>
                    </Card.Body>
                 <ListGroup className="list-group-flush">
                     <ListGroupItem>Order History</ListGroupItem>
                    <ListGroupItem>Favorites</ListGroupItem>
                </ListGroup>
               <Card.Body>
                 <Card.Link href="#">Card Link</Card.Link>
                 <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
           </Col>
       </Container>
    )
}
const mapStateToProps=state=>({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(ProfilePage)