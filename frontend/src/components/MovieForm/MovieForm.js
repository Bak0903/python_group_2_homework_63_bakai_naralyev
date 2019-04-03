import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {request} from "../../store/actions/requests/get";


class MovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            posterUrl: null,
            submitEnabled: true
        };
        if(this.props.movie) {
            this.state.posterUrl = this.props.movie.poster;
            this.state.movie = this.props.movie;
            this.state.categories = this.props.categories;
            this.state.movie.poster = null;
        }
    }

    componentDidMount() {
        this.props.request('categories');
    }

    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };

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
            if (options[i].selected) value.push(options[i].value);
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
        if(this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.movie)
                .then(this.enableSubmit);
        }
    };

    render() {
        if (this.state.movie) {
            const {name, description, release_date, genre, finish_date} = this.state.movie;
            const {fileName, submitEnabled, categories} = this.state;
            return <div className="mt-3">
                {alert}
                <form onSubmit={this.formSubmitted}>
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Описание</label>
                        <input type="text" className="form-control" name="description" value={description}
                               onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Дата выхода</label>
                        <input id="date" type="date" className="form-control" value={release_date}
                                        name="release_date" onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Дата завершения проката</label>
                        <input id="date" type="date" className="form-control" value={finish_date}
                                        name="finish_date" onChange={this.inputChanged}/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Категории</label>
                        </div>
                        <select size="4" className="custom-select" id="inputGroupSelect01" value={genre}
                                multiple="multiple" name={'genre'} onChange={this.selectChanged}>
                           {Object.values(categories).map((category, i) => {
                               return <option key={i} value={category.id} name={category.name}>{category.name}</option>})}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Постер</label>
                        <div>
                            <input type="file" name="poster" value={fileName} onChange={this.fileChanged}/>
                        </div>
                    </div>
                    <button disabled={!submitEnabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
                </form>
            </div>;
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        movie: state.item.movie,
        categories: state.lists.categories
    }
};

const mapDispatchToProps = dispatch => ({
    request: (url) => dispatch(request(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);