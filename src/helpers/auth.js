export const Auth = {
    username: '',
    isAdmin: false,
    isAuthenticated() {
        const userInfoLogin = JSON.parse(localStorage.getItem('userInfoLogin'));
        if (userInfoLogin === null) return false;
        this.username = userInfoLogin['username'];
        this.isAdmin = userInfoLogin['isAdmin'] === 'true'
        if (Date.now() - userInfoLogin['timeExpired'] < 0) {
            return false;
        }
        return true;
    },
}