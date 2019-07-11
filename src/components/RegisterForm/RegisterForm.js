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
import { validateUsername, validatePassword, validateEmail } from 'helpers/validators';
import { successSwal, errorSwal } from 'helpers/swal';


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
    let { value, error, valid } = emailField;
    value = e.target.value;
    const outputValidate = validateEmail({ value, error, valid });
    setEmailField(outputValidate);
  }

  const onChangeUsername = (e) => {
    let { value, error, valid } = usernameField;
    value = e.target.value;
    const outputValidate = validateUsername({ value, error, valid });
    setUsernameField(outputValidate);
  }

  const onChangePassword = (e) => {
    let { value, error, valid } = passwordField;
    value = e.target.value;
    const outputValidate = validatePassword({ value, error, valid });
    setPasswordField(outputValidate);
  }

  const onChangeConfirmPassword = (e) => {
    let { value, error, valid } = confirmPasswordField;
    value = e.target.value;

    if (value !== passwordField.value) {
      error = 'Mật khẩu không khớp!';
      valid = false;
    } else {
      error = '';
      valid = true;
    }
    setConfirmPasswordField({ value, error, valid });
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
        successSwal({
          title: 'Thành công!',
          content: 'Vui lòng kiểm tra email xác thực tài khoản để có thể đăng nhập vào trang web'
        }, () => {
          props.history.push('/dang-nhap')
        })
      })
      .catch(err => {
        setGlobal({
          loading: false,
        })
        if (err.response && err.response.status === 400) {
          if (err.response.data && err.response.data.typeError === 2)
            Swal.fire(
              'Có lỗi xảy ra!',
              'Username hoặc email đã được đăng ký trước đó',
              'error'
            )
          else if (err.response.data && err.response.data.typeError === 3)
            Swal.fire(
              'Có lỗi xảy ra!',
              'Tài khoản đã tồn tại nhưng chưa được xác thực, vui lòng kiểm tra email',
              'error'
            )
          else
            props.history.push('/error')
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
          Đăng ký
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
            label="Tên đăng nhập"
            type="text"
            onChange={onChangeUsername}
          />
          <InputText
            textField={passwordField}
            name="password"
            label="Mật khẩu"
            type="password"
            onChange={onChangePassword}
          />
          <InputText
            textField={confirmPasswordField}
            name="confirm-password"
            label="Nhập lại mật khẩu"
            type="password"
            onChange={onChangeConfirmPassword}
          />
          <ButtonCustom
            displayText="Đăng ký"
            disabled={
              !usernameField.valid || !passwordField.valid ||
              !emailField.valid || !confirmPasswordField.valid
            }
          />

          <Grid container>
            <Link to="/dang-nhap" variant="body2" component={RouteLink}>
              Đã có tài khoản? Đăng ký
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}