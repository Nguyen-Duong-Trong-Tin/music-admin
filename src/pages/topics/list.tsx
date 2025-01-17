import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Image, Space, Table, TableProps } from "antd";

import BoxHead from "../../components/boxHead";
import ButtonNavigateDetail from "../../components/buttonNavigateDetail";
import ButtonNavigateUpdate from "../../components/buttonNavigateUpdate";

import { ETopicStatus } from "../../enums/topic";

import ITopic from "../../interfaces/topic";

import topicService from "../../services/topic";

function TopicList() {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const topics = (await topicService.get()).data.data;
        setTopics(topics);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, []);

  const handleDel = (id: string) => {
    console.log("DELETE", id);
  }

  const columns: TableProps<ITopic>["columns"] = [
    {
      title: "STT",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (_, __, index: number) => <Button>{index + 1}</Button>
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      key: "avatar",
      width: 200,
      render: (avatar: string) => (
        <Space>
          <Image src={avatar} />
        </Space>
      )
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const className = status === ETopicStatus.ACTIVE ? "button-success" : "button-danger";
        const content = status === ETopicStatus.ACTIVE ? "Hoạt động" : "Ngưng hoạt động";

        return (
          <Button type="primary" className={className}>{content}</Button>
        );
      }
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const id = record._id;

        return (
          <Space>
            <ButtonNavigateDetail id={id} />
            <ButtonNavigateUpdate id={id} />
            <Button type="primary" className="button-danger" onClick={() => handleDel(id)}>Xóa</Button>
          </Space>
        );
      }
    }
  ];

  return (
    <>
      <BoxHead title="Danh Sách Chủ Đề" />
      <Table dataSource={topics} columns={columns} />
    </>
  );
}

export default TopicList;