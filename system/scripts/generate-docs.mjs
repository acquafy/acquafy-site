// scripts/generate-docs.mjs
//
// Writes the sample documents of the Investor Portal to public/docs/ (no dependencies):
//   node scripts/generate-docs.mjs
//
// PDFs are hand-assembled (A4, Helvetica, WinAnsi) and ZIPs use the "stored" method, so the files open in any
// viewer. Keep the contract figures below in sync with config/investor.ts (the mock data of the portal).

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const OUT_DIR = fileURLToPath(new URL("../public/docs/", import.meta.url));

// ---------------------------------------------------------------------------------------------------------
// Shared facts (mirror config/investor.ts and config/contract-page.ts)
// ---------------------------------------------------------------------------------------------------------

const INVESTOR = { name: "Carlos Silva", document: "SSN ***-**-4821", email: "carlos.silva@email.com", city: "Orlando, FL, Estados Unidos" };
const CONTRACT = {
  number: "ACQ-WAAS-2026-0142",
  title: "Contrato de Participação Acquafy WaaS",
  start: "26/10/2026",
  end: "25/10/2029",
  termMonths: 36,
  installments: 35,
  firstPayout: "01/12/2026",
  installmentValue: "US$ 400,00",
  units: 20,
  unitPrice: "US$ 400,00",
  invested: "US$ 8.000,00",
  leaseShare: "50%",
  buybackShare: "30%",
  review: "10/11/2027",
  payment: "Transferência bancária (USD)",
};
const HASH = "9f2c7a41d83b5e60a1c4f7d2b98e3a05c6d1f8e47b2a90c3d5e6f1a8b7c4d209";

// ---------------------------------------------------------------------------------------------------------
// Minimal PDF writer
// ---------------------------------------------------------------------------------------------------------

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 56;
const TOP = PAGE_H - 104;
const BOTTOM = 74;
const BODY_W = PAGE_W - MARGIN * 2;

/** Helvetica advance widths (1/1000 em) for ASCII 32..126. */
const HELV =
  "278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 278 278 584 584 584 556 " +
  "1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 667 778 722 667 611 722 667 944 667 667 611 278 278 278 469 556 " +
  "333 556 556 500 556 556 278 556 556 222 222 500 222 833 556 556 556 556 333 500 278 556 500 722 500 500 500 334 260 334 584";
const WIDTHS = HELV.split(" ").map(Number);

const BASE_OF = { á: "a", à: "a", â: "a", ã: "a", ä: "a", é: "e", è: "e", ê: "e", í: "i", ó: "o", ô: "o", õ: "o", ú: "u", ü: "u", ç: "c" };

function glyphWidth(ch) {
  const lower = ch.toLowerCase();
  const base = BASE_OF[lower] ? (ch === lower ? BASE_OF[lower] : BASE_OF[lower].toUpperCase()) : ch;
  const code = base.charCodeAt(0);
  return code >= 32 && code <= 126 ? WIDTHS[code - 32] : 556;
}

function textWidth(text, size, bold = false) {
  let w = 0;
  for (const ch of text) w += glyphWidth(ch);
  return (w / 1000) * size * (bold ? 1.06 : 1);
}

function wrap(text, size, maxWidth, bold = false) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(next, size, bold) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

const CP1252 = { "–": 0x96, "—": 0x97, "•": 0x95, "“": 0x93, "”": 0x94, "‘": 0x91, "’": 0x92, "…": 0x85, "€": 0x80 };

/** Escapes a string as a PDF literal in WinAnsiEncoding; non-ASCII bytes become octal escapes. */
function lit(text) {
  let out = "";
  for (const ch of text) {
    const code = CP1252[ch] ?? ch.charCodeAt(0);
    if (ch === "\\" || ch === "(" || ch === ")") out += `\\${ch}`;
    else if (code >= 32 && code < 127) out += ch;
    else if (code < 256) out += `\\${code.toString(8).padStart(3, "0")}`;
    else out += "?";
  }
  return `(${out})`;
}

const rgb = (hex) => [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((h) => (parseInt(h, 16) / 255).toFixed(3)).join(" ");
const INK = "0a1f7a";
const SOFT = "3f4f95";
const BRAND = "1f66ff";
const LINE = "d5e0f7";

/**
 * Lays a document out and returns the PDF bytes.
 * Blocks: { h: "Heading" } | { p: "Paragraph" } | { li: "Bullet" } | { kv: [[label, value], ...] } | { space: n }
 */
function buildPdf({ title, subtitle, meta = [], blocks, footer }) {
  const pages = [];
  let ops = [];
  let y = TOP;

  const newPage = () => {
    if (ops.length) pages.push(ops.join("\n"));
    ops = [];
    y = TOP;
  };
  const text = (str, x, yy, { size = 11, bold = false, color = INK } = {}) =>
    ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${rgb(color)} rg ${x.toFixed(2)} ${yy.toFixed(2)} Td ${lit(str)} Tj ET`);
  const need = (h) => {
    if (y - h < BOTTOM) newPage();
  };

  // First page title block.
  text(title, MARGIN, y, { size: 19, bold: true });
  y -= 22;
  if (subtitle) {
    for (const l of wrap(subtitle, 11.5, BODY_W)) {
      text(l, MARGIN, y, { size: 11.5, color: SOFT });
      y -= 15;
    }
  }
  if (meta.length) {
    y -= 4;
    for (const m of meta) {
      text(m, MARGIN, y, { size: 9.5, color: SOFT });
      y -= 13;
    }
  }
  y -= 8;
  ops.push(`${rgb(LINE)} RG 0.8 w ${MARGIN} ${y} m ${PAGE_W - MARGIN} ${y} l S`);
  y -= 22;

  for (const b of blocks) {
    if (b.space) {
      y -= b.space;
    } else if (b.h) {
      need(44);
      y -= 6;
      text(b.h, MARGIN, y, { size: 12.5, bold: true, color: BRAND });
      y -= 20;
    } else if (b.p) {
      for (const l of wrap(b.p, 10.5, BODY_W)) {
        need(16);
        text(l, MARGIN, y, { size: 10.5 });
        y -= 15;
      }
      y -= 5;
    } else if (b.li) {
      const lines = wrap(b.li, 10.5, BODY_W - 18);
      lines.forEach((l, i) => {
        need(16);
        if (i === 0) text("•", MARGIN + 4, y, { size: 10.5, color: BRAND });
        text(l, MARGIN + 18, y, { size: 10.5 });
        y -= 15;
      });
      y -= 2;
    } else if (b.kv) {
      for (const [label, value] of b.kv) {
        const lines = wrap(String(value), 10.5, BODY_W - 190, true);
        need(lines.length * 15 + 8);
        text(label, MARGIN, y, { size: 10, color: SOFT });
        lines.forEach((l, i) => text(l, MARGIN + 190, y - i * 15, { size: 10.5, bold: true }));
        y -= lines.length * 15 + 2;
        ops.push(`${rgb(LINE)} RG 0.5 w ${MARGIN} ${y + 5} m ${PAGE_W - MARGIN} ${y + 5} l S`);
        y -= 6;
      }
      y -= 6;
    }
  }
  newPage();

  // Page chrome: brand band, footer and page number.
  const total = pages.length;
  const finished = pages.map((body, i) => {
    const chrome = [
      `${rgb("1f66ff")} rg 0 ${PAGE_H - 62} ${PAGE_W} 62 re f`,
      `${rgb("7c3aed")} rg ${PAGE_W - 150} ${PAGE_H - 62} 150 62 re f`,
      `BT /F2 21 Tf 1 1 1 rg ${MARGIN} ${PAGE_H - 40} Td ${lit("ACQUAFY")} Tj ET`,
      `BT /F1 9.5 Tf 1 1 1 rg ${PAGE_W - 140} ${PAGE_H - 36} Td ${lit("Portal do Investidor")} Tj ET`,
      `BT /F1 8 Tf 1 1 1 rg ${PAGE_W - 140} ${PAGE_H - 48} Td ${lit("Água como Serviço")} Tj ET`,
      `${rgb(LINE)} RG 0.8 w ${MARGIN} 56 m ${PAGE_W - MARGIN} 56 l S`,
      `BT /F1 8 Tf ${rgb(SOFT)} rg ${MARGIN} 42 Td ${lit(footer ?? "Documento de demonstração gerado para o Portal do Investidor Acquafy.")} Tj ET`,
      `BT /F1 8 Tf ${rgb(SOFT)} rg ${PAGE_W - MARGIN - 60} 42 Td ${lit(`Página ${i + 1} de ${total}`)} Tj ET`,
    ].join("\n");
    return `${chrome}\n${body}`;
  });

  // Objects: 1 catalog, 2 pages, 3 Helvetica, 4 Helvetica-Bold, 5 info, then (page, content) pairs.
  const objs = [];
  const kids = finished.map((_, i) => `${6 + i * 2} 0 R`).join(" ");
  objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objs[2] = `<< /Type /Pages /Kids [${kids}] /Count ${total} >>`;
  objs[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objs[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
  objs[5] = `<< /Title ${lit(title)} /Author (Acquafy) /Producer (Acquafy Investor Portal) /CreationDate (D:20261026120000Z) >>`;
  finished.forEach((content, i) => {
    const pageNo = 6 + i * 2;
    objs[pageNo] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${pageNo + 1} 0 R >>`;
    objs[pageNo + 1] = `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`;
  });

  let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [];
  for (let n = 1; n < objs.length; n++) {
    offsets[n] = Buffer.byteLength(out, "latin1");
    out += `${n} 0 obj\n${objs[n]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(out, "latin1");
  out += `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for (let n = 1; n < objs.length; n++) out += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objs.length} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, "latin1");
}

// ---------------------------------------------------------------------------------------------------------
// Minimal ZIP writer (method 0 = stored)
// ---------------------------------------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function buildZip(files) {
  const dosTime = 12 << 11;
  const dosDate = ((2026 - 1980) << 9) | (10 << 5) | 27;
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const { name, data } of files) {
    const nameBuf = Buffer.from(name, "utf8");
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(0, 8); // stored
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + data.length;
  }
  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralBuf, end]);
}

// ---------------------------------------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------------------------------------

const investorKv = [
  ["Investidor", INVESTOR.name],
  ["Documento", INVESTOR.document],
  ["E-mail", INVESTOR.email],
  ["Localidade", INVESTOR.city],
];

const pdfs = {
  "contrato-participacao-acquafy.pdf": {
    title: CONTRACT.title,
    subtitle: `Contrato nº ${CONTRACT.number} entre a Acquafy WaaS e o investidor.`,
    meta: [`Assinado eletronicamente em ${CONTRACT.start}  ·  Vigência: ${CONTRACT.start} a ${CONTRACT.end}`],
    blocks: [
      { h: "Partes" },
      { kv: [["Contratada", "Acquafy WaaS (Água como Serviço)"], ...investorKv.map(([k, v]) => [k === "Investidor" ? "Contratante" : k, v])] },
      { h: "Condições comerciais" },
      {
        kv: [
          ["Unidades adquiridas", `${CONTRACT.units} purificadores Neo UP`],
          ["Valor por unidade", CONTRACT.unitPrice],
          ["Investimento total", CONTRACT.invested],
          ["Prazo do contrato", `${CONTRACT.termMonths} meses (${CONTRACT.start} a ${CONTRACT.end})`],
          ["Repasses", `${CONTRACT.installments} parcelas mensais de ${CONTRACT.installmentValue}`],
          ["Primeiro repasse", CONTRACT.firstPayout],
          ["Participação no Lease", CONTRACT.leaseShare],
          ["Recompra opcional", `${CONTRACT.buybackShare} do valor investido, ao término`],
          ["Forma de pagamento", CONTRACT.payment],
          ["Primeira revisão", CONTRACT.review],
        ],
      },
      { h: "Cláusula 1 – Objeto" },
      {
        p: `O presente contrato tem por objeto a participação do CONTRATANTE no programa Acquafy WaaS, por meio da aquisição de ${CONTRACT.units} unidades do purificador Neo UP, que serão instaladas, operadas e mantidas pela ACQUAFY em locais de clientes finais, sob o modelo de locação (lease).`,
      },
      { h: "Cláusula 2 – Prazo" },
      {
        p: `O contrato vigora por ${CONTRACT.termMonths} meses, contados da data de início (${CONTRACT.start}), encerrando-se em ${CONTRACT.end}, salvo rescisão antecipada ou renovação acordada por escrito entre as partes.`,
      },
      { h: "Cláusula 3 – Repasses" },
      {
        p: `A ACQUAFY repassará ao CONTRATANTE, no dia 1º de cada mês, o valor da competência anterior. O primeiro repasse cobre todos os dias decorridos desde o investimento. Os valores são pagos em dólar americano por ${CONTRACT.payment.toLowerCase()}.`,
      },
      { h: "Cláusula 4 – Lease" },
      {
        p: `O CONTRATANTE faz jus a ${CONTRACT.leaseShare} da receita de lease gerada pelas unidades em operação, conforme demonstrativo mensal disponível no Extrato Financeiro do portal. Unidades temporariamente em estoque ou manutenção não geram receita de lease no período.`,
      },
      { h: "Cláusula 5 – Recompra" },
      {
        p: `Ao término do prazo, o CONTRATANTE poderá solicitar a recompra de uma ou mais unidades, pelo valor de ${CONTRACT.buybackShare} do valor investido proporcional às unidades recompradas. O valor está sujeito a análise e confirmação da ACQUAFY.`,
      },
      { h: "Cláusula 6 – Rescisão" },
      {
        p: "Qualquer das partes pode rescindir o contrato mediante aviso prévio escrito de 60 dias. Na rescisão antecipada, os repasses já vencidos são pagos integralmente e as unidades seguem as regras de recompra vigentes.",
      },
      { h: "Cláusula 7 – Confidencialidade" },
      { p: "As partes comprometem-se a manter sigilo sobre as informações comerciais e financeiras trocadas durante a vigência do contrato e por 24 meses após o seu término." },
      { h: "Cláusula 8 – Foro" },
      { p: "Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias decorrentes deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja." },
      { space: 10 },
      { h: "Assinaturas eletrônicas" },
      {
        kv: [
          ["Acquafy WaaS", `Assinado em ${CONTRACT.start}, 14:28`],
          [INVESTOR.name, `Assinado em ${CONTRACT.start}, 14:32`],
          ["Hash do documento (SHA-256)", HASH],
        ],
      },
    ],
  },

  "comprovante-assinatura-contrato.pdf": {
    title: "Comprovante de Assinatura Eletrônica",
    subtitle: `${CONTRACT.title} · nº ${CONTRACT.number}`,
    meta: ["Certificado de integridade e autoria da assinatura"],
    blocks: [
      { h: "Documento assinado" },
      {
        kv: [
          ["Documento", `${CONTRACT.title}`],
          ["Número do contrato", CONTRACT.number],
          ["Hash (SHA-256)", HASH],
          ["Arquivo", "contrato-participacao-acquafy.pdf"],
        ],
      },
      { h: "Signatários" },
      {
        kv: [
          ["Acquafy WaaS", "Marina Costa, Diretora Comercial"],
          ["Assinatura", `${CONTRACT.start}, 14:28 (UTC-3) · IP 200.147.***.**`],
          ["Contratante", INVESTOR.name],
          ["Assinatura ", `${CONTRACT.start}, 14:32 (UTC-4) · IP 73.***.***.21`],
        ],
      },
      { h: "Validação" },
      { p: "Este comprovante atesta que o documento acima foi assinado eletronicamente pelas partes, com registro de data, hora, endereço IP e impressão digital (hash) do arquivo. Qualquer alteração posterior no documento invalida o hash registrado." },
      { p: "Documento de demonstração: as assinaturas e o hash exibidos são fictícios e servem apenas para ilustrar o Portal do Investidor." },
    ],
  },

  "termos-e-condicoes.pdf": {
    title: "Termos e Condições do Programa",
    subtitle: "Condições gerais de participação no programa Acquafy WaaS.",
    meta: ["Versão 3.1 · Vigente desde 26/10/2026"],
    blocks: [
      { h: "1. Aceitação" },
      { p: "Ao participar do programa Acquafy WaaS, o investidor declara ter lido e aceitado estes Termos e Condições, o Contrato de Participação e a Política de Privacidade." },
      { h: "2. Funcionamento do programa" },
      { li: "O investidor adquire unidades do purificador Neo UP, que ficam sob operação e manutenção da Acquafy." },
      { li: "As unidades são locadas a clientes finais e a receita de lease é repartida conforme o contrato." },
      { li: "Os repasses são calculados mensalmente e pagos no dia 1º do mês seguinte, em dólar americano." },
      { h: "3. Acesso ao portal" },
      { p: "O acesso ao Portal do Investidor é pessoal e intransferível. O investidor é responsável por manter a confidencialidade de suas credenciais e por comunicar qualquer uso indevido." },
      { h: "4. Obrigações da Acquafy" },
      { li: "Instalar, operar e manter as unidades em condições adequadas de funcionamento." },
      { li: "Disponibilizar extrato, calendário de repasses e documentos no portal." },
      { li: "Informar com antecedência qualquer alteração relevante nas condições do programa." },
      { h: "5. Obrigações do investidor" },
      { li: "Manter seus dados cadastrais e bancários atualizados." },
      { li: "Comunicar mudanças de endereço, titularidade ou conta de recebimento." },
      { h: "6. Alterações" },
      { p: "Estes Termos podem ser atualizados. Alterações relevantes serão comunicadas pelo portal e por e-mail com ao menos 30 dias de antecedência." },
    ],
  },

  "politica-de-privacidade.pdf": {
    title: "Política de Privacidade e Proteção de Dados",
    subtitle: "Como a Acquafy coleta, usa e protege os dados dos investidores.",
    meta: ["Versão 2.0 · Vigente desde 26/10/2026"],
    blocks: [
      { h: "1. Dados coletados" },
      { p: "Coletamos dados de identificação (nome, documento, e-mail, telefone), dados bancários para repasse e dados de uso do portal, estritamente para execução do contrato." },
      { h: "2. Finalidades" },
      { li: "Executar o contrato e realizar os repasses." },
      { li: "Cumprir obrigações legais e regulatórias." },
      { li: "Prevenir fraudes e garantir a segurança da conta." },
      { li: "Enviar comunicações sobre repasses, extratos e novidades (conforme suas preferências)." },
      { h: "3. Compartilhamento" },
      { p: "Os dados são compartilhados apenas com instituições financeiras envolvidas nos pagamentos, prestadores de serviço sob contrato de confidencialidade e autoridades, quando exigido por lei." },
      { h: "4. Seus direitos" },
      { p: "Você pode solicitar acesso, correção, portabilidade e eliminação de seus dados a qualquer momento pelo canal de Suporte do portal." },
      { h: "5. Segurança" },
      { p: "Utilizamos criptografia em trânsito e em repouso, controle de acesso por perfil e registros de auditoria. Recomendamos ativar a verificação em duas etapas no seu perfil." },
    ],
  },

  "comprovante-pagamento-neo-up-3.pdf": receipt(3, "A-0001", "26/10/2026", "10:41"),
  "comprovante-pagamento-neo-up-7.pdf": receipt(7, "A-0002", "26/10/2026", "10:44"),
  "comprovante-pagamento-neo-up-10.pdf": receipt(10, "A-0003", "27/10/2026", "09:15"),

  "comprovante-transferencia-investimento.pdf": {
    title: "Comprovante de Transferência",
    subtitle: "Investimento inicial no programa Acquafy WaaS.",
    meta: ["Transferência bancária internacional (USD)"],
    blocks: [
      { h: "Dados da transferência" },
      {
        kv: [
          ["Valor", CONTRACT.invested],
          ["Data", "26/10/2026"],
          ["Origem", `${INVESTOR.name} · Bank of America · conta final 4321`],
          ["Destino", "Acquafy WaaS · conta de captação"],
          ["Referência", `Contrato ${CONTRACT.number}`],
          ["Situação", "Concluída"],
          ["Autenticação", "TRF-26-1026-88F3-0142"],
        ],
      },
      { p: `O valor corresponde à aquisição de ${CONTRACT.units} unidades do purificador Neo UP (${CONTRACT.unitPrice} cada).` },
    ],
  },

  "nota-fiscal-unidades-neo-up.pdf": {
    title: "Nota Fiscal de Aquisição",
    subtitle: "Aquisição de purificadores Neo UP.",
    meta: ["Documento fiscal de demonstração"],
    blocks: [
      { h: "Emitente e destinatário" },
      { kv: [["Emitente", "Acquafy WaaS"], ["Destinatário", INVESTOR.name], ["Documento", INVESTOR.document], ["Data de emissão", "27/10/2026"], ["Número", "NF-000142"]] },
      { h: "Itens" },
      { kv: [["Descrição", "Purificador Neo UP (lote 2401A)"], ["Quantidade", `${CONTRACT.units} unidades`], ["Valor unitário", CONTRACT.unitPrice], ["Valor total", CONTRACT.invested]] },
      { p: "Os números de série das unidades podem ser consultados em Meus Purificadores no portal." },
    ],
  },

  "manual-do-investidor.pdf": {
    title: "Manual do Investidor",
    subtitle: "Guia completo do programa Acquafy WaaS.",
    meta: ["Edição 2026 · 1ª revisão"],
    blocks: [
      { h: "1. Como funciona" },
      { p: "Você investe em unidades do purificador Neo UP. A Acquafy instala, opera e mantém cada unidade e repassa a você, todo mês, uma parte da receita de lease." },
      { h: "2. Acompanhando seu investimento" },
      { li: "Dashboard: visão geral do investimento, próximo repasse e situação das unidades." },
      { li: "Meus Purificadores: lista de unidades com número de série, situação e localização." },
      { li: "Extrato Financeiro: histórico e previsão dos repasses, com comprovantes." },
      { li: "Calendário de Repasses: datas de pagamento de todo o contrato." },
      { h: "3. Repasses" },
      { p: "Os repasses são pagos no dia 1º de cada mês, em dólar americano. O primeiro repasse inclui todos os dias desde a data do investimento." },
      { h: "4. Documentos e contrato" },
      { p: "Seu contrato, comprovantes e manuais ficam disponíveis em Documentos. Você também pode enviar documentos próprios. Em Meu Contrato, consulte cláusulas, aditivos e simule a recompra." },
      { h: "5. Suporte" },
      { p: "Em caso de dúvidas, abra um chamado em Suporte. Respondemos em até 1 dia útil." },
    ],
  },

  "manual-do-produto-neo-up.pdf": {
    title: "Manual do Produto – Neo UP",
    subtitle: "Instalação, uso e manutenção do purificador Neo UP.",
    meta: ["Revisão 4 · Modelo Neo UP"],
    blocks: [
      { h: "1. Visão geral" },
      { p: "O Neo UP é um purificador de água com filtragem em múltiplos estágios, projetado para uso contínuo em residências e pequenos comércios." },
      { h: "2. Instalação" },
      { li: "Posicione o aparelho próximo a um ponto de água e de energia." },
      { li: "Conecte a entrada de água e verifique se não há vazamentos." },
      { li: "Ligue o aparelho e aguarde o ciclo inicial de lavagem (cerca de 10 minutos)." },
      { h: "3. Manutenção" },
      { li: "Troca de filtros a cada 6 meses (realizada pela equipe Acquafy)." },
      { li: "Higienização preventiva a cada 12 meses." },
      { li: "Verificação remota diária do funcionamento." },
      { h: "4. Resolução de problemas" },
      { p: "Se a unidade apresentar baixa vazão, ruídos ou alerta no painel, entre em contato pelo Suporte informando o número de série. Não abra o aparelho." },
    ],
  },

  "faq-do-programa.pdf": {
    title: "Perguntas Frequentes do Investidor",
    subtitle: "Respostas rápidas sobre repasses, contrato e unidades.",
    meta: ["Atualizado em 25/10/2026"],
    blocks: [
      { h: "Quando recebo meus repasses?" },
      { p: "No dia 1º de cada mês, referente ao mês anterior. O primeiro repasse inclui todos os dias desde o investimento." },
      { h: "Em que moeda recebo?" },
      { p: "Em dólar americano. No portal você pode visualizar os valores também em reais ou euros, pela cotação de referência." },
      { h: "O que acontece com unidades em estoque?" },
      { p: "Unidades ainda sem cliente final não geram receita de lease; assim que forem ativadas passam a compor o repasse." },
      { h: "Posso comprar mais unidades?" },
      { p: "Sim. Use Solicitar Mais Purificadores no portal; novas unidades entram em um aditivo ao contrato." },
      { h: "Como funciona a recompra?" },
      { p: `Ao término do contrato você pode solicitar a recompra de unidades por ${CONTRACT.buybackShare} do valor investido proporcional. Use o simulador em Meu Contrato.` },
    ],
  },
};

function receipt(units, protocol, date, time) {
  const total = (units * 400).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  return {
    title: "Comprovante de Pagamento",
    subtitle: `Unidades adquiridas – Neo UP (${units})`,
    meta: [`Protocolo ${protocol} · ${date}, ${time}`],
    blocks: [
      { h: "Pagamento" },
      {
        kv: [
          ["Pagador", INVESTOR.name],
          ["Documento", INVESTOR.document],
          ["Unidades", `${units} purificadores Neo UP`],
          ["Valor por unidade", CONTRACT.unitPrice],
          ["Valor total", `US$ ${total}`],
          ["Contrato", CONTRACT.number],
          ["Situação", "Pagamento confirmado"],
        ],
      },
      { p: "Este comprovante atesta a confirmação do pagamento das unidades acima, integrantes do Contrato de Participação Acquafy WaaS do investidor." },
    ],
  };
}

const marketingZip = [
  {
    name: "readme.txt",
    data: Buffer.from(
      [
        "ACQUAFY - Materiais de Marketing",
        "================================",
        "",
        "Este pacote reúne materiais para divulgação do programa Acquafy WaaS.",
        "",
        "Conteúdo:",
        "  - readme.txt ............ este arquivo",
        "  - guia-de-uso-da-marca.txt  orientações de uso da marca",
        "",
        "Pacote de demonstração do Portal do Investidor. Os arquivos de imagem",
        "(logotipos, fotos, artes para redes sociais) são enviados pela equipe",
        "Acquafy em atualizações do pacote.",
        "",
      ].join("\r\n"),
      "utf8",
    ),
  },
  {
    name: "guia-de-uso-da-marca.txt",
    data: Buffer.from(
      [
        "Guia rápido de uso da marca Acquafy",
        "",
        "1. Mantenha a área de respiro ao redor do logotipo.",
        "2. Use as cores oficiais: azul royal #1F66FF e violeta #7C3AED.",
        "3. Não distorça, gire ou aplique sombras no logotipo.",
        "4. Ao divulgar rendimentos, cite sempre que valores são projeções.",
        "",
      ].join("\r\n"),
      "utf8",
    ),
  },
];

// ---------------------------------------------------------------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true });
let count = 0;
for (const [file, doc] of Object.entries(pdfs)) {
  const buf = buildPdf(doc);
  writeFileSync(new URL(file, new URL("../public/docs/", import.meta.url)), buf);
  console.log(`${file.padEnd(48)} ${buf.length} bytes`);
  count++;
}
const zip = buildZip(marketingZip);
writeFileSync(new URL("materiais-de-marketing.zip", new URL("../public/docs/", import.meta.url)), zip);
console.log(`${"materiais-de-marketing.zip".padEnd(48)} ${zip.length} bytes`);
console.log(`\n${count + 1} files written to ${OUT_DIR}`);
