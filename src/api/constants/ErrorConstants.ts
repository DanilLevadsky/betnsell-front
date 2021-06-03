const ErrorConstants = {
  INCORRECT_CREDENTIALS: {
    type: 'userValidation',
    message: 'Вы ввели неверный логин или пароль.'
  },
  USER_ALREADY_EXISTS: {
    type: 'userAlreadyExistsError',
    message: 'Данный пользователь уже существует'
  },
  WRONG_PASSWORD_OR_LOGIN_ERROR: {
    type: 'wrongPasswordOrLoginError',
    message: 'Неправильные логин или пароль'
  },
  USER_NOT_FOUND: {
    type: 'userNotFoundError',
    message: 'Пользователь не найден'
  },
  PRODUCT_NOT_FOUND: {
    type: 'productNotFoundError',
    message: 'Продукт не найден'
  },
  UNAUTHORIZED_ERROR: {
    type: 'unauthorizedError',
    message: 'Вы не аутентифицированы'
  },
  INVALID_TOKEN: {
    type: 'invalidAuthTokenError',
    message: 'Хакер нюхай бебру токен не совпал'
  },
  INVALID_UPDATE_INFO_ERROR: {
    type: 'invalidUpdateInfoError',
    message: 'Не удалось обновить данные'
  },
  FORBIDDEN_ACCESS_ERROR: {
    type: 'forbiddenAccessError',
    message: 'Ошибка прав доступа'
  },

  INVALID_PRODUCT_DATA_ERROR: {
    type: 'invalidProductDataError',
    message: 'Неправильные данные продукта'
  },
  INVALID_AUCTION_DATA_ERROR: {
    type: 'invalidAuctionDataError',
    message: 'Неправильные данные аукциона'
  },
  AUCTION_NOT_FOUND_ERROR: {
    type: 'auctionNotFoundError',
    message: 'Аукцион не найден'
  },
  AUCTION_SUBSCRIPTION_ERROR: {
    type: 'auctionSubscriptionError',
    message: 'Нужно больше золота!'
  },
  DEFAULT_ERROR: {
    type: 'unknownError',
    message: 'Произошла неизвестная ошибка. Попробуйте повторить позже.'
  },
  SERVER_NOT_RESPONDING: {
    type: 'serverNotResponding',
    message: 'Сервер не отвечает. Подождите или обратитесь в тех. поддежку.'
  },
};

export default ErrorConstants;
