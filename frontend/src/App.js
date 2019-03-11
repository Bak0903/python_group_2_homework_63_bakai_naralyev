import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import AllMovies from './containers/AllMovies/AllMovies';
import SelectedMovie from './containers/SelectedMovie/SelectedMovie';

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/SelectedMovie/:id" component={SelectedMovie}/>
                        <Route path="/" exact component={AllMovies}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

