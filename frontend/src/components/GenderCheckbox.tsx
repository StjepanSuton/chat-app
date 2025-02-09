interface GenderCheckboxProps {
  selectedGender: "male" | "female";
  onCheckboxChange: (gender: "male" | "female") => void;
}

const GenderCheckbox = ({
  selectedGender,
  onCheckboxChange,
}: GenderCheckboxProps) => {
  return (
    <div className="mt-4">
      <label className="label">
        <span className="text-base label-text">Gender</span>
      </label>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="male"
            value="male"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
            className="radio radio-primary"
          />
          <label htmlFor="male" className="ml-2 text-white">
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="female"
            value="female"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
            className="radio radio-primary"
          />
          <label htmlFor="female" className="ml-2 text-white">
            Female
          </label>
        </div>
      </div>
    </div>
  );
};

export default GenderCheckbox;
