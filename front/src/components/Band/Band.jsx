import React, { useState, Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AddUserInBandModal from '../AddUserInBandModal';
import * as css from "./StylesBand.css";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import projectsActions from '../../store/Actions';
import axios from 'axios';
import { connect } from 'react-redux';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { replaceState, withRouter, pushState } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'

class Band extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersToAdd: [],
            band: {},
            isShowAgain: false,
            isShow: false,
            isRequested: false,
            isShowAddUser: false,
            bandId: Number.parseInt(props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1))
        };
    }

    componentDidMount = () => {
        this.getProjectHandler("", this.state.bandId);
    };

    setShowAgain = (value) => {
        this.setState({ isShowAgain: value });
    }

    setShowAddUser = (value) => {
        this.setState({ isShowAddUser: value });
        this.getUsersListHandler();
    }

    getUsersListHandler = () => {
        axios.get('http://localhost:63761/userInfo?apikey='
            + this.props.userReducer.apikey
            + '&band_id=' + this.state.bandId)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                    this.setShowAddUser(false);
                } else {
                    this.setState({ usersToAdd: response.data.data, isRequested: true });
                }
            });
    }

    getProjectHandler = (apikey, bandId) => {
        axios.get('http://localhost:63761/bandSingle?apikey='
            + this.props.userReducer.apikey
            + '&band_id=' + bandId)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ band: response.data.data, isRequested: true });
                }
            });
    }

    addUserInProjectHandler = (apikey, userId) => {
        axios
            .get('http://localhost:63761/User2Band?apikey='
                + this.props.userReducer.apikey
                + '&user_id='
                + userId + "&band_id="
                + this.state.bandId)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.props.history.push(`/bands`);
                }
            });
    }

    deleteProjectHandler = (bandId) => {
        axios.post('http://localhost:63761/bandSingle',
            {
                apikey: this.props.userReducer.apikey,
                band_id: bandId
            })
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.props.history.push(`/bands`);
                }
            });
    }

    getProjectsListHandler = () => {
        axios.get('http://localhost:57392/project?apikey='
            + this.props.userReducer.apikey).then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    this.setState({ band: response.data.data, isRequested: true });
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
            if (!this.state.band) return <div>Страница не найдена...</div>;

            return <div className="main_fon">
                <div className="inline_block">
                    <div className="title_block">
                        <div className="text_title"> {this.state.band.band_name} </div>
                        <br />
                        <div className="text_author">
                            Создатель: {this.state.band.creater.full_name}
                        </div>
                    </div>
                    <Button onClick={() => this.deleteProjectHandler(this.state.bandId)} className="button_padding" variant="outline-dark">Удалить команду</Button>
                </div>
                <div className="text_description">
                    <b>Вид спорта: </b>{this.state.band.sport}
                </div>

                {
                    this.state.band.users_list.length !== 0 && <div className="users_list">
                        <div className="inline_block_users_title">
                            <div className="title_block">Список участников</div>
                            <Button onClick={() => this.setShowAddUser(true)} className="button_padding" variant="outline-dark">Добавить пользователя</Button>
                        </div>
                        {
                            this.state.band.users_list.map(user => {
                                return <ListGroup.Item className="inline_block_elements">
                                    <a className="inline_block_users" href={"/userPage/" + user.user_id}>
                                        {user.full_name}
                                    </a>
                                    <div className="inline_block_users">{user.email}</div>
                                </ListGroup.Item>;
                            })
                        }
                    </div>
                }

                <AddUserInBandModal show={this.state.isShowAddUser}
                    bandId={this.state.bandId}
                    onHide={() => this.setShowAddUser(false)}
                    onSave={(apikey, userId) => this.addUserInProjectHandler(apikey, userId)}
                    usersToAdd={this.state.usersToAdd}
                />
            </div>;
        } else {
            return <div>Loading...</div>
        }

    }
}

const mapStateToProps = (state) => ({
    userReducer: state.UserReduser,
    band: state.Band,
    isShowAddUser: false,
    isRequested: state.Band ? state.Band.IsRequested : false,
    projectId: 0,
    usersToAdd: [],
    isShowAgain: false
});
export default connect(mapStateToProps, null)(Band);