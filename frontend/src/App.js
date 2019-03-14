import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import AllMovies from './containers/AllMovies/AllMovies';
import SelectedMovie from './containers/SelectedMovie/SelectedMovie';
import ItemAdd from './containers/ItemAdd/ItemAdd';
import EditItem from './containers/EditItem/EditItem';
import AllHalls from './containers/AllHalls/AllHalls';
import SelectedHall from './containers/SelectedHall/SelectedHall';
import Layout from "./Layout";

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/halls/:id" component={SelectedHall}/>
                            <Route path="/halls" exact component={AllHalls}/>
                            <Route path="/movies/:id/edit" component={EditItem}/>
                            <Route path="/movies/add" component={ItemAdd}/>
                            <Route path="/movies/:id" component={SelectedMovie}/>
                            <Route path="/" exact component={AllMovies}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

