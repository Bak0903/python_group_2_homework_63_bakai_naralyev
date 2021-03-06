import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {update} from "../../store/actions/requests/patch";
import {SUCCESS} from "../../store/actions/statuses/actionSuccess";


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                'id': '',
                'username': '',
                'password': '',
                'passwordConfirm': '',
                'first_name': '',
                'last_name': '',
                'email': ''
            },

            errors: {}
        };
        if(this.props.user) {
            this.state.user=this.props.user;
        }
    }

    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm
    };


    gatherFormData = () => {
        let formData = new FormData();
        Object.keys(this.state.user).forEach(key => {
            const value = this.state.user[key];
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

    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const url = 'user/' + this.props.user.id + '/edit/';
            const formData = this.gatherFormData();
            return this.props.update(url, formData).then(result => {
                if (result.type === SUCCESS) {
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    passwordConfirm: ['Passwords do not match']
                }
            })
        }
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    };

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {first_name, last_name, email, password, passwordConfirm} = this.state.user;
        return <Fragment>
            <h2>Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Имя</label>
                    <input type="text" className="form-control" name="first_name" value={first_name}
                           onChange={this.inputChanged}/>
                    {this.showErrors('first_name')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Фамилия</label>
                    <input type="text" className="form-control" name="last_name" value={last_name}
                           onChange={this.inputChanged}/>
                    {this.showErrors('last_name')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Электронная почта</label>
                    <input type="email" className="form-control" name="email" value={email}
                           onChange={this.inputChanged}/>
                    {this.showErrors('email')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Новый пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged} onCopy={event => event.preventDefault()}/>
                    {this.showErrors('password')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Подтверждение нового пароля</label>
                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                           onChange={this.inputChanged}/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <button type="submit" className="btn btn-primary mt-2">Сохранить</button>
            </form>
        </Fragment>
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        update: (url, formData) => dispatch(update(url, formData))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserForm);