import { PRODUTOS_A } from "./artigos-i18n-produtos-a.tmp"
import { PRODUTOS_B } from "./artigos-i18n-produtos-b.tmp"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRODUTOS_I18N: Record<string, any> = {
  ...PRODUTOS_A,
  ...PRODUTOS_B,
}
