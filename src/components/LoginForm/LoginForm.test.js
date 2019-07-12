import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { authService } from '../../services';

describe('Login Form Render', () => {
  it('should render correctly', () => {
    const component = shallow(<LoginForm />);
    expect(component).toMatchSnapshot();
  });
});

describe('Login form validate username', () => {
  it('validate username test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: ""
      }
    }
    component.find('input[name="username"]').simulate('change', targetInput);
    expect(component.find('p#username-helper-text').text())
      .toBe('Tên đăng nhập bao gồm chữ cái và số');
    component.unmount()
  })

  it('validate username test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: " "
      }
    }
    component.find('input[name="username"]').simulate('change', targetInput);
    expect(component.find('p#username-helper-text').text())
      .toBe('Tên đăng nhập không được chứa khoảng trắng');
    component.unmount()
  })

  it('validate username test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: "anhd6"
      }
    }
    component.find('input[name="username"]').simulate('change', targetInput);
    expect(component.find('p#username-helper-text').text())
      .toBe('Tên đăng nhập có độ dài từ 6 đến 128 ký tự');
    component.unmount()
  })
});

describe('Login form submit', () => {
  it('Button submit disable with invalid data', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: '' } });
    component.find('input[name="password"]').simulate('change', { target: { value: 'ANhduc13' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeTruthy();
    component.unmount();
  })

  it('Button submit enable with expect data', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: 'anhduc13' } });
    component.find('input[name="password"]').simulate('change', { target: { value: 'anhduc13' } });
    expect(component.find('input[name="username"]').prop('disabled')).toBeFalsy();
    component.unmount();
  })

  it('Submit form, call api with valid input', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const value = {
      'username': 'anhducc13',
      'password': 'Anhducc13',
    }
    component.find('input[name="username"]').simulate('change', { target: { value: value.username } });
    component.find('input[name="password"]').simulate('change', { target: { value: value.password } });
    const loginFn = jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve({ status: 200 }));
    component.find('form').simulate('submit');
    expect(loginFn).toHaveBeenCalled();
    expect(loginFn).toHaveBeenCalledWith(value);
    component.unmount();
  })
});
