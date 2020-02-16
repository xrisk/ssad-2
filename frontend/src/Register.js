import React from 'react';

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      username: '',
      password: '',
      user_type: 'customer',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  getFormAction() {
    return `/api/${this.state.user_type}/register`;
  }

  render() {
    return (
      <form
        action={this.getFormAction()}
        method="POST"
        onSubmit={this.handleSubmit}>
        <label>
          Username
          <input
            onChange={this.handleChange}
            value={this.state.user}
            type="text"
            name="username"
          />
        </label>
        <label>
          Password
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
          />
        </label>
        <label>
          User type:
          <select
            onChange={this.handleChange}
            value={this.state.user_type}
            name="user_type">
            <option value="vendor">Vendor</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export {RegisterView};
