import jwtDecode from "jwt-decode"

export const decodeToken = (token) =>{
    return jwtDecode(token);
}