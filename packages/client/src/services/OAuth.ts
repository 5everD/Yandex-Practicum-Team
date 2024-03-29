export const getYandexUrl = (uri: string) => {
  const rootUrl = `https://oauth.yandex.ru/authorize`

  const options = {
    response_type: 'code',
    client_id: '4a3f1e9382f74f14b202dee8e7e37362',
    redirect_uri: uri,
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
