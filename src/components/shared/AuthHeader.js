import { withRouter, NavLink } from 'react-router-dom'
import React from 'react';
import { setGlobal } from 'reactn';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { authService } from 'services';
import { okCancelSwal } from 'helpers/swal';
import { toast } from 'react-toastify';


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

export const AuthHeaderBar = withRouter(({ history, location }) => {
  const classes = useStyles();

  const handleLogout = () => {
    okCancelSwal({
      title: 'Bạn có chắc?',
      content: 'Đăng xuất!'
    }, (result) => {
      if (result.value) {
        setGlobal({
          loading: true,
        })
        const accessToken = JSON.parse(localStorage.getItem('userInfoLogin'))['accessToken'];
        authService.logout(accessToken)
          .then(() => {
            setGlobal({
              loading: false,
            })
            localStorage.removeItem('userInfoLogin')
            toast.info(`Tạm biệt`);
            history.push('/dang-nhap')
          })
          .catch(err => {
            localStorage.removeItem('userInfoLogin')
            toast.error(`Có lỗi xảy ra`);
            history.push('/dang-nhap')
          })
      }
    })
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            DUCTT
          </Typography>
          <nav>
            <Link
              variant="button"
              underline={location.pathname === '/' ? "always" : "hover"}
              color="textPrimary"
              to="/"
              component={NavLink}
              className={classes.link}
            >
              Trang chủ
            </Link>
            <Link
              variant="button"
              underline={location.pathname === '/trang-ca-nhan' ? "always" : "hover"}
              color="textPrimary"
              to="/trang-ca-nhan"
              component={NavLink}
              className={classes.link}
            >
              Trang cá nhân
            </Link>
            <Link
              variant="button"
              underline={location.pathname === '/doi-mat-khau' ? "always" : "hover"}
              color="textPrimary"
              to="/doi-mat-khau"
              component={NavLink}
              className={classes.link}
            >
            Đổi mật khẩu
            </Link>
          </nav>
          <Button onClick={handleLogout} color="primary" variant="outlined" className={classes.link}>
            Đăng xuất
              </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
})