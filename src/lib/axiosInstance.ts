import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://finance-tracker-silk-phi.vercel.app/api/v1', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add interceptors for request/response handling
axiosInstance.interceptors.request.use(
  (config) => {
    // Optionally, you can add headers or modify the request here (e.g., add auth token)
    // const token = localStorage.getItem('authToken'); // Example: Get token from storage
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle errors globally here (e.g., logging out on 401, 403 errors)
    // if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //     // Example: Redirect to login page or logout
    // }
    return Promise.reject(error)
  },
)

export default axiosInstance
