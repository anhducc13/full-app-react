import React, { useState } from 'react';
import { setGlobal } from 'reactn';
import Swal from 'sweetalert2';
import { authService } from 'services';
import { RegisterForm } from 'views/RegisterForm'
import {
  validateLength,
  haveSpace,
  isEmail,
  haveUpperCharacter,
  haveLowerCharacter,
  haveNumberCharacter,
  haveSpecialCharacter,
} from 'helpers/validators'

export const Register = (props) => {
  const initTextField = {
    value: '',
    error: '',
    valid: false,
  }

  const [emailField, setEmailField] = useState(initTextField);
  const [usernameField, setUsernameField] = useState(initTextField);
  const [passwordField, setPasswordField] = useState(initTextField);
  const [confirmPasswordField, setConfirmPasswordField] = useState(initTextField);

  const onChangeEmail = (e) => {
    let { value, error, valid } = emailField;
    value = e.target.value;
    if (isEmail(value)) {
      error = '';
      valid = true;
    } else {
      error = 'Email không hợp lệ!';
      valid = false;
    }
    setEmailField({
      value: value,
      error: error,
      valid: valid,
    });
  }

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

  const onChangeConfirmPassword = (e) => {
    const password = passwordField;
    let { value, error, valid } = confirmPasswordField;
    value = e.target.value;
    if (value !== password.value) {
      error = 'Mật khẩu không khớp!';
      valid = false;
    } else {
      error = '';
      valid = true;
    }
    setConfirmPasswordField({
      value: value,
      error: error,
      valid: valid,
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    const payload = {
      "username": usernameField.value,
      "email": emailField.value,
      "password": passwordField.value,
    }
    setGlobal({
      loading: true,
    })
    authService.register(payload)
      .then(() => {
        setGlobal({
          loading: false,
        })
        Swal.fire(
          'Thành công!',
          'Vui lòng kiểm tra email xác thực tài khoản để có thể đăng nhập vào trang web',
          'success'
        )
        props.history.push('/')
      })
      .catch(err => {
        setGlobal({
          loading: false,
        })
        if (err.response.status && err.response.status === 400) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Dữ liệu đầu vào có vấn đề',
            'error'
          )
        }
        else if (err.response.status && err.response.status === 409) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Username hoặc email đã được đăng ký trước đó',
            'error'
          )
        } else {
          props.history.push('/error')
        }
      })
  }

  return (
    <div>
      <RegisterForm
        textField={{
          emailField: emailField,
          usernameField: usernameField,
          passwordField: passwordField,
          confirmPasswordField: confirmPasswordField

        }}
        handleChange={{
          onChangeEmail: onChangeEmail,
          onChangeUsername: onChangeUsername,
          onChangePassword: onChangePassword,
          onChangeConfirmPassword: onChangeConfirmPassword
        }}
        handleSubmit={submitForm}
      />
    </div>
  )
}
