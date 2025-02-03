import { JSX } from "react";

export default function FilterSection({
  title,
  options,
}: {
  title: string;
  options: string[];
}): JSX.Element {
  return (
    <div className="flex flex-col p-2">
      <span className="font-bold">{title}</span>
      {options.map((option) => {
        return (
          <label
            htmlFor={option}
            key={option}
            className="flex flex-row items-center justify-start gap-2 p-1"
          >
            <input type="checkbox" name={option} id={option} />
            {option}
          </label>
        );
      })}
    </div>
  );
}
