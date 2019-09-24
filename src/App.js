import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const generateKey = () => {
  return `${new Date().getTime()}`;
}

let happyThings = [];

class List extends React.Component {
  render() {
    let items = this.props.items.map((item) => {
      return (
        <ListItem
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

class ListItem extends React.Component {
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

const Button = ({ onClick, className, children }) => {
  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  Button.defaultProps = {
    className: '',
  }

  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  )

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    console.log('hi!');
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
        type="submit"
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
          <Button
            onClick={this.onSubmit}
            className="btn">
            Add
          </Button>
        </div>
      </form >
    );
  }
}

class Header extends React.Component {
  render() {
    let count = ''
    let storedList = JSON.parse(localStorage.getItem('storedList'))
    if (storedList != null) {
      count = storedList.length
    }
    let headerString = count > 1 ? "reasons to be happy" : "reason to be happy";
    return <h1>{count} {headerString}</h1>;
  }
}

class GratitudeListApp extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.downloadList = this.downloadList.bind(this);
    let storedList = JSON.parse(localStorage.getItem('storedList'))

    if (storedList != null) {
      happyThings = storedList
    }

    this.state = { happyThings: happyThings }
  }

  downloadList() {
    let filename = "gratitude-list.json";
    let contentType = "application/json;charset=utf-8;";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(happyThings)))],
        { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      let temp_anchor = document.createElement('a');
      temp_anchor.download = filename;
      temp_anchor.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(happyThings));
      temp_anchor.target = '_blank';
      document.body.appendChild(temp_anchor);
      temp_anchor.click();
      document.body.removeChild(temp_anchor);
    }
  }

  addItem(happyThing) {
    happyThings.unshift({
      index: happyThings.length + 1,
      value: happyThing.newItemValue,
      key: generateKey(happyThing.newItemValue),
      date: new Date().toLocaleString()
    });
    this.setState({ happyThings: happyThings });
    localStorage.setItem('storedList', JSON.stringify(happyThings));
  }

  removeItem(itemIndex) {
    happyThings.splice(itemIndex, 1);
    this.setState({ happyThings: happyThings });
  }

  render() {
    return (
      <div id="main">
        <Header />
        <Form addItem={this.addItem} />
        <List
          items={this.state.happyThings}
          removeItem={this.removeItem}
        />
        <Button
          onClick={this.downloadList}
          className="download-btn">
          Download List
        </Button>
      </div >
    );
  }
}

export default GratitudeListApp;

export {
  Form,
  List,
  ListItem,
  Header,
  Button
};
