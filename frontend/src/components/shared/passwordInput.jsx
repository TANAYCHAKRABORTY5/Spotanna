const PasswordInput = ({ label, placeholder, value, setValue }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label id={label} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="p-2 border border-gray-300 border-solid rounded placeholder-gray-500"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default PasswordInput;
