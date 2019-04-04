export const CATCHERROR = "ERROR";

export const catchError = (errors) => {
    return {type: CATCHERROR, errors}
};