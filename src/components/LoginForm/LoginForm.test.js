import React from 'react';
import { mount, shallow } from 'enzyme';

import { LoginForm } from './LoginForm';


describe('Login Form Render', () => {
  it('should render correctly', () => {
    const component = shallow(<LoginForm />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});

// describe('Login form tests', () => {
  
// });