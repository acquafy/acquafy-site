import { Checkbox, Select as KitSelect, TextArea, TextField } from "@/components/ui/Field";
import { Submit } from "./Submit";
import { Card } from "@/components/ui/Card";

/** Form controls of the live screens: thin wrappers over the kit (`components/ui/Field`), uncontrolled, for server-action forms. */
export function Field({
  name,
  label,
  type = "text",
  required = true,
  maxLength = 160,
  defaultValue,
  minLength,
  autoComplete,
  hint,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  defaultValue?: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <TextField
      name={name}
      label={label}
      hint={hint}
      placeholder={placeholder}
      defaultValue={defaultValue}
      type={type}
      required={required}
      maxLength={type === "number" ? undefined : maxLength}
      minLength={minLength}
      autoComplete={autoComplete}
      step={type === "number" ? "0.01" : undefined}
      min={type === "number" ? "0" : undefined}
    />
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
  return <KitSelect name={name} label={label} required={required} options={options} />;
}

/** Multi-line text (addresses, quote conditions, agreement text). */
export function Area({
  name,
  label,
  rows = 4,
  minLength,
  maxLength = 500,
  hint,
  required = true,
}: {
  name: string;
  label: string;
  rows?: number;
  minLength?: number;
  maxLength?: number;
  hint?: string;
  required?: boolean;
}) {
  return <TextArea name={name} label={label} rows={rows} minLength={minLength ?? (required ? 5 : undefined)} maxLength={maxLength} hint={hint} required={required} />;
}

/** Required confirmation checkbox ("Li e aceito…"). */
export function Consent({ name, children, required = true }: { name: string; children: React.ReactNode; required?: boolean }) {
  return (
    <Checkbox
      name={name}
      value="yes"
      required={required}
      label={<span>{children}</span>}
      className="items-start [&>input]:mt-0.5"
    />
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
    <Card title={title}>
      <form action={action} aria-label={title} className="grid gap-3.5">
        <input type="hidden" name="action" value={kind} />
        {account && <input type="hidden" name="account_id" value={account} />}
        {children}
        <div>
          <Submit />
        </div>
      </form>
    </Card>
  );
}
