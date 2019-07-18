import React, { useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';
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
import { validatePassword } from 'helpers/validators';
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
    backgroundColor: theme.palette.primary.light,
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
    let { value, error, valid } = passwordField;
    value = e.target.value;
    const outputValidate = validatePassword({ value, error, valid });
    setPasswordField(outputValidate);
  }

  const onChangeNewPassword = (e) => {
    let { value, error, valid } = newPasswordField;
    value = e.target.value;
    const outputValidate = validatePassword({ value, error, valid });
    setNewPasswordField(outputValidate);
  }

  const onChangeConfirmNewPassword = (e) => {
    let { value, error, valid } = confirmNewPasswordField;
    value = e.target.value;

    if (value !== newPasswordField.value) {
      error = 'Mật khẩu không khớp';
      valid = false;
    } else {
      error = '';
      valid = true;
    }
    setConfirmNewPasswordField({ value, error, valid });
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    const payload = {
      "old_password": passwordField.value,
      "new_password": newPasswordField.value,
    }
    setGlobal({
      loading: true,
    })
    const accessToken = JSON.parse(localStorage.getItem('userInfoLogin'))['accessToken'];
    authService.updatePassword(payload, accessToken)
      .then(() => {
        setGlobal({
          loading: false,
        })
        successSwal({
          title: 'Thành công!',
          content: 'Mật khẩu của bạn đã được thay đổi'
        }, () => {
          props.history.push('/')
        })
      })
      .catch(err => {
        console.log(err.response)
        setGlobal({
          loading: false,
        })
        if (err.response && err.response.status === 400) {
          errorSwal({
            title: 'Có lỗi xảy ra!',
            content: err.response.data.message
          })
        }
        else
          errorSwal({
            title: 'Có lỗi xảy ra!',
            content: err.response.data.message
          }, () => {
            props.history.push('/error')
          })
      })
  }

  const [ loading ] = useGlobal('loading')

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Thay đổi mật khẩu
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <InputText
            textField={passwordField}
            name="password"
            label="Mật khẩu cũ"
            type="password"
            onChange={onChangePassword}
          />
          <InputText
            textField={newPasswordField}
            name="new-password"
            label="Mật khẩu mới"
            type="password"
            onChange={onChangeNewPassword}
          />
          <InputText
            textField={confirmNewPasswordField}
            name="confirm-new-password"
            label="Nhập lại mật khẩu mới"
            type="password"
            onChange={onChangeConfirmNewPassword}
          />
          <ButtonCustom
            displayText="Thay đổi"
            disabled={
              !!loading ||
              !passwordField.valid || !newPasswordField.valid ||
              !confirmNewPasswordField.valid
            }
          />
          <Grid container>
            <Link to="/" variant="body2" component={RouteLink}>
              Về trang chủ
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}