import CookieManager from "../auth/cookie"; 

export const restUrl = `http://localhost:${import.meta.env.VITE_SPOTYPHIE_REST_PORT_HOST}`;

export const authHeader = {
    headers: {
      Authorization: `Bearer ${CookieManager.readCookie('token')}`,
      'Content-Type': 'application/json',
    },
};


export function sessionHandler(response_num : number){
  if(response_num === 401){
    alert('invalid token, please login again!');
    localStorage.clear();
    CookieManager.deleteCookie('token');
    window.location.href = '/';
  }
  else if(response_num === 403){
    alert('you are not allowed to access this page!');
    window.location.href = '/';
  }
  else if(response_num === 404){
    window.location.href = '/*';
  }

}