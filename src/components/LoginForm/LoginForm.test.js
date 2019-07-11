import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { authService } from '../../services';

describe('Login Form Render', () => {
  it('should render correctly', () => {
    const component = shallow(<LoginForm />);
    expect(component).toMatchSnapshot();
    component.unmount();
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
    component.find('input[name="username"]').text('a');
    component.find('input[name="password"]').text('');
    expect(component.find('button[type="submit"]').prop('disabled')).toBe(true);
    component.unmount();
  })

  it('Button submit enable with expect data', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').text('anhducc13');
    component.find('input[name="password"]').text('Anhducc13');
    expect(component.find('button[type="submit"]').prop('disable')).toBe(undefined);
    component.unmount();
  })

  it('Submit form, call api with valid input', () => {
    const component = mount(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const target = {
      'username': 'anhducc13',
      'password': 'Anhducc13',
    }
    component.find('input[name="username"]').text('anhducc13');
    component.find('input[name="password"]').text('Anhducc13');
    const loginFn = jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve({ data: { code: 200, message: 'Thanh cong' } }));
    component.find('button').simulate('click')
    expect(loginFn).toHaveBeenCalledWith(target)
    component.unmount();
  })
});
