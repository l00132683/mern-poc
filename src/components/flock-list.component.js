import React, {Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Flock = props => (
    <tr>
        <td>{props.flock.username}</td>
        <td>{props.flock.description}</td>
        <td>{props.flock.tagNo}</td>
        <td>{props.flock.group}</td>
        <td>
            <Link to={"/edit/"+props.flock._id}>edit</Link> | <button className="btn btn-link" onClick={() => {props.deleteFlock(props.flock._id)}}>delete</button>
        </td>
    </tr>
)
export default class FlockList extends Component{
    constructor(props){
        super(props);
    
    this.deleteFlock = this.deleteFlock.bind(this);

    this.state = {flocks: []};
}

componentDidMount(){
    axios.get('http://localhost:5000/flocks/')
    .then(response => {
        this.setState( { flocks: response.data})
    })
    .catch((err) => {
        console.log(err)
    })
}

deleteFlock(id){
    axios.delete('http://localhost:5000/flocks'+id)
    .then(res => console.log(res.data));
    
    this.setState({
        flocks: this.state.flocks.filter(el => el.id !== id)
    })
}
flockList(){
    return this.state.flocks.map(currentFlock => {
        return <Flock flock={currentFlock} deleteFlock={this.deleteFlock} key={currentFlock._id}/>
    })
}
    render(){
        return(
            <div>
                <h3>Flock List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Tag Number</th>
                            <th>Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.flockList()}
                    </tbody>
                </table>
            </div>
        )
    }
}