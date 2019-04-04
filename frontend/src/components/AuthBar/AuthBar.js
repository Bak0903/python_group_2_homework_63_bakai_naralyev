import React from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout} from "../../store/actions/logout";


const AuthBar = (props) => {
    const user = props.user;
    if (user.username)
        return <div className='d-flex'>
            <span>Привет, <NavLink className='link' to='/user'>{user.username}</NavLink></span>
            <button className='myButton'
                    onClick={props.logout}
            >Выйти
            </button>
        </div>;
    else
        return <div className='d-flex'>
            <NavLink key='enter' className='myButton' to="/login">Войти</NavLink>,
            <NavLink key='register' className='myButton' to="/register">Регистрация</NavLink>
        </div>
};


const mapStateToProps = state => {return {user: state.user}};
const mapDispatchToProps = dispatch => {return {logout: () => dispatch(logout())}};

export default connect(mapStateToProps, mapDispatchToProps)(AuthBar);