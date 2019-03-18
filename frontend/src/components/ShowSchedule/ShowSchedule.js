import React from 'react';


const formatDate = (dateString) => {
    return dateString.slice(0, 10) + ' ' + dateString.slice(12, 19);
};

const ShowSchedule = props => {
    return <div className="mt-4">
        <h2>Расписание показов</h2>
        {props.shows.map(show => {
            return <p key={show.id}>{formatDate(show.start)}, {show.hall_name}, {show.price} c.</p>
        })}
    </div>
};


export default ShowSchedule;