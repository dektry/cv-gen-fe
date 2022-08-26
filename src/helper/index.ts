import { SortOrder } from 'antd/lib/table/interface';

type Params = {
  [key: string]: string | number | boolean | React.Key | readonly React.Key[] | undefined | SortOrder;
}

class Helper {
  getQueryString = (params: Params) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map((k) => {`${esc(k)}=${esc(String(params[k]))}`})
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
