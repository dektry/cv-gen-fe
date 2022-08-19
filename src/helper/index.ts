interface IParams {
  [key: string]: number | string | boolean;
}

class Helper {
  getQueryString = (params: IParams) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map((k) => `${esc(k)}=${esc(params[k])}`)
      .join('&');
  };
  headerWithJWT = () => {
    const jwt = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    };
  };
}

export default new Helper();
