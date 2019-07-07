import React from 'react';
import { shallow, mount } from 'enzyme';

import { Login } from './Login';

describe('Login', () => {
  it('should render correctly', () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });
});

describe('Login tests included components', () => {

  it('renders login form', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('LoginForm')).toBeDefined();
  });
  it('redirect to home', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('Redirect')).toBeDefined();
  });
});
