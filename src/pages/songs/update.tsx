import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Radio, RadioChangeEvent } from "antd";

import BoxHead from "../../components/boxHead";
import BoxInput from "../../components/boxInput";
import BoxSelect from "../../components/boxSelect";
import BoxFile from "../../components/boxFile";
import BoxRadio from "../../components/boxRadio";
import BoxTinyMCE from "../../components/boxTinyMCE";
import BoxTextArea from "../../components/boxTextArea";
import BoxUpdate from "../../components/boxUpdate";

import { EUserRole } from "../../enums/user";
import { ESongStatus } from "../../enums/song";

import ISelectOptions from "../../interfaces/selectOptions";

import topicService from "../../services/topic";
import userService from "../../services/user";
import songService from "../../services/song";

function SongUpdate() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lyrics, setLyrics] = useState(`[00:19.00] Đập vỡ cây đàn\n[00:21.00] Giận đời, đập vỡ cây đàn`);

  const [topicOptions, setTopicOptions] = useState<ISelectOptions[]>([]);
  const [topicId, setTopicId] = useState("");

  const [singerOptions, setSingerOptions] = useState<ISelectOptions[]>([]);
  const [singerId, setSingerId] = useState("");

  const [avatar, setAvatar] = useState<File>();
  const [audio, setAudio] = useState<File>();

  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const topics = (await topicService.get()).data.data;
        const topicOptions = topics.map(topic => ({
          label: topic.title,
          value: topic._id
        }));

        const singers = (await userService.get({ role: EUserRole.SINGER })).data.data;
        const singerOptions = singers.map(singer => ({
          label: singer.fullName,
          value: singer._id
        }));

        const song = (await songService.getById(id as string)).data.data;

        setTopicOptions(topicOptions);
        setSingerOptions(singerOptions);

        setTitle(song.title);
        setDescription(song.description);
        setLyrics(song.lyrics);
        setTopicId(song.topicId as string);
        setSingerId(song.singerId as string);
        setStatus(song.status);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, [id]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onChangeTopic = (value: string) => {
    setTopicId(value);
  }
  const onChangeSinger = (value: string) => {
    setSingerId(value);
  }
  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  }
  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudio(e.target.files[0]);
    }
  }
  const onChangeLyrics = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  }

  const generateStatus = () => {
    return (
      Object.values(ESongStatus).map((status, index) => {
        let content = "Hoạt động";
        if (status === "ACTIVE") {
          content = "Hoạt động";
        } else {
          content = "Ngưng hoạt động"
        }

        return (
          <Radio key={index} value={status}>{content}</Radio>
        );
      })
    );
  }
  const onChangeStatus = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !topicId ||
      !singerId ||
      !lyrics ||
      !status
    ) {
      toast.error("Nhập thiếu thông tin bắt buộc!");
      return;
    }

    const response = await songService.update(id as string, {
      title,
      topicId,
      singerId,
      avatar,
      audio,
      description,
      lyrics,
      status
    });
    if (response.status === 200) {
      toast.success("Tạo mới thành công!");
      navigate(-1);
    } else {
      toast.error("Có lỗi xảy ra!");
    }
  }

  return (
    <>
      <BoxHead title="Cập Nhật Bài Hát" />

      <BoxInput label="Tiêu đề" value={title} onChange={onChangeTitle} />

      <BoxSelect label="Chủ đề" options={topicOptions} value={topicId} onChange={onChangeTopic} />

      <BoxSelect label="Ca sĩ" options={singerOptions} value={singerId} onChange={onChangeSinger} />

      <BoxFile label="Ảnh" accept="image/*" onChange={onChangeAvatar} />

      <BoxFile label="Âm thanh" accept=".mp3,audio/*" onChange={onChangeAudio} />

      <BoxTextArea label="Lời bài hát" value={lyrics} onChange={onChangeLyrics} />

      <BoxTinyMCE label="Mô tả" initialValue={description} setValue={setDescription} />

      <BoxRadio label="Trạng thái" value={status} generate={generateStatus} onChange={onChangeStatus} />

      <BoxUpdate onClick={handleSubmit} />
    </>
  );
}

export default SongUpdate;