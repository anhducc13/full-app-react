import { withRouter, Link } from 'react-router-dom'
import React from 'react';
import { setGlobal } from 'reactn';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Swal from 'sweetalert2';
import { authService } from 'services';
import { Auth } from 'helpers/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
                  history.push('/login')
                })
            })
            .catch(err => {
              localStorage.removeItem('userInfoLogin')
              setGlobal({
                loading: false,
              })
              if (err.response.status && err.response.status === 401) {
                Swal.fire(
                  'Có lỗi xảy ra!',
                  'Từ chối truy cập',
                  'error'
                )
                  .then(() => {
                    history.push('/error')
                  })
              } else {
                history.push('/error')
              }
            })
        }
      })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DUCTT
          </Typography>
          {Auth.isAuthenticated() ? (
            <div>
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
              <Button color="inherit" component={Link} to="/reset-password">Reset Password</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
              <div>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </div>

            )}

        </Toolbar>
      </AppBar>
    </div>
  )
})