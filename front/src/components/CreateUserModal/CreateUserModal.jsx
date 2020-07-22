import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as css from "./Styles.css";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            birth_date: new Date(),
            is_admin: false,
            blood_resus: 0,
            blood_group: 0
        };
    }

    handlerFirstName = (event) => {
        this.setState({ first_name: event.target.value })
    }

    handlerLastName = (event) => {
        this.setState({ last_name: event.target.value })
    }

    handlerPhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handlerEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlerBirthDate = (event) => {
        this.setState({ birth_date: new Date(event.target.value) })
    }

    handlerIsAdmin = (event) => {
        this.setState({ is_admin: !this.state.is_admin })
    }

    selectHandlerGroupBlood = (event) => {
        let number = 0;
        if (event.target.innerHTML === "1") {
            number = 0;
        } else if (event.target.innerHTML === "2") {
            number = 1;
        } else if (event.target.innerHTML === "3") {
            number = 2;
        } else if (event.target.innerHTML === "4") {
            number = 3;
        }

        this.setState({ taskStatus: number, blood_group: event.target.innerHTML });
    }

    selectHandlerResusBlood = (event) => {
        let number = 0;
        if (event.target.innerHTML === "Отрицательный") {
            number = 0;
        } else if (event.target.innerHTML === "Положительный") {
            number = 1;
        }

        this.setState({ taskStatus: number, blood_resus: event.target.innerHTML });
    }

    handlerSave = () => {
        if (this.state.first_name === null ||
            this.state.first_name === '' ||
            this.state.last_name === null ||
            this.state.last_name === '' ||
            this.state.phone === null ||
            this.state.phone === '' ||
            (this.state.phone.length !== 11 &&
                this.state.phone.length !== 12) ||
            this.state.email === null ||
            this.state.email === '') {
            alert("Некорректные данные!");
        } else {
            axios.post('http://localhost:63761/user',
                {
                    ...this.state,
                    apikey: this.props.userReducer.apikey
                }).then(response => {
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        alert("Внимание! Сохраните пароль для авторизации пользователя: " + response.data.data.password);
                    }
                    this.props.history.push(`/users`);
                });
        }
    }
    render() {

        return (
            <Form className="formStyle">
                <Form.Group controlId="email">
                    <Form.Label className="formTitleBold">РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ</Form.Label>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control onChange={this.handlerFirstName} placeholder="Имя" />
                </Form.Group>


                <Form.Group controlId="email">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control onChange={this.handlerLastName} placeholder="Фамилия" />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.handlerEmail} placeholder="example@example.ru" />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control onChange={this.handlerPhone} placeholder="+8 888 888 88 88" />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="phone">
                            <Form.Label>Группа крови</Form.Label>
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title={this.state.blood_group ? this.state.blood_group : "1"}
                                id="input-group-dropdown-1"

                            >
                                <Dropdown.Item onClick={this.selectHandlerGroupBlood} href="#">1</Dropdown.Item>
                                <Dropdown.Item onClick={this.selectHandlerGroupBlood} href="#">2</Dropdown.Item>
                                <Dropdown.Item onClick={this.selectHandlerGroupBlood} href="#">3</Dropdown.Item>
                                <Dropdown.Item onClick={this.selectHandlerGroupBlood} href="#">4</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="phone">
                            <Form.Label>Резус фактор</Form.Label>
                            <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title={this.state.blood_resus ? this.state.blood_resus : "Отрицательный"}
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={this.selectHandlerResusBlood} href="#">Отрицательный</Dropdown.Item>
                                <Dropdown.Item onClick={this.selectHandlerResusBlood} href="#">Положительный</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="birthday">
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control type="date" onChange={this.handlerBirthDate} placeholder="09.19.1998" />
                </Form.Group>

                <Form.Group controlId="is_admin">
                    <Form.Check
                        onChange={this.handlerIsAdmin}
                        type="checkbox"
                        label="Включить права администратора" />
                </Form.Group> 

                <Button
                    onClick={() => this.handlerSave()}
                    variant="outline-dark"
                    type="submit">
                    Сохранить
                    </Button>
            </Form>
        );
    };
}


const mapStateToProps = (state) => ({
    first_name: state.first_name,
    last_name: state.last_name,
    phone: state.phone,
    email: state.email,
    birth_date: state.birth_date,
    is_admin: state.is_admin,
    userReducer: state.UserReduser,
    blood_group: 1,
    blood_resus: "Отрицательный"
});

export default connect(mapStateToProps, null)(CreateUserModal);