import request from "../utils/request";

import IResponse from "../interfaces/response";
import ISong from "../interfaces/song";

const get = async () => {
  const songs = await request.get<IResponse<ISong[]>>("/songs/get");
  return songs;
}

const getById = async (id: string) => {
  const song = await request.get<IResponse<ISong>>(`/songs/get/${id}`);
  return song;
}

const create = async ({
  title,
  topicId,
  singerId,
  avatar,
  audio,
  description,
  lyrics,
  status
}: {
  title: string;
  topicId: string;
  singerId: string;
  avatar: File;
  audio: File;
  description: string;
  lyrics: string;
  status: string;
}) => {
  const song = new FormData();
  song.append("title", title);
  song.append("topicId", topicId);
  song.append("singerId", singerId);
  song.append("avatar", avatar);
  song.append("audio", audio);
  song.append("description", description);
  song.append("lyrics", lyrics);
  song.append("status", status);

  const newSong = await request.post<IResponse<ISong>>("/songs/create", song);
  return newSong;
}

const update = async (id: string, {
  title,
  topicId,
  singerId,
  avatar,
  audio,
  description,
  lyrics,
  status
}: {
  title: string;
  topicId: string;
  singerId: string;
  avatar?: File;
  audio?: File;
  description: string;
  lyrics: string;
  status: string;
}) => {
  const song = new FormData();
  song.append("title", title);
  song.append("topicId", topicId);
  song.append("singerId", singerId);

  if (avatar) {
    song.append("avatar", avatar);
  }

  if (audio) {
    song.append("audio", audio);
  }

  song.append("description", description);
  song.append("lyrics", lyrics);
  song.append("status", status);

  console.log(song);

  const newSong = await request.patch<IResponse<ISong>>(`/songs/update/${id}`, song);
  return newSong;
}

const songService = {
  get,
  getById,
  create,
  update
};
export default songService;