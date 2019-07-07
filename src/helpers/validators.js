export const validateLength = (text, option = { min: 0 }) => {
    if (text.length < option.min)
        return false;
    if (option && option.max && text.length > option.max)
        return false;
    return true
}

export const haveSpace = (text) => {
    return text.includes(" ")
}

export const haveUpperCharacter = (text) => {
    const regex = /[A-Z]/g
    return regex.test(text);
}

export const haveLowerCharacter = (text) => {
    const regex = /[a-z]/g
    return regex.test(text);
}

export const haveNumberCharacter = (text) => {
    const regex = /[0-9]/g
    return regex.test(text);
}

export const isEmail = (email) => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexEmail.test(email.toLowerCase())
}

export const haveSpecialCharacter = (text) => {
    const regex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/
    return !regex.test(text)
}

export const validateUsername = ({ value, error, valid }) => {
    if (
        !haveLowerCharacter(value.toLowerCase())
        || !haveNumberCharacter(value)
        || haveSpecialCharacter(value)
    ) {
        error = 'Tên đăng nhập chỉ bao gồm chữ cái và số';
        valid = false;
    } else if (haveSpace(value)) {
        error = 'Tên đăng nhập không được chứa khoảng trắng';
        valid = false;
    } else if (!validateLength(value, { min: 6, max: 128 })) {
        error = 'Tên đăng nhập có độ dài từ 6 đến 128 ký tự';
        valid = false;
    } else {
        error = '';
        valid = true;
    }
    return { value, error, valid }
}

export const validateEmail = ({ value, error, valid }) => {
    if (isEmail(value)) {
        error = '';
        valid = true;
    } else {
        error = 'Email không hợp lệ!';
        valid = false;
    }
    return { value, error, valid }
}

export const validatePassword = ({ value, error, valid }) => {
    if (
        !haveLowerCharacter(value)
        || !haveUpperCharacter(value)
        || !haveNumberCharacter(value)
        || haveSpecialCharacter(value)
      ) {
        error = 'Mật khẩu chỉ bao gồm chữ thường, chữ hoa và số';
        valid = false;
      } else if (haveSpace(value)) {
        error = 'Mật khẩu không được chứa khoảng trắng';
        valid = false;
      } else if (!validateLength(value, { min: 8, max: 128 })) {
        error = 'Mật khẩu có độ dài từ 8 đến 128 ký tự';
        valid = false;
      } else {
        error = '';
        valid = true;
      }
    return { value, error, valid }
}