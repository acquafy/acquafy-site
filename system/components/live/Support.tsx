import Link from "next/link";
import {
  context,
  records,
  date,
  labels,
  type Ticket,
  type Message,
} from "@/lib/live/data";
import { ticketAction } from "@/lib/live/actions";
import { Form, Field, Select } from "./Fields";
import { type Query, Notice } from "./PortalPage";
export async function Support({
  accountId,
  query,
  queue = false,
}: {
  accountId?: string;
  query: Query;
  queue?: boolean;
}) {
  const { db, staff } = await context();
  const page = Math.max(0, Math.min(100000, parseInt(query.page || "0") || 0));
  if (queue && !staff) return <p role="alert">Acesso restrito à equipe.</p>;
  let tickets: Ticket[];
  let count: number;
  if (queue) {
    const r = await db
      .from("support_tickets")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false })
      .order("id")
      .range(page * 50, page * 50 + 49);
    if (r.error) throw new Error("Não foi possível carregar os chamados.");
    tickets = r.data as Ticket[];
    count = r.count ?? 0;
  } else if (accountId) {
    const r = await records<Ticket>("support_tickets", accountId, page);
    tickets = r.rows;
    count = r.count;
  } else return null;
  const selected = tickets.find((t) => t.id === query.ticket);
  let messages: Message[] = [];
  if (selected) {
    const r = await db
      .from("support_messages")
      .select("id,ticket_id,from_staff,body,created_at")
      .eq("ticket_id", selected.id)
      .order("created_at")
      .order("id")
      .limit(500);
    if (r.error) throw new Error("Não foi possível carregar a conversa.");
    messages = r.data as Message[];
  }
  const path = queue ? "/equipe" : "/suporte";
  return (
    <>
      <Notice query={query} />
      {!queue && accountId && (
        <Form
          action={ticketAction}
          kind="create"
          account={accountId}
          title="Abrir chamado"
        >
          <Field name="subject" label="Assunto" />
          <label className="live-field">
            Mensagem
            <textarea
              name="body"
              required
              minLength={1}
              maxLength={5000}
              rows={4}
            />
          </label>
          <p className="live-muted">
            A equipe recebe este chamado no portal. Não inclua senhas nem dados
            bancários completos.
          </p>
        </Form>
      )}
      <div className="live-card">
        <h2>{queue ? "Fila da equipe" : "Chamados da conta"}</h2>
        {tickets.length === 0 && <p>Nenhum chamado registrado.</p>}
        <ul>
          {tickets.map((t) => (
            <li className="live-ticket" key={t.id}>
              <Link
                className="live-link"
                href={`${path}?page=${page}&ticket=${t.id}`}
              >
                #{t.number} · {t.subject}
              </Link>
              <p>
                {labels[t.status]} · {date(t.updated_at)}
                {t.assigned_to ? " · Atribuído à equipe" : ""}
              </p>
            </li>
          ))}
        </ul>
        <div className="live-pager">
          {page > 0 && (
            <Link href={`${path}?page=${page - 1}`}>← Anterior</Link>
          )}
          {(page + 1) * 50 < count && (
            <Link href={`${path}?page=${page + 1}`}>Próxima →</Link>
          )}
        </div>
      </div>
      {selected && (
        <section className="live-card">
          <h2>
            #{selected.number} · {selected.subject}
          </h2>
          <p>{labels[selected.status]}</p>
          {messages.map((m) => (
            <div className="live-message" data-staff={m.from_staff} key={m.id}>
              <strong>{m.from_staff ? "Equipe Acquafy" : "Parceiro"}</strong>
              <p>{m.body}</p>
              <small>{date(m.created_at)}</small>
            </div>
          ))}
          {messages.length === 500 && (
            <p>
              Exibindo as primeiras 500 mensagens. Solicite à equipe o histórico
              completo.
            </p>
          )}
          <Form action={ticketAction} kind="reply" title="Responder">
            <input type="hidden" name="ticket_id" value={selected.id} />
            <input type="hidden" name="queue" value={queue ? "1" : "0"} />
            <input type="hidden" name="page" value={page} />
            <label className="live-field">
              Mensagem
              <textarea name="body" required maxLength={5000} rows={3} />
            </label>
          </Form>
          {staff && (
            <Form action={ticketAction} kind="status" title="Atendimento">
              <input type="hidden" name="ticket_id" value={selected.id} />
              <input type="hidden" name="queue" value={queue ? "1" : "0"} />
              <input type="hidden" name="page" value={page} />
              <Select
                name="status"
                label="Situação (atribui a você)"
                options={["open", "in_progress", "resolved"].map((value) => ({
                  value,
                  label: labels[value],
                }))}
              />
            </Form>
          )}
        </section>
      )}
    </>
  );
}
