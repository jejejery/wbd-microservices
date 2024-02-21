class CookieManager {
    static createCookie(name : string, value : string, time : number) {
        let expires = "";
        if (time) {
            let date = new Date();
            date.setTime(date.getTime() + (time * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    static readCookie(name : string) {
        let nameEQ = name + "=";
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    static updateCookie(name : string, value : string, time : number) {
        this.createCookie(name, value, time);
    }

    static deleteCookie(name : string) {
        this.createCookie(name, "", -1);
    }
}

export default CookieManager;