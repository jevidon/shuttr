import type { ReactNode } from 'react';

type SettingControlProps<T extends string | number> = {
  id: string;
  label: string;
  value: T;
  values: T[];
  formatValue?: (value: T) => string;
  onChange: (value: T) => void;
  help: string;
  icon: ReactNode;
};

export function SettingControl<T extends string | number>({
  id,
  label,
  value,
  values,
  formatValue = String,
  onChange,
  help,
  icon,
}: SettingControlProps<T>) {
  const selectedIndex = Math.max(0, values.findIndex((item) => item === value));

  return (
    <section className="setting-control" aria-labelledby={`${id}-label`}>
      <div className="setting-heading">
        <span className="setting-icon" aria-hidden="true">{icon}</span>
        <div>
          <h3 id={`${id}-label`}>{label}</h3>
          <p>{help}</p>
        </div>
        <output htmlFor={id}>{formatValue(value)}</output>
      </div>
      <input
        id={id}
        aria-labelledby={`${id}-label`}
        type="range"
        min={0}
        max={values.length - 1}
        step={1}
        value={selectedIndex}
        onChange={(event) => onChange(values[Number(event.currentTarget.value)])}
      />
      <div className="range-labels" aria-hidden="true">
        <span>{formatValue(values[0])}</span>
        <span>{formatValue(values[values.length - 1])}</span>
      </div>
    </section>
  );
}
