import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DeleteConfirmModal from '../DeleteConfirmModal';
import * as css from "./StylesUserPage.css";
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';


class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                is_admin: '',
                birth_date: new Date()
            },
            isRequested: false,
            isShow: false,
            isShowAddTest: false,
            userId: Number.parseInt(props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1))
        };
    }

    componentDidMount = () => {
        this.getUserInfoHandler("");
    };

    getUserInfoHandler = (apikey) => {
        axios.get('http://localhost:63761/userSingle?apikey='
            + this.props.userReducer.apikey
            + '&user_id='
            + this.state.userId)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ user: response.data.data, isRequested: true });
                }
            });
    }

    setShow = (value) => {
        this.setState({ isShow: value });
    }

    setShowAddTest = () => { 
        this.props.history.push(`/createTestModal/`+this.state.user.user_id);
    }

    deleteUserHandler = (userId) => {
        axios.post('http://localhost:63761/userSingle', {
            apikey: this.props.userReducer.apikey,
            user_id: userId
        })
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.props.history.push(`/users`);
                }
            });
    }

    CellTaskIdFormatter = (cell, row) => {
        return (<div><a href={"/band/" + row.band_id}>{cell}</a></div>);
    }

    CellFormatter = (cell, row) => {
        return (<div>
            <Moment format="DD.MM.YYYY">
                {
                    new Date(cell)
                }
            </Moment>
        </div>);
    }
    CellFormatterTrueFalse = (cell, row) => {
        if (cell) {
            return (<div>
                True
                </div>);
        } else {
            return (<div>
                False
                </div>);
        }

    }

    
    getFormHandler = (testId) => {
        axios.get('http://localhost:63761/form?apikey='
            + this.props.userReducer.apikey
            + '&test_id=' + testId).then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    let filename = "antidop_form_report.pdf";

                    var pdf = new jsPDF();
                    pdf.text(10, 10, response.data);
                    pdf.setFont("times");
                    pdf.setFontType("bold");
                    pdf.setFontSize(9);
                    pdf.save(filename);
                }
            });
    }

    CellFormatterButton = (cell, row) => {
        
        return <Button className="table_button_cell" 
        onClick={() => this.getFormHandler(cell)} variant="outline-dark"> Отчет </Button>
    }


    render() {
        console.log(this.state.user);
        if (this.state.isRequested) {
            return <div className="main_fon">
                <div className="inline">
                    <div className="headingPage">
                        Информация о пользователе
                    </div>
                    <Button className="lineValueButton" onClick={() => this.deleteUserHandler(this.state.userId)} variant="outline-dark" type="submit">
                        Удалить
                    </Button>
                </div>
                <div className="form_class">
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
                </div>

                <div className="inline_block_users_title">
                    Команды пользователя
                </div>
                <div className="text_description">
                    <BootstrapTable data={this.state.user.bands_list} striped hover>
                        <TableHeaderColumn isKey dataField='band_name' dataFormat={this.CellTaskIdFormatter}>Название команды</TableHeaderColumn>
                        <TableHeaderColumn dataField='count_users' >Количество участников</TableHeaderColumn>
                        <TableHeaderColumn dataField='creater_full_name'>Капитан</TableHeaderColumn>
                        <TableHeaderColumn dataField='sport'>Вид спорта</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                <div className="inline_block_users_title">
                    <div className="lineValue">Отчеты о тестированиях пользователя</div>
                    <Button className="lineValueButtonSec" onClick={() => this.setShowAddTest(true)} variant="outline-dark" type="submit">
                        Добавить отчет
                    </Button>
                </div>
                <div className="inline_block_users_title">
                    <BootstrapTable data={this.state.user.tests_list} striped hover>
                        <TableHeaderColumn isKey dataField='test_id'>Id тестирования</TableHeaderColumn>
                        <TableHeaderColumn dataField='doping_name'>Название допинга</TableHeaderColumn>
                        <TableHeaderColumn dataField='date_test' dataFormat={this.CellFormatter}>Дата прохождения</TableHeaderColumn>
                        <TableHeaderColumn dataField='passed' dataFormat={this.CellFormatterTrueFalse}>Результат</TableHeaderColumn>
                        <TableHeaderColumn dataField='test_id' dataFormat={this.CellFormatterButton}></TableHeaderColumn>
                    </BootstrapTable>
                </div>

            </div>;

        } else {
            return <div>Loading...</div>
        }
    };
}

const mapStateToProps = (state) => ({
    userReducer: state.UserReduser,
    user: state.User,
    userId: 0,
    isShow: false,
    isShowAddTest: false
});

export default connect(
    mapStateToProps,
    null
)(UserPage);