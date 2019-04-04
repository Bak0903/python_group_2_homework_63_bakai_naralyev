import React, {Component, Fragment} from 'react';
import {register} from "../../store/actions/requests/register";
import {login} from "../../store/actions/requests/login";
import connect from "react-redux/es/connect/connect";
import {SUCCESS} from "../../store/actions/statuses/actionSuccess";
import {CATCHERROR} from "../../store/actions/statuses/actionError";


class Register extends Component {
    state = {
        user: {
            'username': '',
            'password': '',
            'passwordConfirm': '',
            'first_name': '',
            'last_name': '',
            'email': ''
        },
        errors: {}
    };

    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm
    };

    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const data = {
                usernam: this.state.user.username,
                password: this.state.user.password,
                first_name: this.state.user.first_name,
                last_name: this.state.user.last_name,
                email: this.state.user.email
            };
            return this.props.register('register/', data).then(result => {
                if(result.type === SUCCESS) {
                    console.log('SUCCESS');
                    this.props.history.replace('/login/');
                }
                if(result.type === CATCHERROR) {
                    console.log('CATCHERROR');
                    console.log(this.props.errors);
                }
            });
        } else {
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
        const errors = this.props.errors;
        if (errors && errors[name]) {
            return errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password, passwordConfirm, first_name, last_name, email} = this.state.user;
        return <Fragment>
            <h2>Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Логин</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
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
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged} onCopy={event => event.preventDefault()}/>
                    {this.showErrors('password')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                           onChange={this.inputChanged}/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <button type="submit" disabled={this.props.loading} className="btn btn-primary mt-2">
                    Зарегистрироваться</button>
            </form>
        </Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => ({
    register: (url, registerData) => dispatch(register(url, registerData)),
    login: (url, loginData) => dispatch(login(url, loginData))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);