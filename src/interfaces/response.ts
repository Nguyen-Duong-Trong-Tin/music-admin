interface IResponse<T> {
  status: number;
  data: {
    status: boolean;
    message: string;
    data: T
  }
};

export default IResponse;