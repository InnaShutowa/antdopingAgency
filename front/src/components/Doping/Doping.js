import React, { useState, Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AddUserInBandModal from '../AddUserInBandModal';
import * as css from "./DopingStyles.css";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import projectsActions from '../../store/Actions';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { replaceState, withRouter, pushState } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'

class Doping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersToAdd: [],
            doping: {},
            isShowAgain: false,
            isShow: false,
            isRequested: false,
            isShowAddUser: false,
            dopingId: Number.parseInt(props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1))
        };
    }

    componentDidMount = () => {
        this.getDopingHandler(this.state.dopingId);
    };

    setShowAgain = (value) => {
        this.setState({ isShowAgain: value });
    }

    setShowAddUser = (value) => {
        this.setState({ isShowAddUser: value });
        this.getUsersListHandler();
    }

    getDopingHandler = (dopingId) => {
        axios.get('http://localhost:63761/dopingSingle?apikey='
            + this.props.userReducer.apikey
            + '&doping_id=' + dopingId)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ doping: response.data.data, isRequested: true });
                }
            });
    }

    deleteDopingHandler = (dopingId) => {
        axios.post('http://localhost:63761/dopingSingle',
            {
                apikey: this.props.userReducer.apikey,
                doping_id: dopingId
            })
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.props.history.push(`/dopings`);
                }
            });
    }

    CellFormatter = (cell, row) => {
        return (<div><a href={"/task/" + cell}>{cell}</a></div>);
    }

    CellUserFormatter = (cell, row) => {
        return (<div><a href={"/userPage/" + row.user_id}>{cell}</a></div>);
    }

    render() {
        if (this.state.isRequested) {
            if (!this.state.doping) return <div>Страница не найдена...</div>;

            return <div className="main_fon">
                <div className="inline_block">
                    <div className="title_block">
                        <div className="text_title">  </div>
                        <br />
                        <div className="text_author">
                            <div className="text_title"> {this.state.doping.doping_name} </div>
                        </div>
                    </div>
                    {
                        this.props.userReducer.is_admin &&
                        <Button onClick={() => this.deleteDopingHandler(this.state.doping.doping_id)} className="button_padding" variant="outline-dark">Удалить допинг</Button>
                    }

                </div>

                <div className="text_description">
                    <b>DopingId: </b>{this.state.doping.doping_id}
                </div>

                <div className="text_description">
                    <b>Описание: </b>{this.state.doping.description}
                </div>

                <div className="text_description">
                    <b>Активность: </b>{this.state.doping.is_active ? "true" : "false"}
                </div>

                <div className="text_description">
                    <b>Максимально допустимая концентрация: </b>{this.state.doping.max_availible_props}
                </div>

            </div>;
        } else {
            return <div>Loading...</div>
        }

    }
}

const mapStateToProps = (state) => ({
    userReducer: state.UserReduser,
    doping: state.Band,
    isShowAddUser: false,
    isRequested: state.Band ? state.Band.IsRequested : false,
    dopingId: 0,
    isShowAgain: false
});
export default connect(mapStateToProps, null)(Doping);