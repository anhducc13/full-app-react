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
import { validateUsername, validateEmail } from 'helpers/validators';

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

export const ForgotPasswordForm = (props) => {
  const classes = useStyles();
  const initTextField = {
    value: '',
    error: '',
    valid: false,
  };
  const [emailField, setEmailField] = useState(initTextField);
  const [usernameField, setUsernameField] = useState(initTextField);

  const onChangeEmail = (e) => {
    let {value, error, valid} = emailField;
    value = e.target.value;
    const outputValidate = validateEmail({value, error, valid});
    setEmailField(outputValidate);
  }

  const onChangeUsername = (e) => {
    let {value, error, valid} = usernameField;
    value = e.target.value;
    const outputValidate = validateUsername({value, error, valid});
    setUsernameField(outputValidate);
  }

  const onSubmitForm = (e) => {
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
        if (err.response && err.response.status === 400) {
          Swal.fire(
            'Có lỗi xảy ra!',
            'Dữ liệu đầu vào có vấn đề',
            'error'
          )
        }
        else if (err.response && err.response.status === 404) {
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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Quên mật khẩu
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
          <ButtonCustom 
            displayText="Nhận mật khẩu mới"
            disabled={
              !usernameField.valid || !emailField.valid
            }
          />
          <Grid container>
            <Link to="/dang-nhap" variant="body2" component={RouteLink}>
              Đã có tài khoản? Đăng nhập
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}