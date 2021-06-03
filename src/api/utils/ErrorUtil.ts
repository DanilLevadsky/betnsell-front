import ErrorConstants from '../constants/ErrorConstants';

const ErrorUtil = {
  getErrorMessage: (err) => {
    console.log(err);
    const reason = err.error ? err.error.type : null;
    for (const error of Object.keys(ErrorConstants)) {
      if (reason === ErrorConstants[error].type) {
        return ErrorConstants[error].message;
      }
    }
    return reason ? ErrorConstants.DEFAULT_ERROR.message : ErrorConstants.SERVER_NOT_RESPONDING.message;
  }
};

export default ErrorUtil;
