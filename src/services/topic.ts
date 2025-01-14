import IResponse from "../interfaces/response";
import ITopic from "../interfaces/topic";

import request from "../utils/request";

const get = async () => {
  const topics = await request.get<IResponse<ITopic[]>>("/topics/get");
  return topics;
}

const topicService = {
  get
};
export default topicService;