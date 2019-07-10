import { withRouter, Link as RouterLink } from 'react-router-dom'
import React from 'react';
import { setGlobal } from 'reactn';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Swal from 'sweetalert2';
import { authService } from 'services';
import { Auth } from 'helpers/auth'

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


export const AuthHeaderBar = withRouter(({ history }) => {

  const classes = useStyles();

  const handleLogout = () => {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: "Đăng xuất!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    })
      .then((result) => {
        if (result.value) {
          setGlobal({
            loading: true,
          })
          const accessToken = JSON.parse(localStorage.getItem('userInfoLogin'))['access_token'];
          authService.logout(accessToken)
            .then(() => {
              setGlobal({
                loading: false,
              })
              Swal.fire(
                'Thành công!',
                'Tạm biệt',
                'success'
              )
                .then(() => {
                  localStorage.removeItem('userInfoLogin')
                  history.push('/dang-nhap')
                })
            })
            .catch(err => {
              localStorage.removeItem('userInfoLogin')
              setGlobal({
                loading: false,
              })
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
            {Auth.isAuthenticated() ? `Xin chào ${Auth.username}` : 'DUCTT'}
          </Typography>
          {Auth.isAuthenticated() ? (
            <React.Fragment>
              <nav>
                <Link variant="button" color="textPrimary" to="/trang-ca-nhan" component={RouterLink} className={classes.link}>
                  Trang cá nhân
                </Link>
                <Link variant="button" color="textPrimary" to="/doi-mat-khau" component={RouterLink} className={classes.link}>
                  Đổi mật khẩu
                </Link>
              </nav>
              <Button onClick={handleLogout} color="primary" variant="outlined" className={classes.link}>
                Đăng xuất
              </Button>
            </React.Fragment>
          ) : (
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
            )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
})