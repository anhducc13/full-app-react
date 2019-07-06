export const validateLength = (text, option = { min: 0}) => {
    if(text.length < option.min)
        return false;
    if(option && option.max && text.length > option.max)
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