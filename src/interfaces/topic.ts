import IBase from "./base";

import { ETopicStatus } from "../enums/topic";

interface ITopic extends IBase {
  title: string;
  slug: string;
  description: string;
  avatar: string;
  status: ETopicStatus;
};

export default ITopic;