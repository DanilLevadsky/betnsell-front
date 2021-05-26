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
  },
  INVALID_UPDATE_INFO_ERROR: {
    reason: 'invalidUpdateInfoError',
    message: 'Не удалось обновить данные'
  },
  FORBIDDEN_ACCESS_ERROR: {
    reason: 'forbiddenAccessError',
    message: 'Ошибка прав доступа'
  },

  INVALID_PRODUCT_DATA_ERROR: {
    reason: 'invalidProductDataError',
    message: 'Неправильные данные продукта'
  },
  INVALID_AUCTION_DATA_ERROR: {
    reason: 'invalidAuctionDataError',
    message: 'Неправильные данные аукциона'
  },
  AUCTION_NOT_FOUND_ERROR: {
    reason: 'auctionNotFoundError',
    message: 'Аукцион не найден'
  },
  AUCTION_SUBSCRIPTION_ERROR: {
    reason: 'auctionSubscriptionError',
    message: 'Нужно больше золота!'
  },
};

export default ErrorConstants;
