import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { UpdatePasswordForm } from './UpdatePasswordForm';
import { authService } from '../../services';

describe('Update Password Form Render', () => {
  it('should render correctly', () => {
    const component = shallow(<UpdatePasswordForm />);
    expect(component).toMatchSnapshot();
  });
});

describe('Update Password Form validate password', () => {
  it('validate password test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePasswordForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: ""
      }
    }
    component.find('input[name="password"]').simulate('change', targetInput);
    expect(component.find('p#password-helper-text').length)
      .toBe(1);
    component.unmount()
  })

  it('validate password test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePasswordForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: " "
      }
    }
    component.find('input[name="password"]').simulate('change', targetInput);
    expect(component.find('p#password-helper-text').text())
      .toBe('Mật khẩu không được chứa khoảng trắng');
    component.unmount()
  })

  it('validate confirm new password', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePasswordForm />
      </MemoryRouter>
    );
    const targetInput = {
      target: {
        value: "Anhducc13"
      }
    }
    component.find('input[name="new-password"]').simulate('change', targetInput);
    component.find('input[name="confirm-new-password"]').simulate('change', `${targetInput} `) ;
    expect(component.find('p#confirm-new-password-helper-text').text())
        .toBe('Mật khẩu không khớp')
    component.unmount()
  })
});

describe('Update password form submit', () => {
  it('Button submit disable with invalid data', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePasswordForm />
      </MemoryRouter>
    );
    component.find('input[name="password"]').simulate('change', { target: { value: '' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeTruthy();
    component.unmount();
  })

  it('Button submit enable with expect data', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePasswordForm />
      </MemoryRouter>
    );
    component.find('input[name="password"]').simulate('change', { target: { value: 'Anhducc13' } });
    component.find('input[name="new-password"]').simulate('change', { target: { value: 'Anhducc14' } });
    component.find('input[name="confirm-new-password"]').simulate('change', { target: { value: 'Anhducc14' } });
    expect(component.find('button[type="submit"]').prop('disabled')).toBeFalsy()
    component.unmount();
  })

  it('Submit form, call api with valid input', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePasswordForm />
      </MemoryRouter>
    );
    const value = {
      'old_password': 'Anhducc13',
      'new_password': 'Anhducc14'
    }
    const userInfoLogin = {
        username: 'anhducc13',
        timeExpired: Date.now(),
        accessToken: 'asfdfbrfdfgsdcsdgsdfgsg'
    }
    localStorage.setItem('userInfoLogin', JSON.stringify(userInfoLogin))
    component.find('input[name="password"]').simulate('change', { target: { value: value['old_password'] } });
    component.find('input[name="new-password"]').simulate('change', { target: { value: value['new_password'] } });
    component.find('input[name="confirm-new-password"]').simulate('change', { target: { value: value['new_password'] } });
    const updatePasswordFn = jest.spyOn(authService, 'updatePassword').mockImplementation(() => Promise.resolve({ status: 200 }));
    component.find('form').simulate('submit');
    expect(updatePasswordFn).toHaveBeenCalled();
    expect(updatePasswordFn).toHaveBeenCalledWith(value, userInfoLogin.accessToken);
    component.unmount();
  })
});
