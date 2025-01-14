import { Select, Typography } from 'antd';
const { Title } = Typography;

import ISelectOptions from '../../interfaces/selectOptions';

import "./boxSelect.css";

interface props {
  label: string;
  value: string;
  options: ISelectOptions[];
  onChange: (value: string) => void
}

function BoxSelect({ label, options, value, onChange }: props) {
  return (
    <div className="box-select">
      <Title level={5}>{label}</Title>
      <Select
        style={{ width: 360 }}
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default BoxSelect;