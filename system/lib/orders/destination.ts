export function customerDestination(input: string | null | undefined) {
  if (!input) return "/pedidos";
  try {
    const u = new URL(input, "https://acquafy.invalid");
    if (
      u.origin !== "https://acquafy.invalid" ||
      (!["/pedido", "/pedidos", "/locacoes", "/adesao", "/home"].includes(
        u.pathname,
      ) &&
        // The page of one order (links in the order e-mails).
        !/^\/pedidos\/[0-9a-f-]{36}$/.test(u.pathname))
    )
      return "/pedidos";
    return u.pathname + u.search;
  } catch {
    return "/pedidos";
  }
}
