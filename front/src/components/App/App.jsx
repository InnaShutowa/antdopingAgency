import React from 'react';
import './Styles.css';
import { createStore } from "redux";
import Provider from "react-redux/es/components/Provider";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../Header";
import CommonStore from "../../store/Reducers"
import Login from '../Login';
import Main from '../Main';
import Users from '../Users';
import UserPage from '../UserPage';
import Bands from '../Bands';
import UserProfile from '../UserProfile';
import Band from '../Band';
import Dopings from '../Dopings';
import Doping from '../Doping/Doping';
import Tests from '../Tests';
import CreateUserModal from '../CreateUserModal';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import CreateBandModal from '../CreateBandsModal';
import CreateDopingModal from '../CreateDopingsModal';

const App = () => {



  var stor = localStorage.getItem('persist:sportsmenRoot');
  const persistor = persistStore(CommonStore);

  const decoded = JSON.parse(stor);

  console.log(decoded);
  let header = <Route exact path={""} component={Login} />;
  let users = <Route exact path={""} component={Main} />;
  let userPage = <Route exact path={""} component={Main} />;
  let userProfile = <Route exact path={""} component={Main} />;
  let band = <Route exact path={""} component={Main} />;
  let bands = <Route exact path={""} component={Main} />;
  let dopings = <Route exact path={""} component={Main} />;
  let doping = <Route exact path={""} component={Main} />;
  let tests = <Route exact path={""} component={Main} />;
  let userCreate = <Route exact path={""} component={Main} />;
  let testCreate = <Route exact path={""} component={Main} />;
  let bandCreate = <Route exact path={""} component={Main} />;
  let dopingCreate = <Route exact path={""} component={Main} />;

  if (decoded && decoded.apikey) {

    header = <Route exact path={""} component={Header} />;
    userProfile = <Route exact path={"/userProfile"} component={UserProfile} />;
    band = <Route path={"/band/"} component={Band} />;
    dopings = <Route path={"/dopings"} component={Dopings} />;
    doping = <Route path={"/doping/"} component={Doping} />;
    tests = <Route path={"/tests/"} component={Tests} />;

    console.log(decoded);
    if (decoded.is_admin) {
      users = <Route exact path={"/users"} component={Users} />;
      userPage = <Route path={"/userPage"} component={UserPage} />;
      bands = <Route exact path={"/bands"} component={Bands} />;
      userCreate = <Route exact path={"/createUserModal"} component={CreateUserModal} />;
      testCreate = <Route path={"/createTestModal"} component={CreateTestModal} />;
      bandCreate = <Route exact path={"/createBandModal"} component={CreateBandModal} />;
      dopingCreate = <Route exact path={"/createDopingModal"} component={CreateDopingModal} />;
    }
  }

  return <body className="back">
    <Provider store={CommonStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div>
            {header}
            {userPage}
            {band}
            {users}
            {bands}
            {userProfile}
            {dopings}
            {doping}
            {tests}
            {userCreate}
            {testCreate}
            {bandCreate}
            {dopingCreate}
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </body>;
};

export default App;
