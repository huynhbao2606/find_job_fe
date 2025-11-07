"use client"
import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (!error.response) {
            await Swal.fire({
                icon: "error",
                title: "Không thể kết nối đến máy chủ ",
                text: "Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.",
                confirmButtonColor: "#6b46c1",
            });
            return Promise.reject(error);
        }

        const { status } = error.response;

        if (status === 401) {
            await Swal.fire({
                icon: "warning",
                title: "Phiên đăng nhập đã hết hạn",
                text: "Vui lòng đăng nhập lại để tiếp tục.",
                confirmButtonColor: "#6b46c1",
            });
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
        else if (status === 403) {
            await Swal.fire({
                icon: "error",
                title: "Truy cập bị từ chối ",
                text: "Bạn không có quyền truy cập vào tài nguyên này.",
                confirmButtonColor: "#6b46c1",
            });
        }
        else if (status >= 500) {
            await Swal.fire({
                icon: "error",
                title: "Lỗi máy chủ ",
                text: "Có sự cố từ phía máy chủ, vui lòng thử lại sau.",
                confirmButtonColor: "#6b46c1",
            });
        }

        return Promise.reject(error);
    }
);

export default api;
