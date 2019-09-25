import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { spy } from 'sinon';

import GratitudeListApp, { Form, Button, Header } from './App';

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
  //   const fakeEvent = { preventDefault: () => console.log('preventDefault') };
  //   const component = mount(
  //     <Form onSubmit={addItem} />
  //   );

  //   let input = component.find('input').first();

  //   console.log(input.debug())

  //   input.innerHTML = 'text'       // have to get the node...
  //   input.first().simulate('change')  // have to use the wrapper...
  //   component
  //     .simulate("submit", fakeEvent);

  //   expect(addItem.callCount).toBe(1);
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

describe('Header', () => {
  it('updates the number based on the length of the happyThings list', () => {
    let happyThings = ['bananas', 'apples', 'oranges'];
    localStorage.setItem('storedList', JSON.stringify(happyThings));

    const component = shallow(<Header />);
    let header = component.find('h1').text();

    expect(header).toBe('3 reasons to be happy');
  })

  it('uses the correct pluralization based on number of happyThings', () => {
    let happyThings = ['one'];
    localStorage.setItem('storedList', JSON.stringify(happyThings));

    const component = shallow(<Header />);
    let singularItemHeader = component.find('h1').text();

    expect(singularItemHeader).toBe('1 reason to be happy');
  })
})