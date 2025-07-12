const TextInput = ({
  label,
  placeholder,
  className,
  value,
  setValue,
  labelClassName,
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <label id={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border border-gray-300 border-solid rounded placeholder-gray-500"
        id={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
