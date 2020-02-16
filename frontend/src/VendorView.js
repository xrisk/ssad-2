import React from 'react';
import config from './config.js';

class NewListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      min_qty: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    console.log(this.state);
    evt.preventDefault();
    fetch(config.API_URL + '/vendor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1> Create new listing </h1>
        <form
          method="POST"
          action="/api/vendor"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}>
          <input
            type="string"
            placeholder="name"
            name="name"
            onChange={this.handleChange}></input>
          <br />
          <input
            type="string"
            placeholder="price"
            name="price"
            onChange={this.handleChange}></input>
          <br />
          <input
            type="string"
            placeholder="minimum quantity"
            name="min_qty"
            onChange={this.handleChange}></input>
          <br />
          <button type="submit">submit form</button>
        </form>
      </div>
    );
  }
}

class ListingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.refreshData = this.refreshData.bind(this);
    this.componentDidMount = this.componentDidMount(this);
  }

  refreshData() {
    try {
      fetch(config.API_URL + '/vendor')
        .then(resp => resp.json())
        .then(data => this.setState({data: data}));
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.refreshData();
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.refreshData}> Refresh </button>
        <pre>{JSON.stringify(this.state.data)}</pre>
      </React.Fragment>
    );
  }
}

export {ListingView};
