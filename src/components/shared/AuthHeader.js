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
                  history.push('/login')
                })
            })
            .catch(err => {
              localStorage.removeItem('userInfoLogin')
              setGlobal({
                loading: false,
              })
              if (err.response && err.response.status === 401) {
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
    // <div className={classes.root}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography variant="h6" className={classes.title}>
    //         DUCTT
    //       </Typography>
    //       {Auth.isAuthenticated() ? (
    //         <div>
    //           <Button color="inherit" component={Link} to="/profile">Profile</Button>
    //           <Button color="inherit" component={Link} to="/update-password">Reset Password</Button>
    //           <Button color="inherit" onClick={handleLogout}>Logout</Button>
    //         </div>
    //       ) : (
    //           <div>
    //             <Button color="inherit" component={Link} to="/login">Login</Button>
    //             <Button color="inherit" component={Link} to="/register">Register</Button>
    //           </div>

    //         )}

    //     </Toolbar>
    //   </AppBar>
    // </div>
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            {Auth.isAuthenticated() ? `Welcome ${Auth.username}` : 'DUCTT'}
          </Typography>
          {Auth.isAuthenticated() ? (
            <React.Fragment>
              <nav>
                <Link variant="button" color="textPrimary" to="/profile" component={RouterLink} className={classes.link}>
                  Profile
                </Link>
                <Link variant="button" color="textPrimary" to="/update-password" component={RouterLink} className={classes.link}>
                  Update Password
                </Link>
              </nav>
              <Button onClick={handleLogout} color="primary" variant="outlined" className={classes.link}>
                Logout
              </Button>
            </React.Fragment>
          ) : (
              <nav>
                <Link variant="button" color="textPrimary" to="/login" component={RouterLink} className={classes.link}>
                  Login
            </Link>
                <Link variant="button" color="textPrimary" to="/register" component={RouterLink} className={classes.link}>
                  Register
            </Link>
                <Link variant="button" color="textPrimary" to="/forgot-password" component={RouterLink} className={classes.link}>
                  Forgot Password
            </Link>
              </nav>
            )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
})