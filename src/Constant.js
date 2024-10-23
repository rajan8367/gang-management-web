export const apiUrl = 'https://devops1.uppcl.org/gangmanagement/api/'
//export const apiUrl = 'http://192.168.1.14:5002/api/'
export function formatDate(date){
    const dt = new Date(date);
    return dt.getDate()+'/'+(dt.getMonth()+1) +'/'+ dt.getFullYear()
}