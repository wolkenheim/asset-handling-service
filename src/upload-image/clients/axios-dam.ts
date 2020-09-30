import axios from 'axios';
let authToken = "xxx";
async function axiosDam() {
    let axiosInstance = axios.create({
        headers: {
            'Authorization': "Bearer " + authToken
        }
    });

    return axiosInstance;
}


export { axiosDam };