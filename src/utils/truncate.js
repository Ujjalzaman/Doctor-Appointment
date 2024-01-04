export const truncate = (str, max) =>{
    return str.length > max ? str?.subString(0, max-1) + '...' : str;
}