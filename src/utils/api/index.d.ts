interface MutationSettings<Params = void, Func = unknown> {
  config?: RequestConfig;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: RequestOptions;
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >;
}

interface InfiniteQuerySettings<Func = unknown> {
  config?: RequestOptions;
  options?: Omit<
    import('@tanstack/react-query').UseInfiniteQueryOptions<
      Awaited<ReturnTyp<Func>>,
      any,
      Awaited<ReturnTyp<Func>>,
      any,
      import('@tanstack/react-query').QueryKey,
      number
    >,
    'queryKey'
  >;
}

  type BaseUrl = string;
  type RequestMethod = RequestInit['method'];
interface HttpClientSearchParams { [key: string]: string | number | boolean | string[] }

  type _RequestConfig = RequestInit & {
    url: string;
    _retry?: boolean;
    headers?: Record<string, string>;
    params?: HttpClientSearchParams;
  };
interface InterceptorResponseResult {
  headers: Response['headers'];
  success: Response['ok'];
  status: Response['status'];
  statusText: Response['statusText'];
  url: string;
  data: any;
}
  type SuccessResponseFun = (res: InterceptorResponseResult) => InterceptorResponseResult['data'];
  type SuccessRequestFun = (options: _RequestConfig) => _RequestConfig | Promise<_RequestConfig>;

  type ResponseError = Error & { config: _RequestConfig; response: InterceptorResponseResult };
  type FailureResponseFun = (e: ResponseError) => any;
  type FailureRequestFun = (e: ResponseError) => any;

interface RequestInterceptor {
  onSuccess?: SuccessRequestFun;
  onFailure?: FailureRequestFun;
}

interface ResponseInterceptor {
  onSuccess?: SuccessResponseFun;
  onFailure?: FailureResponseFun;
}
interface Interceptors {
  request?: RequestInterceptor[];
  response?: ResponseInterceptor[];
}

  type RequestBody = Record<string, any> | FormData;

interface RequestOptions extends Omit<RequestInit, 'method'> {
  headers?: Record<string, string>;
  params?: HttpClientSearchParams;
}

  type RequestConfig<Params = undefined> = Params extends undefined
    ? { config?: RequestOptions }
    : { params: Params; config?: RequestOptions };

interface BaseResponse {
  message: string;
}
