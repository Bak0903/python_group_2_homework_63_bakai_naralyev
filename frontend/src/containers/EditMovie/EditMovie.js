import React, {Component} from 'react'
import axios from "axios";
import MovieForm from "../../components/MovieForm/MovieForm";


class EditMovie extends Component {
    state = {
        movie: null,
        alert: null,
    };

    componentDidMount() {
        axios.get('movies/' + this.props.match.params.id)
            .then(response => {
                const movie = response.data;
                console.log(movie);
                this.setState(prevState => {
                    const newState = {...prevState};
                    newState.movie = movie;
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
            });
    }

    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Movie was not added!`};
            return newState;
        });
    };

    gatherFormData = (movie) => {
        let formData = new FormData();
        Object.keys(movie).forEach(key => {
            const value = movie[key];
            if (value) {
                if(Array.isArray(value)) {
                    value.forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    };

    formSubmitted = (movie) => {
        const formData = this.gatherFormData(movie);
        return axios.put('movies/' + this.props.match.params.id + '/', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => {
                const movie = response.data;
                console.log(movie);
                this.props.history.replace('/movies/' + movie.id);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.showErrorAlert(error.response);
            });
    };

    render() {
        const {alert, movie} = this.state;
        return <div>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <MovieForm onSubmit={this.formSubmitted} movie={movie}/>
        </div>
    }
}


export default EditMovie;