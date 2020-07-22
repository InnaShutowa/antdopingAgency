import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import CreateBandModal from '../CreateBandsModal';
import { connect } from 'react-redux';
import ActionTypes from '../../store/Actions/index.js';
import axios from 'axios';
import * as css from "./BandsStyles.css";
import Moment from 'react-moment';


class Bands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bands: [],
            isShow: false,
            isRequested: false
        };
    }

    componentDidMount = () => {
        this.getProjectsListHandler();
    };

    getProjectsListHandler = () => {

        console.log(this.props);
        axios.get('http://localhost:63761/band?apikey='+ this.props.userReducer.apikey+'&user_id=').then(response => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                this.setState({ bands: response.data.data, isRequested: true });
            }
        });
    }

    setShow = (value) => {
        this.props.history.push(`/createBandModal`);
    }


    render() {
        if (this.state.isRequested) {
            return <div className="main_fon">
                <div className="inline_block">
                    <div className="text_title_ag">Ваши команды: </div>
                    <Button className="button_padding" variant="outline-dark" 
                    onClick={() => this.setShow(true)}>Создать команду</Button>
                </div>

                <ListGroup>
                    <ListGroup.Item className="list-group-item list-group-item-primary">
                        <div className="inline_element">Название команды</div>
                        <div className="inline_element">Дата создания</div>
                        <div className="inline_element">Количество пользователей</div>
                        <div className="inline_element">Создатель</div>
                    </ListGroup.Item>
                    {
                        this.state.bands.map(pr => (
                            <ListGroup.Item className="list-group-item list-group-item-light">
                                <a className="inline_element" href={"/band/" + pr.band_id}>{pr.band_name}</a>
                                <div className="inline_element">
                                    <Moment format="DD.MM.YYYY">
                                        {
                                            new Date(pr.create_date)
                                        }
                                    </Moment>
                                </div>
                                <div className="inline_element">{pr.users_list.length}</div>
                                <a className="inline_element" href={"/userPage/" + pr.creater.user_id}>{pr.creater.full_name}</a>
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
    bands: state.Bands,
    isShow: false,
    isRequested: state.Bands ? state.Bands.IsRequested : false
});

export default connect(
    mapStateToProps,
    null
)(Bands);