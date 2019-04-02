import React, {Component} from 'react';
import Show from './Show/Show';


class ShowSchedule extends Component {

    formatDate = (dateString) => {
        return dateString.slice(0, 10) + ' ' + dateString.slice(11, 19);
    };

    render() {
        return <div className="list-group text-center mt-5 ml-auto mr-auto w-50">
            <h2>Расписание показов</h2>
            {Object.values(this.props.shows).map(item => {return (
                <Show
                    start = {this.formatDate(item.start)}
                    hall = {this.props.hall}
                    hall_name = {item.hall_name}
                    movie = {this.props.movie}
                    film_name = {item.film_name}
                    price = {item.price}
                />
            )})}
        </div>
    }
}


export default ShowSchedule;