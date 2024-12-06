type ApiRequestOptions = import('@siberiacancode/fetches').RequestOptions;

interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestOptions;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestOptions;
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

interface InfinityQuerySettings<Func = unknown> {
  config?: ApiRequestOptions;
  options?: Omit<
    import('@tanstack/react-query').UseInfiniteQueryOptions<
      import('@tanstack/react-query').InfiniteData<Awaited<ReturnType<Func>>>,
      any,
      import('@tanstack/react-query').InfiniteData<Awaited<ReturnType<Func>>>,
      any
    >,
    'queryKey'
  >;
}
