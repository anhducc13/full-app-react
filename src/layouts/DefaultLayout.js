import React from 'react';
import { setGlobal } from 'reactn';
import { Link as RouterLink, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Home } from 'views/Home';
import { Profile } from 'views/Profile';
import { UpdatePassword } from 'views/UpdatePassword';
import PrivateRoute from 'routes/PrivateRoute';
import { successSwal, errorSwal, okCancelSwal } from 'helpers/swal';
import { authService } from 'services';
import { Auth } from 'helpers/auth';

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

export const DefaultLayout = (props) => {
  const username = Auth.isAuthenticated() ? Auth.username : '';
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
            successSwal({
              title: 'Thành công!',
              content: 'Tạm biệt'
            }, () => {
              localStorage.removeItem('userInfoLogin')
              props.history.push('/dang-nhap')
            })
          })
          .catch(err => {
            localStorage.removeItem('userInfoLogin')
            setGlobal({
              loading: false,
            })
            if (err.response && err.response.status === 401)
              errorSwal({
                title: 'Có lỗi xảy ra!',
                content: err.response.data.message
              }, () => {
                props.history.push('/dang-nhap')
              })
            else
              props.history.push('/dang-nhap')
          })
      }
    })
  }

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              {`Xin chào ${username}`}
            </Typography>
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
          </Toolbar>
        </AppBar>
      </React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/trang-chu" component={Home} />
        <PrivateRoute exact path="/trang-ca-nhan" component={Profile} />
        <PrivateRoute exact path="/doi-mat-khau" component={UpdatePassword} />
      </Switch>
    </div>
  )
}
