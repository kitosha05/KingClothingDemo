import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import FileUpload from '../../components/FileUpload/FileUpload'
import { checkUserSession } from '../../redux/user/userActions'
import Avatar from '@material-ui/core/Avatar'
import Button from 'react-bootstrap/Button'
import './ProfilePage.scss'

const ProfilePage = ({ currentUser, checkUserSession }) => {
    const { displayName, email, createdAt } = currentUser
    const [showFileInput, setShowFileInput] = useState(false)
    const joinedDate = new Date(createdAt.seconds * 1000)

    return (
        <Container>
            <Col className="col-md-8 offset-md-2 justify-content-center align-items-center">
                <Card className="text-center" style={{ width: '18rem' }}>
                    {currentUser.profileImage ? (
                        <Avatar
                            className="avatar"
                            src={currentUser.profileImage}
                        />
                    ) : (
                        <Avatar
                            className="avatar"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        />
                    )}

                    <Card.Title>{displayName}</Card.Title>
                    <Card.Text>{email} </Card.Text>
                    <Card.Text>Member Since:</Card.Text>
                    <Card.Text>{joinedDate.toDateString()}</Card.Text>
                    <Card.Body>
                        {showFileInput ? (
                            <FileUpload setShowFileInput={setShowFileInput} />
                        ) : (
                            <Button
                                onClick={() => setShowFileInput(true)}
                                variant="outline-info"
                            >
                                Select New Avatar
                            </Button>
                        )}
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Link to="/user/order-history">Order History</Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to="/user/wishlist">Favorites</Link>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Container>
    )
}
const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession()),
})
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
