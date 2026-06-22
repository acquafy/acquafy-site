import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBK from "@/components/CtaBK";
import { CATEGORIAS, getArtigoBySlug } from "@/lib/artigos-data";
import ArtigoPageContent from "@/components/ArtigoPageContent";

type Props = { params: Promise<{ categoria: string; slug: string }> };

export async function generateStaticParams() {
  const params: { categoria: string; slug: string }[] = [];
  for (const cat of CATEGORIAS) {
    for (const artigo of cat.artigos) {
      params.push({ categoria: cat.slug, slug: artigo.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params;
  const result = getArtigoBySlug(categoria, slug);
  if (!result) return { title: "Artigo não encontrado — Acquafy" };
  return {
    title: `${result.artigo.titulo} — Base de Conhecimento Acquafy`,
    description: result.artigo.resumo,
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { categoria, slug } = await params;
  const result = getArtigoBySlug(categoria, slug);
  if (!result) notFound();

  const { artigo, categoria: cat } = result;
  const relacionados = cat.artigos.filter((a) => a.slug !== artigo.slug).slice(0, 3);

  const popularArticles = CATEGORIAS
    .filter((c) => c.slug !== cat.slug)
    .slice(0, 4)
    .map((c) => ({ artigo: c.artigos[0], cat: c }));

  return (
    <>
      <Header />
      <main>
        <ArtigoPageContent
          artigo={artigo}
          cat={cat}
          relacionados={relacionados}
          popularArticles={popularArticles}
        />
        <CtaBK />
      </main>
      <Footer />
    </>
  );
}
