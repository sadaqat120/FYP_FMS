import React, { Component } from "react";

class form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      date: "",
      address: "",
      language: "react",
    };
  }

  handleusername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handledate =(event)=>{
    this.setState({
        date: event.target.value
    }) 
  }

  handleaddress =(event)=>{
    this.setState({
        address: event.target.value
    }) 
  }

  handleLanguage =(event)=>{
    this.setState({
        language: event.target.value
    }) 
  }

  handleSubmit =(event)=>{
    alert(`Name: ${this.state.username} Date: ${this.state.date} Address: ${this.state.address} Learning language: ${this.state.language}`)
    event.preventDefault() // This line will prevent to erase the fill data whe the button submit si pressed, if you want to lose/forget the data after when you hit the submit, then  pok remove this line to erase all the data.
}

  render() {
    const { username, address, date, language } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Below there is Form sample</h4>
        <label>Username: </label>
        <input type="text" value={username} placeholder="username" onChange={this.handleusername}></input>
        <br></br>
        <label>Date: </label>
        <input type="date" value={date} placeholder="date" onChange={this.handledate}></input>
        <br></br>
        <label>Address</label>
        <textarea value={address} placeholder="Write the address here" onChange={this.handleaddress}></textarea>
        <br></br>
        <select value={language} onChange={this.handleLanguage}>
          <option value="react">React Js</option>
          <option value="node">Node Js</option>
          <option value="express">Express Js</option>
        </select>
        <br></br>
        <button type="submit">Submit!</button>
      </form>
    );
  }
}

export default form;
