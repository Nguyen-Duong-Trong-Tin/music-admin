import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Radio, RadioChangeEvent } from "antd";

import BoxHead from "../../components/boxHead";
import BoxCreate from "../../components/boxCreate";
import BoxInput from "../../components/boxInput";
import BoxSelect from "../../components/boxSelect";
import BoxFile from "../../components/boxFile";
import BoxRadio from "../../components/boxRadio";
import BoxTinyMCE from "../../components/boxTinyMCE";
import BoxTextArea from "../../components/boxTextArea";

import { EUserRole } from "../../enums/user";
import { ESongStatus } from "../../enums/song";

import ISelectOptions from "../../interfaces/selectOptions";

import topicService from "../../services/topic";
import userService from "../../services/user";
import songService from "../../services/song";

function SongCreate() {
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

        setTopicOptions(topicOptions);
        setSingerOptions(singerOptions);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, []);

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
      !avatar ||
      !audio ||
      !lyrics ||
      !status
    ) {
      toast.error("Nhập thiếu thông tin bắt buộc!");
      return;
    }

    const response = await songService.create({
      title,
      topicId,
      singerId,
      avatar,
      audio,
      description,
      lyrics,
      status
    });
    if (response.status === 201) {
      toast.success("Tạo mới thành công!");
      navigate(-1);
    } else {
      toast.error("Có lỗi xảy ra!");
    }
  }

  return (
    <>
      <BoxHead title="Tạo Mới Bài Hát" />

      <BoxInput label="Tiêu đề" value={title} onChange={onChangeTitle} />

      <BoxSelect label="Chủ đề" options={topicOptions} value={topicId} onChange={onChangeTopic} />

      <BoxSelect label="Ca sĩ" options={singerOptions} value={singerId} onChange={onChangeSinger} />

      <BoxFile label="Ảnh" accept="image/*" onChange={onChangeAvatar} />

      <BoxFile label="Âm thanh" accept=".mp3,audio/*" onChange={onChangeAudio} />

      <BoxTextArea label="Lời bài hát" value={lyrics} onChange={onChangeLyrics} />

      <BoxTinyMCE label="Mô tả" initialValue="<p>Viết gì đó viết</p>" setValue={setDescription} />

      <BoxRadio label="Trạng thái" value={status} generate={generateStatus} onChange={onChangeStatus} />

      <BoxCreate onClick={handleSubmit} />
    </>
  );
}

export default SongCreate;