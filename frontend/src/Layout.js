import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './Layout.css';


class Layout extends Component {
    render() {
        const username = localStorage.getItem('username');
        return <div className='App'>
            <div className='d-flex justify-content-between col-12 mb-2 bg-info p-2'>
                <div className='d-flex'>
                    <NavLink to='/' className="myButton">Фильмы</NavLink>
                    <NavLink to='/halls' className="myButton">Залы</NavLink>
                </div>
                <div className='d-flex'>
                    <NavLink to='/halls/add' className='myButton'>Добавить зал</NavLink>
                    <NavLink to='/movies/add' className='myButton'>Добавить фильм</NavLink>
                </div>

                <div className='d-flex'>
                  {localStorage.getItem('auth-token')
                    ? <div key='exit' className='d-flex'>
                          <span>Привет, <NavLink className='link' to='/user'>{username}</NavLink></span>
                          <NavLink className='myButton' to="/logout">Выйти</NavLink>
                      </div>
                    : [<div key='enter'><NavLink className='myButton' to="/login">Войти</NavLink></div>,
                        <div key='register'>><NavLink className='myButton' to="/register">Регистрация</NavLink></div>
                    ]}
                </div>
            </div>
            <div>
                {this.props.children}
            </div>
        </div>;
    }
}


export default Layout;