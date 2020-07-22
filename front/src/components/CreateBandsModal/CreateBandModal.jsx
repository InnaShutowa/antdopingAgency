import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';

import axios from 'axios';
import * as css from "./Styles.css";
import ActionTypes from '../../store/Actions/index.js';
import { Redirect } from 'react-router-dom';


class CreateBandModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            sport: ""
        };
    }

    createNewProjectHandler = (name, descr, sport) => {
        axios.post('http://localhost:63761/band',
            {
                apikey: this.props.userReducer.apikey,
                band_name: name,
                description: descr,
                sport: sport
            }).then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    alert("Success!");
                }
            });
    }

    handlerName = (event) => {
        this.setState({ name: event.target.value })
    }

    handlerDescr = (event) => {
        this.setState({ description: event.target.value });
    }

    handlerSport = (event) => {
        this.setState({ sport: event.target.value });
    }


    render() {
        return (
            <Form className="formStyle">
                <Form.Group controlId="email">
                    <Form.Label className="formTitleBold">
                        Создание команды
                            </Form.Label>
                </Form.Group>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="name">
                            <Form.Label>
                                <div className="inline_elements">
                                    <div className="elements">Название</div>
                                    <div style={{ color: "red" }} className="elements">*</div>
                                </div>

                            </Form.Label>
                            <Form.Control onChange={this.handlerName} placeholder="Название команды" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control onChange={this.handlerDescr} placeholder="Описание" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Вид спорта</Form.Label>
                            <Form.Control onChange={this.handlerSport} placeholder="Вид спорта" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => this.createNewProjectHandler(this.state.name, this.state.description, this.state.sport)}
                        variant="outline-dark"
                        type="submit">
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };
}



const mapStateToProps = (state) => ({
    name: state.name,
    description: state.description,
    sport: state.sport,
    userReducer: state.UserReduser
});

export default connect(mapStateToProps, null)(CreateBandModal);