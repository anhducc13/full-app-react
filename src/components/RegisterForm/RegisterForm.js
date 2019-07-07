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
import { validateUsername, validatePassword, validateEmail } from 'helpers/validators'


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

export const RegisterForm = (props) => {
  const classes = useStyles();

  const initTextField = {
    value: '',
    error: '',
    valid: false,
  };
  const [usernameField, setUsernameField] = useState(initTextField);
  const [emailField, setEmailField] = useState(initTextField);
  const [passwordField, setPasswordField] = useState(initTextField);
  const [confirmPasswordField, setConfirmPasswordField] = useState(initTextField);

  const onChangeEmail = (e) => {
    let inputValidate = Object.assign(emailField);
    inputValidate.value = e.target.value;
    const outputValidate = validateEmail(inputValidate);
    setEmailField(outputValidate);
  }

  const onChangeUsername = (e) => {
    let inputValidate = Object.assign(usernameField);
    inputValidate.value = e.target.value;
    const outputValidate = validateUsername(inputValidate);
    setUsernameField(outputValidate);
  }

  const onChangePassword = (e) => {
    let inputValidate = Object.assign(passwordField);
    inputValidate.value = e.target.value;
    const outputValidate = validatePassword(inputValidate);
    setPasswordField(outputValidate);
  }

  const onChangeConfirmPassword = (e) => {
    const { password } = passwordField;
    let inputValidate = Object.assign(confirmPasswordField);
    inputValidate.value = e.target.value;

    if (inputValidate.value !== password.value) {
      inputValidate.error = 'Mật khẩu không khớp!';
      inputValidate.valid = false;
    } else {
      inputValidate.error = '';
      inputValidate.valid = true;
    }
    setConfirmPasswordField(inputValidate);
  }

  const onSubmitForm = (e) => {
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
        if (err.response && err.response.status === 400) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Dữ liệu đầu vào có vấn đề',
            'error'
          )
        }
        else if (err.response && err.response.status === 409) {
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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <InputText
            textField={emailField}
            name="email"
            label="Email"
            type="email"
            onChange={onChangeEmail}
          />
          <InputText
            textField={usernameField}
            name="username"
            label="Username"
            type="text"
            onChange={onChangeUsername}
          />
          <InputText
            textField={passwordField}
            name="password"
            label="Password"
            type="password"
            onChange={onChangePassword}
          />
          <InputText
            textField={confirmPasswordField}
            name="confirm-password"
            label="Confirm Password"
            type="password"
            onChange={onChangeConfirmPassword}
          />
          <ButtonCustom
            displayText="Register"
            disabled={
              !usernameField.valid || !passwordField.valid ||
              !emailField.valid || !confirmPasswordField.valid
            }
          />

          <Grid container>
            <Link to="/login" variant="body2" component={RouteLink}>
              Have an account? Login
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}