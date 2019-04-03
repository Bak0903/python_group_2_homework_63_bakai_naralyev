export const CATCHERROR = "ERROR";

export const catchError = (error) => {
    return {type: CATCHERROR, error}
};