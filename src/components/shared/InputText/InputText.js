import React from 'react';
import TextField from '@material-ui/core/TextField';

export const InputText = (props) => {
  const { name, label, textField, type, onChange} = props;

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type || "text"}
      value={textField.value}
      error={textField.error !== ''}
      helperText={textField.valid ? '' : textField.error}
      onChange={onChange}
    />
  )
}
