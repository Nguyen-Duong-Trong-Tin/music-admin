import { Input, Typography } from 'antd';
const { Title } = Typography;

import "./boxFile.css";

interface props {
  label: string;
  accept: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function BoxFile({ label, accept, onChange }: props) {
  return (
    <div className="box-file">
      <Title level={5}>{label}</Title>
      <Input type="file" accept={accept} onChange={onChange} />
    </div>
  );
}

export default BoxFile;