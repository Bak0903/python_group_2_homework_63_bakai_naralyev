import React, {Component} from 'react';
import axios from 'axios';


class ItemAdd extends Component {
    state = {
        movie: {
            name: "",
            genre: [],
            description: "",
            poster: null,
            release_date: null,
            finish_date: null
        },
        fileName: "",
        categories: [],
        alert: null,
        submitDisabled: false
    };

    componentDidMount() {
    axios.get('categories/')
        .then(response => {console.log(response.data); return response.data})
        .then(categories => this.setState(prevState => {
            let newState = {...prevState};
            newState.categories = categories;
            return newState;
        }))
        .catch(error => console.log(error));
    }


    updateMovieState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let movie = {...prevState.movie};
            movie[fieldName] = value;
            newState.movie= movie;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateMovieState(fieldName, value);
    };

    selectChanged = (event) => {
        const value = [];
        const fieldName = event.target.name;
        const options = event.target.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) value.push(+options[i].value);
        }
        console.log(value);
        this.updateMovieState(fieldName, value);
    };

    fileChanged = (event) => {
        const fileName = event.target.value;
        const fieldName = event.target.name;
        const fileObject = event.target.files.length > 0 ? event.target.files[0] : null;
        this.updateMovieState(fieldName, fileObject);
        this.setState(prevState => {
            let newState = {...prevState};
            newState.fileName = fileName;
            return newState;
        });
    };

    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        let formData = new FormData();
        Object.keys(this.state.movie).forEach(key => {
            const value = this.state.movie[key];
            if (value === 'genre') formData.append(key, this.state.movie[key]);
            if(value && value.toString() !== "") {
                formData.append(key, this.state.movie[key]);
            }
        });

        console.log(formData);

        axios.post('movies/', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Movie was not created');
            })

            .then(movie => this.props.history.replace('/movies/' + movie.id))
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: 'Movie was not added!'};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        const {name, description} = this.state.movie;
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        return <div className="mt-3">
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата выхода</label>
                    <input id="date" type="date" className="form-control"
                                    name="release_date" onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата завершения проката</label>
                    <input id="date" type="date" className="form-control"
                                    name="finish_date" onChange={this.inputChanged}/>
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Категории</label>
                    </div>
                    <select size="4" className="custom-select" id="inputGroupSelect01" multiple="multiple" name={'genre'} onChange={this.selectChanged}>
                       {this.state.categories.map((category, i) => {
                           return <option key={i} value={category.id} name={category.name}>{category.name}</option>})}
                    </select>
                </div>
                <div className="form-group">
                    <label>Постер</label>
                    <div>
                        <input type="file" name="poster" value={this.state.fileName} onChange={this.fileChanged}/>
                    </div>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                    className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default ItemAdd;