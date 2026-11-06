import { Checkbox, Select as KitSelect, TextArea, TextField } from "@/components/ui/Field";
import type { ButtonVariant } from "@/components/ui/Button";
import { FormFrame } from "./FormFrame";

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
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return <KitSelect name={name} label={label} required={required} options={options} defaultValue={defaultValue} />;
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

/** Redirecting server-action form (`adminAction`, `ticketAction`…): a card on the page, or just the form inside a `FormDialog`. */
export function Form({
  action,
  kind,
  account,
  title,
  submit,
  variant,
  children,
}: {
  action: (form: FormData) => Promise<void>;
  kind: string;
  account?: string;
  title: string;
  submit?: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
}) {
  return (
    <FormFrame action={action} title={title} submit={submit} variant={variant}>
      <input type="hidden" name="action" value={kind} />
      {account && <input type="hidden" name="account_id" value={account} />}
      {children}
    </FormFrame>
  );
}
