import { IHttpResponse } from "../constants/httpResponseType";

const endpoint = "https://api.github.com/search";

const httpClient = async (url: string): Promise<IHttpResponse> => {
  try {
    const response = await fetch(endpoint + url);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        results: null,
        error: data.message ? data.message : "Something went wrong!",
      };
    }
    return {
      success: true,
      results: data.items,
    };
  } catch (error) {
    return {
      success: false,
      results: [],
      error: "Something went wrong!",
    };
  }
};

const fetchApi = (searchType: string, offset: number = 1, keyword: string) => {
  const url = `/${searchType}?q=${encodeURIComponent(keyword)}&page=${offset}`;

  return httpClient(url);
};

const fetchUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        results: null,
        error: data.message ? data.message : "Something went wrong!",
      };
    }
    return {
      success: true,
      results: data,
    };
  } catch (error) {
    return {
      success: false,
      results: [],
      error: "Something went wrong!",
    };
  }
};

export { fetchApi, fetchUrl };
