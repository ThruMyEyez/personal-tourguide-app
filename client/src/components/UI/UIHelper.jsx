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

const HorizontalSidebarTextRuler = ({ str }) => {
  return (
    <div className="flex items-center my-3 space-x-4">
      <hr className="w-full border border-zinc-500" />
      <div className="font-semibold text-zinc-700">{str}</div>
      <hr className="w-full border border-zinc-500" />
    </div>
  );
};

const HorizontalSidebarRuler = () => {
  return (
    <div className="flex items-center space-x-4">
      <hr className="w-full border border-zinc-500" />
    </div>
  );
};

const FormHelper = ({ str }) => {
  return <p className="form-helper">{str}</p>;
};

export {
  HorizontalTextRuler,
  HorizontalRuler,
  HorizontalSidebarRuler,
  HorizontalSidebarTextRuler,
  FormHelper,
};
