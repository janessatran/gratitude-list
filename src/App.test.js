import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { spy } from 'sinon';

import GratitudeListApp, { Form, Button } from './App';

import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe('GratitudeListApp', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GratitudeListApp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<GratitudeListApp />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const component = shallow(<GratitudeListApp />)
    expect(component).toMatchSnapshot()
  })



})

describe('Form', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('has a valid snapshot', () => {
    const component = renderer.create(<Form />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders correctly', () => {
    const component = shallow(<Form />)
    expect(component).toMatchSnapshot();
  })

  // it('should call addItem when form is submitted', () => {
  //   const addItem = spy();
  //   const component = mount(
  //     <Form onSubmit={addItem} />
  //   );
  //   component
  //     .find(".form-inline")
  //     .last()
  //     .simulate("submit");

  //   console.log(component.debug())
  //   expect(addItem.calledOnce).toBe(true);
  // })

})

describe('Button', () => {
  it('creates a new button with onClick handler', () => {
    const testHandler = spy();
    const component = shallow(
      <Button children={"New Button"} onClick={testHandler} />
    );
    // extract onClick Handler from Button
    component
      .find("button")
      .first()
      .simulate("click")

    expect(testHandler.calledOnce).toBe(true);
  });
})