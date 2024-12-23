import axiosInstance from "../Interceptor/AxiosInterceptor";


const getNotifications = async (id: any) => {
    return axiosInstance.get(`/notification/get/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });

}

const readNotifications = async (id: any) => {
    return axiosInstance.put(`/notification/read/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });

}


export { getNotifications, readNotifications }

