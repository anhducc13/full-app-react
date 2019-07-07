import React from 'react';
import { Button as ButtonMaterial} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const Button = (props) => {
  const classes = useStyles();
  const { displayText, disabled } = props;

  return (
    <ButtonMaterial
      size="large"
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={disabled}
    >
      {displayText}
    </ButtonMaterial>
  )
}
