export const Checkbox: React.FC<{
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}> = ({ id, checked, onChange, label }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 text-blue-800/85 accent-blue-800/85 transition duration-150 ease-in-out"
    />
    <label htmlFor={id} className="ml-2 text-md font-semibold text-blue-800/85">
      {label}
    </label>
  </div>
);
