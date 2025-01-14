import { ESongStatus } from "../enums/song";

import IBase from "./base";
import ITopic from "./topic";
import IUser from "./user";

interface ISong extends IBase {
  title: string;
  slug: string;
  description: string;
  avatar: string;
  like: string[];
  listen: number;
  lyrics: string;
  audio: string;
  status: ESongStatus;
  topicId: string | ITopic;
  singerId: string | IUser;
};

export default ISong;