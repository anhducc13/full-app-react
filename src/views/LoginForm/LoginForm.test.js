import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { LoginForm } from './LoginForm';


const initTextField = {
  value: '',
  error: '',
  valid: false,
}
const defaultProps = {
  textField: {
    usernameField: initTextField,
    passwordField: initTextField,
  },
  handleChange: {
    onChangeUsername: jest.fn(),
    onChangePassword: jest.fn(),
  },
  handleSubmit: jest.fn()
}

describe('LoginForm', () => {
  it('should render correctly', () => {
    const component = shallow(
        <LoginForm {...defaultProps}/>
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});

describe('Login form tests', () => {
  
  it('have username input & password input', () => {
    const LoginFormComponent = mount(
      <MemoryRouter>
        <LoginForm {...defaultProps} />
      </MemoryRouter>
    );
    const usernameInput = LoginFormComponent.find('input[name="username"]');
    expect(usernameInput).toBeDefined();
    expect(usernameInput).toHaveLength(1);
    const passwordInput = LoginFormComponent.find('input[name="password"]');
    expect(passwordInput).toBeDefined();
    expect(passwordInput).toHaveLength(1);
    LoginFormComponent.unmount();
  });

  it('have a button submit and default is disabled', () => {
    const LoginFormComponent = mount(
      <MemoryRouter>
        <LoginForm {...defaultProps} />
      </MemoryRouter>
    );
    const buttonSubmit = LoginFormComponent.find('button[type="submit"][disabled=true]');
    expect(buttonSubmit).toBeDefined();
    expect(buttonSubmit).toHaveLength(1);
    LoginFormComponent.unmount();
  });

  it('have 2 link, 1 to register, 1 to forgot password', () => {
    const LoginFormComponent = mount(
      <MemoryRouter>
        <LoginForm {...defaultProps} />
      </MemoryRouter>
    );
    const linkToRegister = LoginFormComponent.find('a[href="/register"]');
    expect(linkToRegister).toBeDefined();
    expect(linkToRegister).toHaveLength(1);

    const linkToForgotPassword = LoginFormComponent.find('a[href="/forgot-password"]');
    expect(linkToForgotPassword).toBeDefined();
    expect(linkToForgotPassword).toHaveLength(1);
    LoginFormComponent.unmount();
  });

  it('onChangeUsername have been call when change input username', () => {
    const wrapper = mount(
      <MemoryRouter>
        <LoginForm {...defaultProps} />
      </MemoryRouter>
    );
    wrapper.find('input[name="username"]').simulate('change');
    expect(defaultProps.handleChange.onChangeUsername).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('onChangePassword have been call when change input password', () => {
    const wrapper = mount(
      <MemoryRouter>
        <LoginForm {...defaultProps} />
      </MemoryRouter>
    );
    wrapper.find('input[name="password"]').simulate('change');
    expect(defaultProps.handleChange.onChangePassword).toHaveBeenCalled();
    wrapper.unmount();
  });

});