import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App, { GratitudeForm } from './App';
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  })
})

describe('GratitudeForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GratitudeForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('has a valid snapshot', () => {
    const component = renderer.create(<GratitudeForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot
  })

  it('renders correctly', () => {
    const component = shallow(<GratitudeForm />)
    expect(component).toMatchSnapshot()
  })
})