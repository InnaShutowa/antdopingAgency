import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import axios from 'axios';
import * as css from "./Styles.css";
import ActionTypes from '../../store/Actions/index.js';
import { Redirect } from 'react-router-dom';


class CreateDopingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            maxProp: 0,
            monthsTestActive: 0
        };
    }

    
    createNewDopingHandler = (name, descr, maxProp, monthCount) => {
        axios.post('http://localhost:63761/doping',
            {
                apikey: this.props.userReducer.apikey,
                doping_name: name,
                description: descr,
                max_availible_props: maxProp,
                months_test_active: monthCount
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

    handlerMaxProp = (event) => {
        this.setState({ maxProp: Number.parseInt(event.target.value) });
    }

    handlerActiveMonths = (event) => {
        this.setState({ monthsTestActive: Number.parseInt(event.target.value) });
    }

    handlerSave = () => {
        if (this.state.name === null
            || this.state.name === ""
            || this.state.maxProp === null
            || this.state.maxProp === ""
            || this.state.monthsTestActive === null
            || this.state.monthsTestActive === "") {
            alert("Некорректные данные!");
        } else {
            this.createNewDopingHandler(this.state.name,
                this.state.description,
                this.state.maxProp,
                this.state.monthsTestActive);
        }
    }


    render() {
        return (
            <Form className="formStyle">
                <Form.Group controlId="email">
                    <Form.Label className="formTitleBold">
                        Создание допинга
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
                            <Form.Control onChange={this.handlerName} placeholder="Название допинга" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control onChange={this.handlerDescr} placeholder="Описание" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Максимально допустимая концентрация</Form.Label>
                            <Form.Control onChange={this.handlerMaxProp} placeholder="Максимально допустимая концентрация" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Количество месяцев, пока результаты тестирования считаются актуальными</Form.Label>
                            <Form.Control onChange={this.handlerActiveMonths} placeholder="Количество месяцев, пока результаты тестирования считаются актуальными" />
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



const mapStateToProps = (state) => ({
    name: state.name,
    description: state.description,
    maxProp: state.maxProp,
    monthsTestActive: state.monthsTestActive,
    userReducer: state.UserReduser
});

export default connect(mapStateToProps, null)(CreateDopingModal);