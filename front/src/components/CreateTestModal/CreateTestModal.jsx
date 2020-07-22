import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import axios from 'axios';

import * as css from "./Styles.css";
import ActionTypes from '../../store/Actions/index.js';
import { Redirect } from 'react-router-dom';


class CreateTestModal extends Component {
    constructor(props) {
        console.log(props);
        super(props);

        console.log(props);
        this.state = {
            doping_id: 0,
            user_email: props.user_email,
            found_prop: 0,
            user_id: Number.parseInt(props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1))
        };
    }

    handlerEmail = (event) => {
        this.setState({ user_email: event.target.value })
    }

    handlerIdDoping = (event) => {
        this.setState({ doping_id: Number.parseInt(event.target.value) });
    }

    handlerFoundProp = (event) => {
        console.log(Number.parseFloat(event.target.value));
        this.setState({ found_prop: Number.parseFloat(event.target.value) });
    }

    createNewTestHandler = (date) => {
        axios.post('http://localhost:63761/test', {
            apikey: this.props.userReducer.apikey,
            user_id: this.state.user_id,
            doping_id: date.doping_id,
            found_prop: date.found_prop
        })
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    alert("Success!");
                }
            });
    }

    handlerSave = () => {
        if (this.state.user_email === null
            || this.state.found_prop === null
            || this.state.found_prop === "") {
            alert("Некорректные данные!");
        } else {
            this.createNewTestHandler(this.state);
        }
    }

    render() {
        if (!this.state.user_id) {
            return (<div>Wrong link!</div>);
        } else {
            return (
                <Form className="formStyle">

                    <Form.Group controlId="email">
                        <Form.Label className="formTitleBold">Создание отчета о тестировании</Form.Label>
                    </Form.Group>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>
                                    <div className="inline_elements">
                                        <div className="elements">Id допинга</div>
                                        <div style={{ color: "red" }} className="elements">*</div>
                                    </div>
                                </Form.Label>
                                <Form.Control onChange={this.handlerIdDoping} placeholder="Id допинга" />
                            </Form.Group>

                            <Form.Group controlId="found_prop">
                                <Form.Label>Обнаруженная концентрация</Form.Label>
                                <Form.Control onChange={this.handlerFoundProp} placeholder="Обнаруженная концентрация" />
                            </Form.Group>
                            

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.handlerSave}
                            variant="outline-dark"
                            type="submit">
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Form>
            );
        };
    }

}



const mapStateToProps = (state) => ({
    userReducer: state.UserReduser,
    doping_id: state.doping_id,
    user_email: state.user_email,
    found_prop: state.found_prop,
    date_testing: state.date_testing,
    date_relevance: state.date_relevance,
    userId: state.userId
});

export default connect(mapStateToProps, null)(CreateTestModal);