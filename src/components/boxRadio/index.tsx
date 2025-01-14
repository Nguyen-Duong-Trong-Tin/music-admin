import { ReactNode } from "react";

import { Radio, RadioChangeEvent, Typography } from "antd";
const { Title } = Typography;

import "./boxRadio.css";

interface props {
  label: string;
  value: string;
  generate: () => ReactNode;
  onChange: (e: RadioChangeEvent) => void;
};

function BoxRadio({ label, value, generate, onChange }: props) {
  return (
    <div className="box-radio">
      <Title level={5}>{label}</Title>
      <Radio.Group value={value} onChange={onChange}>
        {generate()}
      </Radio.Group>
    </div>
  );
}

export default BoxRadio;