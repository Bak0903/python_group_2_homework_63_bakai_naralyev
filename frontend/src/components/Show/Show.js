import React from 'react';


const Show = props => {
    return <div className='list-group-item'>
        {props.start},
        {props.hall ? <span> {props.hall_name}, </span> : null}
        {props.movie ? <span> {props.film_name}, </span> : null}
        {props.price} c.
    </div>
};


export default Show;