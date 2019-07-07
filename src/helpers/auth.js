export const Auth = {
    isAuthenticated() {
        const userInfoLogin = localStorage.getItem('userInfoLogin');
        if(userInfoLogin === null) return false;
        if(Date.now() - userInfoLogin['time_expired'] < 0) return false
        return true;
    },
    isAdmin() {
        return false;
    }
}