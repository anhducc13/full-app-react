import React, { useState } from 'react';
import { setGlobal } from 'reactn';
import Swal from 'sweetalert2';
import { authService } from 'services';
import { ResetPasswordForm } from 'views/ResetPasswordForm'
import {
  validateLength,
  haveSpace,
  haveUpperCharacter,
  haveLowerCharacter,
  haveNumberCharacter,
  haveSpecialCharacter,
} from 'helpers/validators'

export const ResetPassword = (props) => {
  const initTextField = {
    value: '',
    error: '',
    valid: false,
  }

  const [passwordField, setPasswordField] = useState(initTextField);
  const [newPasswordField, setNewPasswordField] = useState(initTextField);
  const [confirmNewPasswordField, setConfirmNewPasswordField] = useState(initTextField);

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

  const onChangeNewPassword = (e) => {
    let { value, error, valid } = newPasswordField;
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
    setNewPasswordField({
      value: value,
      error: error,
      valid: valid,
    });
  }

  const onChangeConfirmNewPassword = (e) => {
    const newPassword = newPasswordField;
    let { value, error, valid } = confirmNewPasswordField;
    value = e.target.value;
    if (value !== newPassword.value) {
      error = 'Mật khẩu không khớp!';
      valid = false;
    } else {
      error = '';
      valid = true;
    }
    setConfirmNewPasswordField({
      value: value,
      error: error,
      valid: valid,
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    const payload = {
      "old_pass": passwordField.value,
      "new_pass": newPasswordField.value,
    }
    setGlobal({
      loading: true,
    })
    const accessToken = JSON.parse(localStorage.getItem('userInfoLogin'))['access_token'];
    authService.resetPassword(payload, accessToken)
      .then(() => {
        setGlobal({
          loading: false,
        })
        Swal.fire(
          'Thành công!',
          'Mật khẩu của bạn đã được thay đổi',
          'success'
        )
          .then(() => {
            props.history.push('/home')
          })
      })
      .catch(err => {
        setGlobal({
          loading: false,
        })
        if (err.response.status && err.response.status === 401) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Từ chối truy cập',
            'error'
          )
            .then(() => {
              props.history.push('/error')
            })
        } else if (err.response.data.message && err.response.data.message === "password is not match") {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Mật khẩu nhập không chính xác',
            'error'
          )
        } else {
          props.history.push('/error')
        }
      })
  }

  return (
    <div>
      <ResetPasswordForm
        textField={{
          passwordField,
          newPasswordField,
          confirmNewPasswordField

        }}
        handleChange={{
          onChangePassword,
          onChangeNewPassword,
          onChangeConfirmNewPassword
        }}
        handleSubmit={submitForm}
      />
    </div>
  )
}
