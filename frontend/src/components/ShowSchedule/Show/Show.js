import React from 'react';


const Show = props => {
    let name = '';
    if (props.check === 'hall')
        name = props.film_name;
    if (props.check === 'movie')
        name = props.hall_name;
    return <div className='list-group-item'>
        {props.start},
        <span> {name}, </span>
        {props.price} c.
    </div>
};


export default Show;