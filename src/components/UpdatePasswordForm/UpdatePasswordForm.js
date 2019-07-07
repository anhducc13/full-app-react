import React, { useState } from 'react';
import { setGlobal } from 'reactn';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouteLink } from 'react-router-dom';
import { Button as ButtonCustom } from '../shared/Button';
import { InputText } from '../shared/InputText';
import Swal from 'sweetalert2';
import { authService } from 'services';
import { validatePassword } from 'helpers/validators';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export const UpdatePasswordForm = (props) => {
  const classes = useStyles();

  const initTextField = {
    value: '',
    error: '',
    valid: false,
  };
  const [passwordField, setPasswordField] = useState(initTextField);
  const [newPasswordField, setNewPasswordField] = useState(initTextField);
  const [confirmNewPasswordField, setConfirmNewPasswordField] = useState(initTextField);

  const onChangePassword = (e) => {
    let inputValidate = Object.assign(passwordField);
    inputValidate.value = e.target.value;
    const outputValidate = validatePassword(inputValidate);
    setPasswordField(outputValidate);
  }

  const onChangeNewPassword = (e) => {
    let inputValidate = Object.assign(newPasswordField);
    inputValidate.value = e.target.value;
    const outputValidate = validatePassword(inputValidate);
    setNewPasswordField(outputValidate);
  }

  const onChangeConfirmNewPassword = (e) => {
    const { value } = newPasswordField;
    let inputValidate = Object.assign(confirmNewPasswordField);
    inputValidate.value = e.target.value;

    if (inputValidate.value !== value) {
      inputValidate.error = 'Mật khẩu không khớp!';
      inputValidate.valid = false;
    } else {
      inputValidate.error = '';
      inputValidate.valid = true;
    }
    setConfirmNewPasswordField(inputValidate);
  }

  const onSubmitForm = (e) => {
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
        if (err.response && err.response.status === 401) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Từ chối truy cập',
            'error'
          )
            .then(() => {
              props.history.push('/error')
            })
        } else if (err.response && err.response.data.message === "password is not match") {
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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <InputText
            textField={passwordField}
            name="password"
            label="Password"
            type="password"
            onChange={onChangePassword}
          />
          <InputText
            textField={newPasswordField}
            name="new-password"
            label="New Password"
            type="password"
            onChange={onChangeNewPassword}
          />
          <InputText
            textField={confirmNewPasswordField}
            name="confirm-new-password"
            label="Confirm New Password"
            type="password"
            onChange={onChangeConfirmNewPassword}
          />
          <ButtonCustom
            displayText="Update"
            disabled={
              !passwordField.valid || !newPasswordField.valid || 
              !confirmNewPasswordField.valid
            }
          />
          <Grid container>
            <Link to="/home" variant="body2" component={RouteLink}>
              Back to home
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}