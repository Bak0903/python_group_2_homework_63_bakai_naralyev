import React, {Component} from 'react';
import MovieCard from '../MovieCard/MovieCard';
import HallCard from '../HallCard/HallCard';


class GetList extends Component {
    render() {
        return (
            <div className={"d-inline-flex flex-wrap col-12"}>
                {Object.values(this.props.list).map((item, i) => {
                    if (this.props.name === 'movies') {
                       return <MovieCard
                            key={i}
                            movie={item}
                        />
                    }
                    else if (this.props.name === 'halls') {
                        return <HallCard
                            key={i}
                            hall={item}
                        />
                    }
                    else return null;
                })}
            </div>
        );
    }
}

export default GetList;