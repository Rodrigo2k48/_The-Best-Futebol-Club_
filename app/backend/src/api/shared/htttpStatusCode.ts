enum HTTP_STATUS {
  SuccessOK = 200,
  SuccessCreated = 201,
  ClientErrorBadRequest = 400,
  ClientErrorUnauthorized = 401,
  UnprocessableContentError = 422,
  InternalServerError = 500,
  NotFoundError = 404,
}

export default HTTP_STATUS;
