import {jwtDecode} from "jwt-decode"

export const decodeToken = (token) =>{
    const data = jwtDecode(token);
    return data;
}