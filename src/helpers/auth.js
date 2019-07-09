export const Auth = {
    username: '',
    isAdmin: false,
    isAuthenticated() {
        const userInfoLogin = JSON.parse(localStorage.getItem('userInfoLogin'));
        if(userInfoLogin === null) return false;
        if(Date.now() - userInfoLogin['time_expired'] < 0) return false;
        this.username = userInfoLogin['username'];
        this.isAdmin = userInfoLogin['is_admin'] === 'true'
        return true;
    },
}