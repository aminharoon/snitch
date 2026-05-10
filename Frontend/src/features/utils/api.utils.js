import axios from "axios";


export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true
});

// api.interceptors.response.use((response) => response,

//     async (error) => {
//         const originalRequest = error.config;

//         // ❗ safety checks
//         if (!originalRequest || !error.response) {
//             return Promise.reject(error);
//         }

//         // ❗ ONLY skip refresh logic if it's the refresh token call or login call
//         const isRefreshCall = originalRequest.url?.includes("/refreshToken");
//         const isLoginCall = originalRequest.url?.includes("/login");

//         if (
//             er.status === 401 &&
//             !originalRror.responseequest._retry &&
//             !isRefreshCall &&
//             !isLoginCall
//         ) {
//             originalRequest._retry = true;

//             const refreshed = await refreshToken();

//             if (refreshed) {
//                 return api(originalRequest); // retry original request
//             } else {
//                 // ❗ refresh failed → logout + redirect
//                 window.location.href = "/login";
//                 return Promise.reject(error);
//             }
//         }

//         return Promise.reject(error);
//     }
// );
