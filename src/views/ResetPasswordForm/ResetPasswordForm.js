import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouteLink} from 'react-router-dom'

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ResetPasswordForm = (props) => {
  const classes = useStyles();

  const {
    passwordField,
    newPasswordField,
    confirmNewPasswordField,
  } = props.textField;

  const {
    onChangePassword,
    onChangeNewPassword,
    onChangeConfirmNewPassword,
  } = props.handleChange

  const submitForm = props.handleSubmit

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
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={passwordField.value}
            error={passwordField.error !== ''}
            onChange={onChangePassword}
            helperText={passwordField.valid ? "" : passwordField.error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new-password"
            label="New Password"
            type="new-password"
            id="new-password"
            value={newPasswordField.value}
            error={newPasswordField.error !== ''}
            onChange={onChangeNewPassword}
            helperText={newPasswordField.valid ? "" : newPasswordField.error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-new-password"
            label="Confirm New Password"
            type="confirm-new-password"
            id="confirm-new-password"
            value={confirmNewPasswordField.value}
            error={confirmNewPasswordField.error !== ''}
            onChange={onChangeConfirmNewPassword}
            helperText={confirmNewPasswordField.valid ? "" : confirmNewPasswordField.error}
          />
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !passwordField.valid || !newPasswordField.valid
              || !confirmNewPasswordField.valid
            }
          >
            Reset
          </Button>
          <Grid container>
            <Link to="/" variant="body2" component={RouteLink}>
              Back to home
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
}