import { switchAccount } from "@/lib/live/actions";
import { Button } from "@/components/ui/Button";

/** Opens an account from a global list: as the investor sees it, or on its administration forms. */
export function OpenAccountButtons({ accountId, name }: { accountId: string; name?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <form action={switchAccount}>
        <input type="hidden" name="account_id" value={accountId} />
        <Button type="submit" variant="outline" size="sm" aria-label={name ? `Abrir conta ${name}` : undefined}>
          Abrir conta
        </Button>
      </form>
      <form action={switchAccount}>
        <input type="hidden" name="account_id" value={accountId} />
        <input type="hidden" name="next" value="admin" />
        <Button type="submit" variant="outline" size="sm" aria-label={name ? `Gerenciar ${name}` : undefined}>
          Gerenciar
        </Button>
      </form>
    </div>
  );
}
