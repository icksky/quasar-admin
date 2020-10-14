interface ResponseBase {
  code: number
  msg: string
}

interface ResponseData<T = unknown> extends ResponseBase {
  data: T
}
