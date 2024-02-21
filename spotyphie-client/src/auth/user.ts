class UserManager {
    static isAdmin() {
        return localStorage.getItem('is_admin') === 'true';
    }

}

export default UserManager;