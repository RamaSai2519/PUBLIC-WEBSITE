export type DatePickerCompProps = {
  label: string;
  name: string;
  date: string;
  labelColor?: string;
  labelSize?: number;
  setDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
