export const API_PATH = {
    LOGIN: getPath("auth/login"),
    REGISTER: getPath("auth/register"),
    RESETPASSWORD: getPath("newPassword"),
    CONFIRMCODE: getPath("verifyCode"),
    RESENDCODE: getPath("resendCode"),
    UPDATEUSER: getPath("users"),
    USERSTATUS: getPath("user/status"),
    ADDIMG: getPath("img/upload"),
    LOGIN_GOOGLE: getPath("auth/google"),
    LOGOUT: getPath("auth/logout"),
    VERIFY_EMAIL: getPath("verify-email"),
    DETAIL_ACCOMMODATION: getPath("accommodation/:id"),
    ACCOMODATIONUSER: getPath("accommodationUser"),
    BENEFIT: getPath("benefit"),
    ORDER: getPath("orderHistory"),
    ORDERDETAIL: getPath("order/:id"),
    DETELEORDER: getPath("orderUpdate"),
    ROOM: getPath("roomUser"),
    RATES: getPath("rates"),
    CREATERATE: getPath("rates"),
    CREATEORDER: getPath("order"),
    SABANK: getPath("sabank")
  };
  
  function getPath(path) {
    return `https://backend.trothalo.click/api/v1/${path}`;
  }
  
  export default API_PATH;
  