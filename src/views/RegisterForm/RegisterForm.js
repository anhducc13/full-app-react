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

export const RegisterForm = (props) => {
  const classes = useStyles();

  const {
    emailField,
    usernameField,
    passwordField,
    confirmPasswordField,
  } = props.textField;

  const {
    onChangeEmail,
    onChangeUsername,
    onChangePassword,
    onChangeConfirmPassword,
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
          Register
        </Typography>
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            value={emailField.value}
            error={emailField.error !== ''}
            onChange={onChangeEmail}
            helperText={emailField.valid ? "" : emailField.error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={usernameField.value}
            error={usernameField.error !== ''}
            onChange={onChangeUsername}
            helperText={usernameField.valid ? "" : usernameField.error}
          />
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
            name="confirm-password"
            label="Confirm Password"
            type="confirm-password"
            id="confirm-password"
            value={confirmPasswordField.value}
            error={confirmPasswordField.error !== ''}
            onChange={onChangeConfirmPassword}
            helperText={confirmPasswordField.valid ? "" : confirmPasswordField.error}
          />
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              !emailField.valid || !usernameField.valid
              || !passwordField.valid || !confirmPasswordField.valid
            }
          >
            Register
          </Button>
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