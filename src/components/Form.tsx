import { FC, FormEvent, useState, ChangeEvent } from 'react';

type FormProps = {
  addTracker: (value: string) => void;
};

const Form: FC<FormProps> = ({ addTracker }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTracker(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={value} onChange={handleChange} />
      <input type='submit' value='submit' />
    </form>
  );
};

export default Form;
