export const truncate = (str, max) =>{
    return str.length > max ? str.substring(0, max-1) + '...' : str;
}