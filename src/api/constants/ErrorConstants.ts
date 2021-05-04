const ErrorConstants = {
  DEFAULT_ERROR: {
    reason: 'unknownError',
    message: 'Произошла неизвестная ошибка. Попробуйте повторить позже.'
  },
  SERVER_NOT_RESPONDING: {
    reason: 'serverNotResponding',
    message: 'Сервер не отвечает. Подождите или обратитесь в тех. поддежку.'
  },
  INCORRECT_CREDENTIALS: {
    reason: 'userValidation',
    message: 'Вы ввели неверный логин или пароль.'
  },
  USER_ALREADY_EXISTS: {
    reason: 'userAlreadyExistsError',
    message: 'Данный пользователь уже существует'
  },
  WRONG_PASSWORD_OR_LOGIN_ERROR: {
    reason: 'wrongPasswordOrLoginError',
    message: 'Неправильные логин или пароль'
  },
  USER_NOT_FOUND: {
    reason: 'userNotFoundError',
    message: 'Пользователь не найден'
  },
  PRODUCT_NOT_FOUND: {
    reason: 'productNotFoundError',
    message: 'Продукт не найден'
  },
  UNAUTHORIZED_ERROR: {
    reason: 'unauthorizedError',
    message: 'Вы не аутентифицированы'
  },
  INVALID_TOKEN: {
    reason: 'invalidAuthTokenError',
    message: 'Хакер нюхай бебру токен не совпал'
  }
};

export default ErrorConstants;
