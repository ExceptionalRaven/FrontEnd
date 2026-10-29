import styles from './TextInput.module.css';

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'color';
  className?: string;
};

function TextInput({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  className 
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} ${className || ''}`}
    />
  );
};

export {TextInput}