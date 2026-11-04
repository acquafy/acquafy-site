import { Submit } from "./Submit";
export function Field({
  name,
  label,
  type = "text",
  required = true,
  maxLength = 160,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="live-field">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        step={type === "number" ? "0.01" : undefined}
        min={type === "number" ? "0" : undefined}
      />
    </label>
  );
}
export function Select({
  name,
  label,
  options,
  required = true,
}: {
  name: string;
  label: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="live-field">
      {label}
      <select name={name} required={required}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
export function Form({
  action,
  kind,
  account,
  title,
  children,
}: {
  action: (form: FormData) => Promise<void>;
  kind: string;
  account?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <form action={action} className="live-card live-form">
      <h2>{title}</h2>
      <input type="hidden" name="action" value={kind} />
      {account && <input type="hidden" name="account_id" value={account} />}
      {children}
      <Submit />
    </form>
  );
}
