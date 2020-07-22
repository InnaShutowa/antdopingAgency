
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import storage from 'redux-persist/lib/storage';

class Header extends Component {

    handlerExit = () => {
        storage.removeItem('persist:sportsmenRoot');
        storage.removeItem('persist:root');
        this.props.history.push(`/`);
    }

    render() {
        return <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">AntidopAgency</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.props.userReduser.is_admin &&
                            <Nav.Link href="/bands">Команды</Nav.Link>
                        }

                        {
                            this.props.userReduser.is_admin &&
                            <Nav.Link href="/users">Спортсмены</Nav.Link>
                        }
                        <Nav.Link href="/dopings">Справочник допингов</Nav.Link>
                        <Nav.Link href="/tests">Тестирования</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/userProfile">Личный кабинет</Nav.Link>
                        <Nav.Link eventKey={2} href="/login" onClick={this.handlerExit}>
                            Выйти
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>;
    }
}

const mapStateToProps = (state) => ({
    userReduser: state.UserReduser
});

export default connect(
    mapStateToProps,
    null)(Header);