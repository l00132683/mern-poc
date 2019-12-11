import React, {Component } from 'react';
import axios from 'axios';

export default class CreateFlock extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername= this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onChangeTagNo = this.onChangeTagNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            username: '',
            description: '',
            tagNo: 0,
            group: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeTagNo(e){
        this.setState({
            tagNo: e.target.value
        });
    }
    onChangeGroup(e){
        this.setState({
            group: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const flock = {
            username: this.state.username,
            description: this.state.description,
            tagNo: this.state.tagNo,
            group: this.state.group
        }

        console.log(flock);

        axios.post('http://localhost:5000/flocks/add',flock)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    render(){
        return(
            <div>
                <h3>Create New Flock</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref='userInput'
                        required
                        className='form-control'
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user){
                                return <option
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.description}
                        onChange={this.onChangeDescription}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <label>Tag Number: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.tagNo}
                        onChange={this.onChangeTagNo}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <label>Group: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.group}
                        onChange={this.onChangeGroup}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Flock" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}