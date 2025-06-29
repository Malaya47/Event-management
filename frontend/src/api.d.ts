const API = {
  post: (url: string, data?: any, config?: any) =>
    axios.post(url, data, config),
  get: (url: string, config?: any) => axios.get(url, config),
  patch: (url: string, data?: any, config?: any) =>
    axios.patch(url, data, config),
  delete: (url: string, config?: any) => axios.delete(url, config),
};

export default API;
