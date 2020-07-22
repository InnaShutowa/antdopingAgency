import React, { Component } from 'react';
import * as css from "./Styles.css";
import { connect } from 'react-redux';
import ActionTypes from '../../store/Actions/index.js';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }

    handlerEmail = (event) => {
        this.setState({ login: event.target.value })
    }

    handlerPassword = (event) => {
        this.setState({ password: event.target.value })
    }

    createUserHandler = () => {
        if (this.state.login === null ||
            this.state.login === "" ||
            this.state.password === null ||
            this.state.password === "") {
            alert("Некорректные данные!");
        } else { 
            axios.post('http://localhost:63761/authUser',
                {
                    login: this.state.login,
                    password: this.state.password
                }).then(response => {
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        this.props.saveDataAction(response.data.data);
                        window.location.pathname = "/tests";
                    }
                });
        }
    }

    render() {
        return <div className="form_auth_style"> <Form>
            <Form.Label className="auth_title_style">Авторизация</Form.Label>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.handlerEmail} placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" onChange={this.handlerPassword} placeholder="Пароль" />
            </Form.Group>

        </Form>
            <Button onClick={this.createUserHandler} variant="outline-dark" type="submit">
                Войти
        </Button>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataAction: (data) => {
            dispatch(ActionTypes.Actions.userSaveData(data));
        },
    }
};

const mapStateToProps = (state) => ({
    userReducer: state.UserReduser
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);