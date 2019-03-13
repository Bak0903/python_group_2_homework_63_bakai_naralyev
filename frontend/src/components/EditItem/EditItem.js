import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';


class ItemAdd extends Component {
    state = {
        task: {
            summary: "",
            description: "",
            due_date: '',
            status: "",
            time_planned: null
        },

        alert: null,
        submitDisabled: false,
        id: '',
    };

    componentDidMount() {
        let task = {
            summary: this.props.task.summary,
            description: this.props.task.description,
            due_date: this.props.task.due_date,
            status: this.props.task.status,
            time_planned: this.props.task.time_planned
        };
        let id = this.props.task.id;
        this.setState({task, id})
    }

    updateTaskState = (fieldName, value) => {
        console.log(this.state.task);
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task= task;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString().slice(0, 10));
    };

     formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        let x = 'tasks/' + this.state.id + '/';
        console.log(x);

        axios.put(x, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) return response.data;
                throw new Error('Task was not edit');
            })
            .then(task => this.props.history.replace('/tasks/' + task.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: 'Task was not edit!'};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {

        const {summary, description, due_date, time_planned} = this.state.task;
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        const due_date_selected = due_date ? new Date(due_date) : null;
        return <div className="mt-3">
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Срок</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={due_date_selected} className="form-control"
                                    name="due_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Время для задачи</label>
                    <div>
                        <input type="number" className="form-control"
                                    name="time_planned" value={time_planned} onChange={this.inputChanged}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <select onChange={this.inputChanged}>
                        <option selected value="Очередь" name='status'>очередь</option>
                        <option value="В работе" name='status'>в работе</option>
                        <option value="Сделано" name='status'>сделано</option>
                    </select>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default ItemAdd;