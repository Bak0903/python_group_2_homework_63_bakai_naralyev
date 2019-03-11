import React, {Component} from 'react';
import './GetList.css';

class GetList extends Component {
    render() {
        return (
            <div className={"list"}>
                {Object.values(this.props.list).map((item, i) => {return (
                    <span
                        key={i}
                        onClick={() => this.props.click('SelectedMovie', item.id)}
                        className={"item"}
                    >{item.name}</span>)
                })}
            </div>
        );
    }
}

export default GetList;