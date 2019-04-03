import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import MovieAdd from './containers/MovieAdd/MovieAdd';
import EditMovie from './containers/EditMovie/EditMovie';
import AllItems from './containers/AllItems/AllItems';
import HallAdd from './containers/HallAdd/HallAdd';
import HallEdit from './containers/HallEdit/HallEdit';
import Layout from "./Layout";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Register from './containers/Register/Register';
import PersonalPage from './containers/PersonalPage/PersonalPage';
import SelectedItem from "./containers/SelectedItem/SelectedItem";



class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/user" component={PersonalPage}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/logout" component={Logout}/>
                            <AuthRoute path="/halls/add" component={HallAdd}/>
                            <AuthRoute path="/halls/:id/edit" component={HallEdit}/>
                            <Route path="/halls/:id" component={SelectedItem}/>
                            <Route path="/halls" exact component={AllItems}/>
                            <AuthRoute path="/movies/add" component={MovieAdd}/>
                            <AuthRoute path="/movies/:id/edit" component={EditMovie}/>
                            <Route path="/movies/:id" component={SelectedItem}/>
                            <Route path="/" exact component={AllItems}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

