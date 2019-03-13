import React, {Component} from 'react';
import MovieCard from '../MovieCard/MovieCard';


class GetList extends Component {
    render() {
        return (
            <div className={"d-inline-flex flex-wrap"}>
                {Object.values(this.props.list).map((item, i) => {return (
                    <MovieCard
                        key={i}
                        onClick={() => this.props.click(item.id)}
                        movie={item}
                    />)
                })}
            </div>
        );
    }
}

export default GetList;