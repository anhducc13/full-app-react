import React, { useState } from 'react';
import { setGlobal } from 'reactn';
import Swal from 'sweetalert2'
import { LoginForm } from 'views/LoginForm'
import {
  validateLength,
  haveSpace,
  haveUpperCharacter,
  haveLowerCharacter,
  haveNumberCharacter,
  haveSpecialCharacter
} from 'helpers/validators'
import { authService } from 'services'

export const Login = (props) => {
  const initTextField = {
    value: '',
    error: '',
    valid: false,
  }

  const [usernameField, setUsernameField] = useState(initTextField);
  const [passwordField, setPasswordField] = useState(initTextField);

  const onChangeUsername = (e) => {
    let { value, error, valid } = usernameField;
    value = e.target.value;
    if (
      !haveLowerCharacter(value.toLowerCase())
      || !haveNumberCharacter(value)
      || haveSpecialCharacter(value)
    ) {
      error = 'Tên đăng nhập bao gồm chữ cái và số';
      valid = false;
    } else if (haveSpace(value)) {
      error = 'Tên đăng nhập không được chứa khoảng trắng';
      valid = false;
    } else if (!validateLength(value, { min: 6, max: 128 })) {
      error = 'Tên đăng nhập có độ dài từ 6 đến 128 ký tự';
      valid = false;
    } else {
      error = '';
      valid = true;
    }
    setUsernameField({
      value: value,
      error: error,
      valid: valid,
    });
  }

  const onChangePassword = (e) => {
    let { value, error, valid } = passwordField;
    value = e.target.value;
    if (
      !haveLowerCharacter(value)
      || !haveUpperCharacter(value)
      || !haveNumberCharacter(value)
      || haveSpecialCharacter(value)
    ) {
      error = 'Mật khẩu bao gồm chữ thường, chữ hoa và số';
      valid = false;
    } else if (haveSpace(value)) {
      error = 'Mật khẩu không được chứa khoảng trắng';
      valid = false;
    } else if (!validateLength(value, { min: 8, max: 128 })) {
      error = 'Mật khẩu có độ dài từ 8 đến 128 ký tự';
      valid = false;
    } else {
      error = '';
      valid = true;
    }
    setPasswordField({
      value: value,
      error: error,
      valid: valid,
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    const params = {
      "username": usernameField.value,
      "password": passwordField.value
    }
    setGlobal({
      loading: true
    });
    authService.login(params)
      .then(res => {
        setGlobal({
          loading: false
        });
        if (res.status === 200) {
          const userInfoLogin = res.data;
          localStorage.setItem('userInfoLogin', JSON.stringify(userInfoLogin));
          Swal.fire(
            'Thành công!',
            `Xin chào ${userInfoLogin['username']} quay trở lại`,
            'success'
          )
            .then(() => {
              props.history.push('/');
            })
        }
      })
      .catch(err => {
        setGlobal({
          loading: false
        });
        if (err.response.status && err.response.status === 404) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Tài khoản hoặc mật khẩu không chính xác',
            'error'
          )
        } else if (err.response.status && err.response.status === 400) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Dữ liệu đầu vào có vấn đề',
            'error'
          )
        } else {
          props.history.push('/error');
        }
      })
      .finally(() => {
        setGlobal({
          loading: false
        });
      })
  }

  return (
    <div>
      <LoginForm
        textField={{
          usernameField: usernameField,
          passwordField: passwordField
        }}
        handleChange={{
          onChangeUsername: onChangeUsername,
          onChangePassword: onChangePassword,
        }}
        handleSubmit={submitForm}
      />
    </div>
  )
}
