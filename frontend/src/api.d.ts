declare const API: {
  post: (url: string, data?: any, config?: any) => Promise<any>;
  get: (url: string, config?: any) => Promise<any>;
  // Add other methods as needed (put, delete, etc.)
};

export default API;
