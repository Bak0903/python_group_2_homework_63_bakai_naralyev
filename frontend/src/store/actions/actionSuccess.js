export const SUCCESS = "SUCCESS";

export const successRequest = (data, url) => {
    return {type: SUCCESS, data, url}
};