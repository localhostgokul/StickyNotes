/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN, BaseURL } from "../constants/constants";

const getHeader = (withToken = true) => {
    const headers:any = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (withToken) {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // console.log("Token:", token);

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return headers;
};

const handleResponse = async (response: Response): Promise<any> => {
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json?.detail || "Something went wrong");
    }
    return json;
};

const ApiService = {
    get: async function (url: string): Promise<any> {
        try {
            const response = await fetch(`${BaseURL}${url}`, {
                method: "GET",
                headers: getHeader(),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error("GET request failed:", error);
            throw error;
        }
    },

    post: async function (url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${BaseURL}${url}`, {
                method: "POST",
                headers: getHeader(),
                body: JSON.stringify(data),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error("POST request failed:", error);
            throw error;
        }
    },

    postWithToken: async function (url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${BaseURL}${url}`, {
                method: "POST",
                headers: getHeader(false),
                body: JSON.stringify(data),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error("POST request with token failed:", error);
            throw error;
        }
    },

    put: async function (url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${BaseURL}${url}`, {
                method: "PUT",
                headers: getHeader(),
                body: JSON.stringify(data),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error("PUT request failed:", error);
            throw error;
        }
    },

    patch: async function (url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${BaseURL}${url}`, {
                method: "PATCH",
                headers: getHeader(),
                body: JSON.stringify(data),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error("PATCH request failed:", error);
            throw error;
        }
    },

    delete: async function (url: string): Promise<any> {
        try {
            const response = await fetch(`${BaseURL}${url}`, {
                method: "DELETE",
                headers: getHeader(),
            });

            return await handleResponse(response);
        } catch (error) {
            console.error("DELETE request failed:", error);
            throw error;
        }
    },
};

export default ApiService;