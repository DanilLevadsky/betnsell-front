import ErrorConstants from '../constants/ErrorConstants';

const ErrorUtil = {
  getErrorMessage: (err) => {
    const reason = err.error ? err.error.reason : null;
    for (const error of Object.keys(ErrorConstants)) {
      if (reason === ErrorConstants[error].reason) {
        return ErrorConstants[error].message;
      }
    }
    return reason ? ErrorConstants.DEFAULT_ERROR.message : ErrorConstants.SERVER_NOT_RESPONDING.message;
  }
};

export default ErrorUtil;
