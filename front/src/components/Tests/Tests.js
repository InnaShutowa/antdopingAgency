import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import CreateDopingModal from '../CreateDopingsModal';
import { connect } from 'react-redux';
import ActionTypes from '../../store/Actions/index.js';
import axios from 'axios';
import * as css from "./TestsStyles.css";
import Moment from 'react-moment';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';


class Tests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            isShow: false,
            isRequested: false
        };
    }

    componentDidMount = () => {
        this.getTestsListHandler();
    };

    getTestsListHandler = () => {
        axios.get('http://localhost:63761/test?apikey='
            + this.props.userReducer.apikey
            + '&user_id=').then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ tests: response.data.data, isRequested: true });
                }
            });
    }

    createNewTestHandler = (name, descr, maxProp) => {
        axios.post('http://localhost:63761/doping',
            {
                apikey: this.props.userReducer.apikey,
                doping_name: name,
                description: descr,
                max_availible_props: maxProp
            }).then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setShow(false);
                    this.getTestsListHandler();
                }
            });
    }

    setShow = (value) => {
        this.setState({ isShow: value });
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


    render() {
        if (this.state.isRequested) {
            return <div className="main_fon">
                <div className="inline_block">
                    <div className="text_title_ag">Результаты тестирований пользователя: </div>
                </div>

                <ListGroup>
                    <ListGroup.Item className="list-group-item list-group-item-primary">
                        <div className="inline_element">Название допинга</div>
                        <div className="inline_element">Результат тестирования</div>
                        <div className="inline_element">Дата тестирования</div>
                        <div className="inline_element">Окончание периода активности теста</div>
                    </ListGroup.Item>
                    {
                        this.state.tests.map(pr => (
                            <ListGroup.Item className="list-group-item list-group-item-light">
                                <a className="inline_element" href={"/doping/" + pr.doping_id}>{pr.doping_name}</a>
                                <div className="inline_element">{pr.passed ? "TRUE" : "FALSE"}</div>
                                <div className="inline_element">
                                    <Moment format="DD.MM.YYYY">
                                        {
                                            new Date(pr.date_test)
                                        }
                                    </Moment>
                                </div>
                                <div className="inline_element">
                                    <Moment format="DD.MM.YYYY">
                                        {
                                            new Date(pr.date_relevance)
                                        }
                                    </Moment>
                                </div>
                                <div>
                                    <Button onClick={(testId) => this.getFormHandler(pr.test_id)} className="inline_element_button" variant="outline-dark">Получить форму</Button>
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
    tests: state.Tests,
    isShow: false,
    isRequested: state.Tests ? state.Tests.IsRequested : false
});

export default connect(
    mapStateToProps,
    null
)(Tests);