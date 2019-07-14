import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';
import { authService } from '../../services';

describe('Register Form Render', () => {
  it('should render correctly', () => {
    const component = shallow(<RegisterForm />);
    expect(component).toMatchSnapshot();
  });
});

describe('Register Form validate email', () => {
  it('validate email test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: ""
      }
    }
    component.find('input[name="email"]').simulate('change', targetInput);
    expect(component.find('p#email-helper-text').text())
      .toBe('Email không hợp lệ');
    component.unmount()
  })

  it('validate email test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: " "
      }
    }
    component.find('input[name="email"]').simulate('change', targetInput);
    expect(component.find('p#email-helper-text').text())
      .toBe('Email không hợp lệ');
    component.unmount()
  })

  it('validate email test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: "trantienduc10@gmail.com"
      }
    }
    component.find('input[name="email"]').simulate('change', targetInput);
    expect(component.find('p#email-helper-text').length).toBe(0)
    component.unmount()
  })
});

describe('Register form submit', () => {
  it('Button submit disable with invalid data', () => {
    const component = mount(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: '' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeTruthy();
    component.unmount();
  })

  it('Button submit enable with expect data', () => {
    const component = mount(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: 'anhducc13' } });
    component.find('input[name="email"]').simulate('change', { target: { value: 'trantienduc10@gmail.com' } });
    component.find('input[name="password"]').simulate('change', { target: { value: 'Anhducc13' } });
    component.find('input[name="confirm-password"]').simulate('change', { target: { value: 'Anhducc13' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeFalsy()
    component.unmount();
  })

  it('Submit form, call api with valid input', () => {
    const component = mount(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    const value = {
      'username': 'anhducc13',
      'password': 'Anhducc13',
      'email': 'trantienduc10@gmail.com'
    }
    component.find('input[name="username"]').simulate('change', { target: { value: value.username } });
    component.find('input[name="email"]').simulate('change', { target: { value: value.email } });
    component.find('input[name="password"]').simulate('change', { target: { value: value.password } });
    const registerFn = jest.spyOn(authService, 'register').mockImplementation(() => Promise.resolve({ status: 200 }));
    component.find('form').simulate('submit');
    expect(registerFn).toHaveBeenCalled();
    expect(registerFn).toHaveBeenCalledWith(value);
    component.unmount();
  })
});
