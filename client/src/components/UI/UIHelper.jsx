const HorizontalTextRuler = ({ str }) => {
  return (
    <div className="flex items-center space-x-4">
      <hr className="w-full border border-gray-300" />
      <div className="font-semibold text-gray-400">{str}</div>
      <hr className="w-full border border-gray-300" />
    </div>
  );
};

const HorizontalRuler = () => {
  return (
    <div className="flex items-center space-x-4">
      <hr className="w-full border border-gray-300" />
    </div>
  );
};

const FormHelper = ({ str }) => {
  return <p className="form-helper">{str}</p>;
};

export { HorizontalTextRuler, HorizontalRuler, FormHelper };
