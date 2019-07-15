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
import { authService } from 'services';
import { validateUsername, validatePassword } from 'helpers/validators';
import { errorSwal } from 'helpers/swal';
import { toast } from 'react-toastify';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
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

  const resetForm = () => {
    setUsernameField(initTextField);
    setPasswordField(initTextField);
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
        console.log(res)
        setGlobal({
          loading: false
        });
        if (res.status === 200) {
          const userInfoLogin = res.data;
          localStorage.setItem('userInfoLogin', JSON.stringify(userInfoLogin));
          toast.success(`Xin chào ${userInfoLogin['username']} quay trở lại`);
          props.history.push('/');
        }
      })
      .catch(err => {
        setGlobal({
          loading: false
        });
        if (err.response && err.response.data)
          errorSwal({
            title: 'Có lỗi xảy ra!',
            content: err.response.data.message || ''
          }, resetForm)
        else
          props.history.push('/error');
      })
  }


  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Đăng nhập
        </Typography>
        <form className={classes.form} onSubmit={onSubmitForm} noValidate>
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
          <ButtonCustom
            displayText="Đăng nhập"
            disabled={!usernameField.valid || !passwordField.valid}
          />
          <Grid container>
            <Grid item xs>
              <Link to="/quen-mat-khau" variant="body2" component={RouteLink}>
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/dang-ky" variant="body2" component={RouteLink}>
                Chưa có tài khoản? Đăng ký
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}