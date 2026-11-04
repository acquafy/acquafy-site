import Link from "next/link";
import { context } from "@/lib/live/data";
import { switchAccount, logout } from "@/lib/live/actions";
import { Submit } from "@/components/live/Submit";
import { ClearDemo } from "@/components/live/ClearDemo";
import "./live.css";
const navigation = [
  ["home", "Visão geral"],
  ["contrato", "Contratos"],
  ["purificadores", "Purificadores"],
  ["extrato", "Extrato"],
  ["calendario", "Calendário"],
  ["documentos", "Documentos"],
  ["suporte", "Suporte"],
  ["perfil", "Minha conta"],
  ["adesao", "Minha adesão"],
  ["locacoes", "Locações"],
];
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await context();
  const review = await ctx.db
    .from("investor_enrollments")
    .select("id")
    .eq("user_id", ctx.user.id)
    .eq("status", "payment_review")
    .limit(1);
  if (review.error)
    throw new Error("Não foi possível consultar a situação da parceria.");
  return (
    <div className="live-portal">
      <ClearDemo />
      <a className="sr-only focus:not-sr-only" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="live-header">
        <Link href="/home" className="live-brand">
          ACQUAFY <span>Portal do parceiro</span>
        </Link>
        <div>
          <span>{ctx.user.email}</span>
          <form action={logout}>
            <Submit>Sair</Submit>
          </form>
        </div>
      </header>
      <div className="live-layout">
        <aside>
          <form action={switchAccount} className="live-account">
            <label htmlFor="account">Conta</label>
            <select
              id="account"
              name="account_id"
              defaultValue={ctx.account?.id}
              disabled={!ctx.accounts.length}
            >
              {ctx.accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                  {a.status === "suspended" ? " · Suspensa" : ""}
                </option>
              ))}
            </select>
            {ctx.accounts.length > 0 && <Submit>Abrir conta</Submit>}
          </form>
          <nav aria-label="Navegação principal">
            {navigation.map(([path, label]) => (
              <Link key={path} href={"/" + path}>
                {label}
              </Link>
            ))}
            {ctx.staff && <Link href="/equipe">Fila de atendimento</Link>}
            {ctx.staff === "admin" && (
              <>
                <Link href="/admin">Administração</Link>
                <Link href="/parcerias">Ofertas e adesões</Link>
              </>
            )}
          </nav>
        </aside>
        <main id="conteudo">
          {review.data.length > 0 && (
            <p className="live-note live-error">
              Existe um pagamento da sua parceria em análise.{" "}
              <Link
                className="live-link"
                href={"/adesao?enrollment=" + review.data[0].id}
              >
                Consultar pendência
              </Link>
            </p>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
