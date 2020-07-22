import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import * as css from "./Styles.css";
import CreateUserModal from '../CreateUserModal';
import { connect } from 'react-redux';
import ActionTypes from '../../store/Actions/index.js';
import axios from 'axios';
import { saveAs } from 'file-saver';


const users = [
    {
        id: 1,
        firstName: "Inna",
        lastName: "Shutova",
        dateRegistration: "12.12.12",
        countActiveTasks: 19,
        email: "i.schutova@nordclan.com"
    },
    {
        id: 2,
        firstName: "Natalia",
        lastName: "Myasnikova",
        dateRegistration: "12.12.12",
        countActiveTasks: 19,
        email: "natali@nordclan.com"
    }
];

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isShow: false,
            isRequested: false
        };
    }

    componentDidMount = () => {
        this.getUsersListHandler("");
    };

    getUsersListHandler = (apikey) => {
        axios.get('http://localhost:63761/user?apikey=' + this.props.userReducer.apikey).then(response => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                this.setState({ users: response.data.data, isRequested: true });
            }

        });
    }

    getCsvHandler = () => {
        axios.get('http://localhost:63761/statistic?apikey=' + this.props.userReducer.apikey)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    let filename = "test_report.xls";

                    let url = window.URL
                        .createObjectURL(new Blob([response.data]));
                    saveAs(url, filename);
                }
            });
    }

    setShow = (value) => {
        this.props.history.push(`/createUserModal`);
    }

    render() {
        if (this.state.isRequested) {
            return <div className="main_fon">
                <div className="inline_block_common">
                    <div className="inline_block">
                        <div className="text_title">Пользователи: </div>
                        <Button className="button_padding" variant="outline-dark" onClick={() => this.getCsvHandler()}>Выгрузить статистику</Button>
                        <Button className="button_padding_1" variant="outline-dark" onClick={() => this.setShow(true)}>Добавить пользователя</Button>
                    </div>
                </div>


                <ListGroup>
                    <ListGroup.Item className="list-group-item list-group-item-primary">
                        <div className="inline_element">Имя</div>
                        <div className="inline_element_email">Email</div>
                        <div className="inline_element">Роль</div>
                        <div className="inline_element">Наличие допинга</div>
                    </ListGroup.Item>
                    {
                        this.state.users.map(usr => (
                            <ListGroup.Item className="list-group-item list-group-item-light">
                                <a className="inline_element" href={"/userPage/" + usr.user_id}>{usr.full_name}</a>
                                <div className="inline_element_email">{usr.email}</div>
                                <div className="inline_element">{usr.is_admin ? "ADMIN" : "USER"}</div>
                                <div className="inline_element">
                                    {usr.is_any_failed_test && !usr.is_admin ? "YES" : "NO"}
                                </div>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>;
        } else {
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => ({
    userReducer: state.UserReduser,
    user: state.Users,
    isShow: false,
    isRequested: state.Users ? state.Users.IsRequested : false
});

export default connect(
    mapStateToProps,
    null
)(Users);