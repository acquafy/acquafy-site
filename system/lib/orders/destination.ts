export function customerDestination(input: string | null | undefined) {
  if (!input) return "/pedidos";
  try {
    const u = new URL(input, "https://acquafy.invalid");
    if (
      u.origin !== "https://acquafy.invalid" ||
      !["/pedido", "/pedidos", "/locacoes", "/adesao", "/home"].includes(
        u.pathname,
      )
    )
      return "/pedidos";
    return u.pathname + u.search;
  } catch {
    return "/pedidos";
  }
}
