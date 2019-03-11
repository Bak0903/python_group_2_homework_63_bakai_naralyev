import React, {Component} from 'react';
import './AllMovies.css';
import GetList from '../../consructors/GetList/GetList';
import axios from 'axios';


class AllMovies extends Component {

    state = {
        allMovies: {},
    };

    getAll = () => {
        axios.get('movies').then(response => {
            const requests = response.data.map(movie => {
                return {
                    id: movie.id,
                    genre: movie.genre,
                    name: movie.name
                };
            });
            return Promise.all(requests);})
            .then(allMovies => {this.setState({allMovies});})
            .catch(error => {console.log(error);});
    };

    purchaseContinueHandler = (pathWord, id) => {
        this.props.history.push({
            pathname: '/' + pathWord + '/' + id
        });

        // this.props.history.push({pathname: '/' + pathWord});
    };


    // getInfo = (code) => {
    //     axios.get('alpha/' + code).then(response => {
    //         const borders = response.data.borders.map(element => {
    //             return axios.get('alpha/' + element).then(response => {
    //                 return response.data;
    //             });
    //         });
    //         return Promise.all(borders)
    //             .then(neighbour => this.setState({
    //                 selectedCountry: response.data,
    //                 borders: [...neighbour]
    //             }));
    //     })
    // };

    componentDidMount() {
        this.getAll();
    }

    render() {
        return (
            <div className={'AllMovies'}>
                <GetList
                    list={this.state.allMovies}
                    click={this.purchaseContinueHandler}
                />
                {/*<Country*/}
                    {/*info={this.state.selectedCountry}*/}
                    {/*borders={this.state.borders}*/}
                    {/*click={this.getInfo}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default AllMovies;