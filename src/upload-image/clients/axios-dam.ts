import axios from 'axios';
const authToken = "xxx";
async function axiosDam() {
    const axiosInstance = axios.create({
        headers: {
            'Authorization': "Bearer " + authToken
        }
    });

    return axiosInstance;
}


export { axiosDam }