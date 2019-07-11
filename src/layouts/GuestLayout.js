import React from 'react';
import { Link as RouterLink, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Login } from 'views/Login';
import { Register } from 'views/Register';
import { ForgotPassword } from 'views/ForgotPassword';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textTransform: "uppercase"
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export const GuestLayout = () => {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              DUCTT
          </Typography>
            <nav>
              <Link variant="button" color="textPrimary" to="/dang-nhap" component={RouterLink} className={classes.link}>
                Đăng nhập
            </Link>
              <Link variant="button" color="textPrimary" to="/dang-ky" component={RouterLink} className={classes.link}>
                Đăng ký
            </Link>
              <Link variant="button" color="textPrimary" to="/quen-mat-khau" component={RouterLink} className={classes.link}>
                Quên mật khẩu
            </Link>
            </nav>
          </Toolbar>
        </AppBar>
      </React.Fragment>
      <Switch>
        <Route exact path="/dang-nhap" component={Login} />
        <Route exact path="/dang-ky" component={Register} />
        <Route exact path="/quen-mat-khau" component={ForgotPassword} />
      </Switch>
    </div>
  )
}
