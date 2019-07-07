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
import { validateUsername, validatePassword } from 'helpers/validators';


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
    marginTop: theme.spacing(1),
  },
}));

export const LoginForm = (props) => {
  const classes = useStyles();

  const initTextField = {
    value: '',
    error: '',
    valid: false,
  };

  const [usernameField, setUsernameField] = useState(initTextField);
  const [passwordField, setPasswordField] = useState(initTextField);

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

  const onSubmitForm = (e) => {
    e.preventDefault();
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
              props.history.push('/home');
            })
        }
      })
      .catch(err => {
        console.log(err)
        setGlobal({
          loading: false
        });
        if (err.response && err.response.status === 404) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Tài khoản hoặc mật khẩu không chính xác',
            'error'
          )
        } else if (err.reponse && err.response.status === 400) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Dữ liệu đầu vào có vấn đề',
            'error'
          )
        } else {
          props.history.push('/error');
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
          Login
        </Typography>
        <form className={classes.form} onSubmit={onSubmitForm} noValidate>
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
          <ButtonCustom
            displayText="Login"
            disabled={!usernameField.valid || !passwordField.valid}
          />
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2" component={RouteLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" component={RouteLink}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}