import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import AllMovies from './containers/AllMovies/AllMovies';
import SelectedMovie from './containers/SelectedMovie/SelectedMovie';
import ItemAdd from './containers/ItemAdd/ItemAdd';
import EditItem from './containers/EditItem/EditItem';

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/movies/:id/edit" component={EditItem}/>
                        <Route path="/movies/add" component={ItemAdd}/>
                        <Route path="/movies/:id" component={SelectedMovie}/>
                        <Route path="/" exact component={AllMovies}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

