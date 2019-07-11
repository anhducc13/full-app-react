export const Auth = {
    username: '',
    isAdmin: false,
    isAuthenticated() {
        const userInfoLogin = JSON.parse(localStorage.getItem('userInfoLogin'));
        if (userInfoLogin === null) return false;
        this.username = userInfoLogin['username'];
        this.isAdmin = userInfoLogin['isAdmin'] === 'true'
        console.log(Date.now() - userInfoLogin['timeExpired'] * 1000)
        if (Date.now() - userInfoLogin['timeExpired'] * 1000 > 0) {
            localStorage.removeItem('userInfoLogin')
            alert('Phiên làm việc kết thúc, vui lòng đăng nhập để tiếp tục')
            return false;
        }
        return true;
    },
}