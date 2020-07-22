import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';


class DeleteConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bandId: props.bandId
        };
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
                        Удаление команды
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="sure">
                            <Form.Label>Вы уверены, что хотите выполнить операцию?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    onClick={()=>this.props.onSave(this.props.bandId)} 
                    variant="primary" 
                    type="submit">
                        Выполнить
                    </Button>
                    <Button onClick={this.props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}



const mapStateToProps = (state) => ({

});

export default connect (mapStateToProps, null) (DeleteConfirmModal);