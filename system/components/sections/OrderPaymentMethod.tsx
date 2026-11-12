/** How to pay the balance of a BRL order: card through Stripe, or installments through ParceladoUSA. */
export function OrderPaymentMethod() {
  const options = [
    { value: "card", title: "Cartão de crédito", detail: "Pagamento à vista no Stripe. Aceita cupom." },
    { value: "parcelado", title: "Parcelado em reais", detail: "Parcele no cartão brasileiro pela ParceladoUSA. Sujeito a análise." },
  ];
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1 text-[14px] font-bold text-ink">Forma de pagamento</legend>
      {options.map((o, i) => (
        <label key={o.value} className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 has-checked:border-brand has-checked:bg-brand-soft">
          <input type="radio" name="method" value={o.value} defaultChecked={i === 0} className="mt-1 accent-brand" />
          <span className="grid gap-0.5">
            <span className="text-[14px] font-semibold text-ink">{o.title}</span>
            <span className="text-[12.5px] text-ink-soft">{o.detail}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
