import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { authService } from '../../services';

describe('Forgot Password Form Render', () => {
  it('should render correctly', () => {
    const component = shallow(<ForgotPasswordForm />);
    expect(component).toMatchSnapshot();
  });
});

describe('Forgot Password form validate', () => {
  it('validate email', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPasswordForm />
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

  it('validate username', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPasswordForm />
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

  it('validate success', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPasswordForm />
      </MemoryRouter>
    );
    const data = {
        'username': 'anhducc13',
        'email': 'trantienduc10@gmail.com'
      }
    component.find('input[name="username"]').simulate('change', {target: {value: data['username']}});
    component.find('input[name="email"]').simulate('change', {target: {value: data['email']}});
    expect(component.find('p#username-helper-text').length)
      .toBe(0);
    expect(component.find('p#email-helper-text').length)
      .toBe(0);
    component.unmount()
  })
});

describe('Forgot password form submit', () => {
  it('Button submit disable with invalid data', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPasswordForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: '' } });
    component.find('input[name="email"]').simulate('change', { target: { value: 'ANhduc13' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeTruthy();
    component.unmount();
  })

  it('Button submit enable with expect data', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPasswordForm />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: 'anhducc13' } });
    component.find('input[name="email"]').simulate('change', { target: { value: 'trantienduc10@gmail.com' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeFalsy();
    component.unmount();
  })

  it('Submit form, call api with valid input', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPasswordForm />
      </MemoryRouter>
    );
    const value = {
      'username': 'anhducc13',
      'email': 'trantienduc10@gmail.com',
    }
    component.find('input[name="username"]').simulate('change', { target: { value: value['username'] } });
    component.find('input[name="email"]').simulate('change', { target: { value: value['email'] } });
    const forgorPasswordFn = jest.spyOn(authService, 'forgotPassword').mockImplementation(() => Promise.resolve({ status: 200 }));
    component.find('form').simulate('submit');
    expect(forgorPasswordFn).toHaveBeenCalled();
    expect(forgorPasswordFn).toHaveBeenCalledWith(value);
    component.unmount();
  })
});
