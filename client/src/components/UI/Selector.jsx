import Select from "react-tailwindcss-select";

const Selector = ({
  value,
  options,
  handleChange,
  isMulti,
  disabled,
  loading,
  placeholder,
}) => {
  return (
    <>
      <Select
        className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={placeholder}
        loading={loading}
        isMultiple={isMulti}
        value={value}
        options={options}
        onChange={handleChange}
        isDisabled={disabled}
        primaryColor={"indigo"}
        classNames={{
          menuButton: ({ isDisabled }) =>
            `flex  text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
              isDisabled
                ? "bg-gray-200"
                : "bg-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
            }`,
          menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
          listItem: ({ isSelected }) =>
            `block text-center transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
              isSelected
                ? `text-white bg-indigo-500`
                : `text-gray-500 hover:bg-indigo-100 hover:text-indigo-500`
            }`,
          closeIcon: "hover:text-indigo-500",
        }}
      />
    </>
  );
};

export default Selector;
