import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface SearchResponse {
    data: string;
}

interface ErrorResponse {
    error: string;
    status: number;
}

// Define an interface for the error response data
interface ErrorResponseData {
    message: string;
}

export async function serperSearch(
    query: string
): Promise<SearchResponse | ErrorResponse> {
    try {
        const data = JSON.stringify({
            q: query,
        });

        const config: AxiosRequestConfig = {
            method: "post",
            url: "https://google.serper.dev/search",
            headers: {
                "X-API-KEY": process.env.SERP_API_KEY,
                "Content-Type": "application/json",
            },
            data: data,
        };

        const response: AxiosResponse = await axios(config);
        return response.data as SearchResponse; // cast response.data to SearchResponse
    } catch (error: any) {
        // change the type of error to any
        console.log("Axios Error:", error);

        // Generate an appropriate error response
        let errorMessage = "An error occurred";
        let statusCode = 500;

        // Check if the error response contains specific information
        if (error && error.response) {
            const axiosError = error as AxiosError; // cast error to AxiosError
            const errorData = axiosError.response?.data as ErrorResponseData; // cast axiosError.response.data to ErrorResponseData
            errorMessage = errorData.message;
            statusCode = axiosError.response?.status || 500;
        }

        // Return the error response
        return { error: errorMessage, status: statusCode };
    }
}
