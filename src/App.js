import React from 'react';
import './App.css';

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
}

let happyThings = [];

class GratitudeList extends React.Component {
  render() {
    let items = this.props.items.map((item) => {
      return (
        <GratitudeListItem
          key={item.key}
          item={item}
          date={item.date}
          removeItem={this.props.removeItem}
        />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}

class GratitudeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="item">
          <span
            className="list-item"
          >
            {this.props.item.value}
          </span>
          <span className="item-date">
            {this.props.item.date}
          </span>
          <span
            className="close"
            onClick={this.onClickDelete}
          >
            X
        </span>
        </div>
      </li>
    )
  }
}

class GratitudeForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.refs.itemName.focus();
  }

  onSubmit(event) {
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  }
  render() {
    return (
      <form
        ref="form"
        onSubmit={this.onSubmit}
        className="form-inline"
      >
        <div className="group">
          <input
            type="text"
            ref="itemName"
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>I'm grateful for...</label>
          <button
            type="submit"
            className="btn"
            id="add-button">Add
          </button>
        </div>
      </form >
    );
  }
}

class GratitudeListHeader extends React.Component {
  render() {
    let countHappyThings = happyThings.length > 0 ? happyThings.length : '';
    let headerString = countHappyThings > 1 ? " reasons to be happy" : " reason to be happy";
    return <h1>{countHappyThings} {headerString}</h1>;
  }
}

class GratitudeListApp extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = { happyThings: [], };
  }

  componentDidMoint() {
    // call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ happyThings: res.express }))
      .catch(err => console.log(err))
  }

  // Fetches our GET route from the Express server
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  addItem(happyThing) {
    console.log(happyThing);
    happyThings.unshift({
      index: happyThing.length + 1,
      value: happyThing.newItemValue,
      key: generateKey(happyThing.newItemValue),
      date: new Date().toLocaleString()
    });
    this.setState({ happyThings: happyThings });
  }

  removeItem(itemIndex) {
    console.log("in here!")
    happyThings.splice(itemIndex, 1);
    console.log(happyThings)
    this.setState({ happyThings: happyThings });
  }

  render() {
    return (
      <div id="main">
        <GratitudeListHeader />
        <GratitudeForm addItem={this.addItem} />
        <GratitudeList
          items={this.state.happyThings}
          removeItem={this.removeItem}
        />
      </div >
    );
  }
}

export default GratitudeListApp;
