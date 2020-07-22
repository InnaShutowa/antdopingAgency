import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as css from "./Styles.css";
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                is_admin: '',
                birth_date: new Date()
            },
            isRequested: false
        };
    }

    componentDidMount = () => {
        this.getUserInfoHandler();
    };

    getUserInfoHandler = () => {
        axios.get('http://localhost:63761/userSingle?apikey='
            + this.props.userReducer.apikey
            + '&user_id=0')
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ user: response.data.data, isRequested: true });
                }
            });
    }
    render() {
        if (this.state.isRequested) {
            return <div className="main">
                <div className="heading">
                    Личный кабинет
            </div>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Имя
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.first_name
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Фамилия
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.last_name
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Номер телефона
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.phone
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Email
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.email
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Дата рождения
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                <Moment format="DD.MM.YYYY">
                                    {
                                        new Date(this.state.user.birth_date)
                                    }
                                </Moment>
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Роль
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.is_admin ? "ADMIN" : "USER"
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Группа крови
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.blood_group
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label className="boldLineHead" column sm={2}>
                            Резус фактор
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Label column sm={2}>
                                {
                                    this.state.user.blood_resus
                                }
                            </Form.Label>
                        </Col>
                    </Form.Group>
                </Form>
            </div>;
        } else {
            return <div>Loading...</div>
        }
    };
}

const mapStateToProps = (state) => ({
    userReducer: state.UserReduser,
    user: state.User
});

export default connect(
    mapStateToProps,
    null
)(UserProfile);