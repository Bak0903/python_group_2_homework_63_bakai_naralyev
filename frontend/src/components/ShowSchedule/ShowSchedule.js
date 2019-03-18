import React from 'react';


const formatDate = (dateString) => {
    return dateString.slice(0, 10) + ' ' + dateString.slice(12, 19);
};

const ShowSchedule = props => {
    return <div className="mt-4">
        <h2 className='text-justify'>Расписание показов</h2>
        {props.shows.map(show => {
            return <p
                className='text-justify'
                key={show.id}>{formatDate(show.start)},
                {props.show ? <span> {show.hall_name}, </span> : null}
                {props.movie ? <span> {show.film_name}, </span> : null}
                {show.price} c.
            </p>
        })}
    </div>
};


export default ShowSchedule;