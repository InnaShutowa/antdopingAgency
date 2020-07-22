import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import CreateDopingModal from '../CreateDopingsModal';
import { connect } from 'react-redux';
import ActionTypes from '../../store/Actions/index.js';
import axios from 'axios';
import * as css from "./DopingsStyles.css";
import Moment from 'react-moment';


class Dopings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dopings: [],
            isShow: false,
            isRequested: false
        };
    }

    componentDidMount = () => {
        this.getDopingsListHandler();
    };

    getDopingsListHandler = () => {
        axios.get('http://localhost:63761/doping?apikey='
            + this.props.userReducer.apikey
            + '&user_id=').then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ dopings: response.data.data, isRequested: true });
                }
            });
    }

    setShow = () => {
        this.props.history.push(`/createDopingModal`);
    }


    render() {
        if (this.state.isRequested) {
            return <div className="main_fon">
                <div className="inline_block">
                    <div className="text_title_ag">Зарегистрированные допинги: </div>
                    {
                        this.props.userReducer.is_admin &&
                        <Button className="button_padding"
                            variant="outline-dark"
                            onClick={() => this.setShow()}>
                            Добавить допинг
                            </Button>
                    }

                </div>

                <ListGroup>
                    <ListGroup.Item className="list-group-item list-group-item-primary">
                        <div className="inline_element">DopingId</div>
                        <div className="inline_element">Название допинга</div>
                        <div className="inline_element">Максимально допустимая концентрация</div>
                    </ListGroup.Item>
                    {
                        this.state.dopings.map(pr => (
                            <ListGroup.Item className="list-group-item list-group-item-light">
                                <div className="inline_element">{pr.doping_id}</div>
                                <a className="inline_element" href={"/doping/" + pr.doping_id}>{pr.doping_name}</a>
                                <div className="inline_element">{pr.max_availible_props}</div>
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
    bands: state.Bands,
    userReducer: state.UserReduser,
    isShow: false,
    isRequested: state.Bands ? state.Bands.IsRequested : false
});

export default connect(
    mapStateToProps,
    null
)(Dopings);