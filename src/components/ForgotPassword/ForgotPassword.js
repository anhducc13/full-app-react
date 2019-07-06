import React, { useState } from 'react';
import { setGlobal } from 'reactn';
import Swal from 'sweetalert2';
import { authService } from 'services';
import { ForgotPasswordForm } from 'views/ForgotPasswordForm'
import {
  validateLength,
  haveSpace,
  isEmail,
  haveLowerCharacter,
  haveNumberCharacter,
  haveSpecialCharacter,
} from 'helpers/validators'

export const ForgotPassword = (props) => {
  const initTextField = {
    value: '',
    error: '',
    valid: false,
  }

  const [emailField, setEmailField] = useState(initTextField);
  const [usernameField, setUsernameField] = useState(initTextField);

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

  const submitForm = (e) => {
    e.preventDefault()
    const payload = {
      "username": usernameField.value,
      "email": emailField.value,
    }
    setGlobal({
      loading: true,
    })
    authService.forgotPassword(payload)
      .then(() => {
        setGlobal({
          loading: false,
        })
        Swal.fire(
          'Thành công!',
          'Vui lòng kiểm tra email để lấy lại mật khẩu',
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
        else if (err.response.status && err.response.status === 404) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Username hoặc email chưa được đăng ký',
            'error'
          )
        } else {
          props.history.push('/error')
        }
      })
  }

  return (
    <div>
      <ForgotPasswordForm
        textField={{
          emailField,
          usernameField,

        }}
        handleChange={{
          onChangeEmail,
          onChangeUsername,
        }}
        handleSubmit={submitForm}
      />
    </div>
  )
}
