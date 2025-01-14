import { Input, Typography } from 'antd';

const { TextArea } = Input;
const { Title } = Typography;

import "./boxTextArea.css";

interface props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function BoxTextArea({
  label,
  value,
  onChange
}: props) {
  return (
    <div className="box-text-area">
      <Title level={5}>{label}</Title>
      <TextArea rows={20} value={value} onChange={onChange} />
    </div>
  );
}

export default BoxTextArea;