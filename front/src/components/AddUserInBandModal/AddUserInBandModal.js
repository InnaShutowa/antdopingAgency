import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { connect } from 'react-redux';


class AddUserInBandModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: props.projectId,
            users: props.usersToAdd,
            userId: 0
        };
    }

    handlerCheckUser(userId) {
        this.setState({userId: userId});
    }


    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить участников
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.usersToAdd.length !== 0 &&
                        this.props.usersToAdd.map(user=>{
                            return <Form.Group controlId="formBasicCheckbox">
                            <Form.Check 
                                onChange={()=>this.handlerCheckUser(user.user_id)} 
                                type="checkbox" label={user.full_name} />
                        </Form.Group>
                        })
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    onClick={()=>this.props.onSave("", this.state.userId)} 
                    variant="outline-dark"
                    type="submit">
                        Выполнить
                    </Button>
                    <Button variant="outline-dark" onClick={this.props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}



const mapStateToProps = (state) => ({
    users: [],
    userId: 0
});

export default connect (mapStateToProps, null) (AddUserInBandModal);