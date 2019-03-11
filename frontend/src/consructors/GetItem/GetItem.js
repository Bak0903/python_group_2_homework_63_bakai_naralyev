import React, {Component} from 'react';
import './GetItem.css';


class GetItem extends Component {


    render() {
        console.log(this.props.item);
        return (
            <div className={'card'}>
                <span className={'name'}>{this.props.item.name}</span>
                <span className={'description'}>{this.props.item.description}</span>
                <img src={this.props.item.poster} width="200" alt="lorem"/>
            </div>
        );
    }
}

export default GetItem;