import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface SearchResponse {
    data: string;
}

interface ErrorResponse {
    error: string;
    status: number;
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
        return JSON.stringify(response.data);
    } catch (error: AxiosError) {
        console.log("Axios Error:", error);

        // Generate an appropriate error response
        let errorMessage = "An error occurred";
        let statusCode = 500;

        // Check if the error response contains specific information
        if (error.response) {
            errorMessage = error.response.data.message;
            statusCode = error.response.status;
        }

        // Return the error response
        return { errorMessage, statusCode };
    }
}
