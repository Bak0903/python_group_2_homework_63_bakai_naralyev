import React, {Component} from 'react';
import './SelectedMovie.css';
import GetItem from '../../consructors/GetItem/GetItem';
import axios from 'axios';


class SelectedMovie extends Component {

    state = {
        selectedMovie: {},
    };

    getMovie = (id) => {
        axios.get('movies/' + id).then(response => {
            return response.data
        }).then(selectedMovie => this.setState({selectedMovie}))
    };

    componentDidMount() {
        this.getMovie(this.props.match.params.id);
    }

    render() {
        return (
            <div className={'SelectedMovie'}>
                <GetItem
                    item = {this.state.selectedMovie}
                />
            </div>
        );
    }
}

export default SelectedMovie;