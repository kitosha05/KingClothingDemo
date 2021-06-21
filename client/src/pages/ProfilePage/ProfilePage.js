import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import FileUpload from '../../components/FileUpload/FileUpload'
import { checkUserSession } from '../../redux/user/userActions'
import Avatar from '@material-ui/core/Avatar'
import Button from 'react-bootstrap/Button'
import './ProfilePage.scss'

const ProfilePage = ({currentUser, checkUserSession}) =>{
    const {displayName, email} = currentUser
    const [showFileInput, setShowFileInput] = useState(false)
  

    return(
       <Container>
           <Col className='col-md-8 offset-md-2 justify-content-center align-items-center'>
             <Card className="text-center" style={{ width: '18rem' }}>
            {currentUser.profileImage ? <Avatar  className='avatar' src={currentUser.profileImage} /> : ""} 
            {showFileInput ? (<FileUpload setShowFileInput={setShowFileInput}/>)
             : (<Button onClick={()=>setShowFileInput(true)} variant="outline-info">Select New Avatar</Button>)}
            
                 
               
                    <Card.Body>
                         
                         <Card.Text>
                              {email}
                        </Card.Text>
                    </Card.Body>
                 <ListGroup className="list-group-flush">
                     <ListGroupItem><Link to='/user/order-history'>Order History</Link></ListGroupItem>
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
const mapDispatchToProps=dispatch=>({
    checkUserSession: ()=>dispatch(checkUserSession())
})
const mapStateToProps=state=>({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)