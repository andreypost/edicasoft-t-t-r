import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { users: [], searchName: '', userId: '' }
  }
  componentDidMount() {
    this.editUserForm = document.getElementById('editUserForm')
    this.registerUser = document.getElementById('registerUser')
  }
  handleChangeState = (json, searchName, userId) => {
    this.setState({ users: [...json], searchName: searchName, userId: userId })
  }
  fetchRequest = (callback) => {
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(json => callback(json))
  }
  handleViewAll = () => {
    const callback = (data) => {
      this.editUserForm.username.value = this.editUserForm.email.value = this.editUserForm.address.value =
        this.registerUser.username.value = this.registerUser.email.value = this.registerUser.address.value = ''
      this.handleChangeState(data, '', '')
    }
    this.fetchRequest(callback)
  }
  searchInput = () => {
    const callback = (data) => {
      let arr = []
      for (let key of data) {
        if (key.username.toLowerCase() === this.state.searchName.toLowerCase()) arr.push(key)
      }
      this.handleChangeState(arr, this.state.searchName, '')
    }
    this.fetchRequest(callback)
    this.timerId = setTimeout(() => this.fetchRequest(callback), 250)
  }

  handleSearchForm = (e) => {
    this.setState({ searchName: '', })
    clearInterval(this.timerId)
    e.preventDefault()
  }

  handleSubmitRegister = (e) => {
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        address: {
          city: e.target.address.value,
          street: " ",
          suite: " "
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(() => this.handleViewAll())
    e.preventDefault()
  }

  handleEditUser = (user) => {
    this.editUserForm.username.value = user.username
    this.editUserForm.email.value = user.email
    this.editUserForm.address.value = user.address.city + ' ' + user.address.street + ' ' + user.address.suite
    this.handleChangeState([], '', user.id)
  }

  handleSubmitChangeUserForm = (e) => {
    if (!this.state.userId) {
      e.preventDefault()
      return
    }
    fetch(`http://localhost:3001/posts/${this.state.userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        address: {
          city: e.target.address.value,
          street: " ",
          suite: " "
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(() => this.handleViewAll())
    e.preventDefault()
  }

  handleDeleteUser = (user) => {
    fetch(`http://localhost:3001/posts/${user}`, {
      method: 'DELETE'
    })
      .then(() => this.handleViewAll())
  }
  render() {
    return (
      <section className="app">
        <div className="colalignstart">
          <button className="app__view" onClick={this.handleViewAll}>VIEW ALL USERS</button>
          <form id="searchByUserName" onSubmit={this.handleSearchForm} className="flexjustbet wrap">
            <button form="searchByUserName">SEARCH USER BY NAME</button>
            <input type="search"
              name="search" onInput={this.searchInput} onChange={(e) => this.handleChangeState([], e.target.value)} required="username" value={this.state.searchName} autoComplete="off" placeholder="enter username" />
          </form>
          <form id="registerUser" onSubmit={this.handleSubmitRegister} className="flexjustcenter wrap">
            <button form="registerUser">REGISTER</button>
            <input type="text"
              name="username" required="username" placeholder="username" autoComplete="off" />
            <input type="email"
              name="email" required="email" placeholder="email" autoComplete="off" />
            <input type="text"
              name="address" placeholder="address" autoComplete="off" />
          </form>
          <form id="editUserForm" onSubmit={this.handleSubmitChangeUserForm} className="flexjustcenter wrap">
            <button form="editUserForm" type="submit">EDIT</button>
            <input type="text"
              name="username" autoComplete="off" />
            <input type="email"
              name="email" autoComplete="off" />
            <input type="text"
              name="address" autoComplete="off" />
            <i onClick={this.handleViewAll} className="app__cancel pointer">CANCEL</i>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>ADDRESS: city, street, suite</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => (
              <tr key={index}><td>{user.username}</td><td>{user.email}</td><td>{user.address.city} {user.address.street} {user.address.suite}</td><td onClick={() => this.handleEditUser(user)}>edit</td><td onClick={() => this.handleDeleteUser(user.id)}>delete</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

