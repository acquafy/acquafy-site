"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2v8M5.5 7.5L8 10l2.5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12v.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type DownloadFile = {
  nome: string;
  tipo: "PDF" | "ZIP" | "APP";
  tamanho: string;
  href: string;
};

type DownloadCategoria = {
  titulo: string;
  arquivos: DownloadFile[];
  scroll?: boolean;
};

const tipoBadge: Record<DownloadFile["tipo"], { bg: string; color: string }> = {
  PDF: { bg: "#fee2e2", color: "#b91c1c" },
  ZIP: { bg: "#e0e7ff", color: "#4338ca" },
  APP: { bg: "#dcfce7", color: "#15803d" },
};

const T: Record<Lang, {
  heading: string;
  subheading: string;
  categorias: DownloadCategoria[];
}> = {
  pt: {
    heading: "Downloads",
    subheading: "Manuais, guias, softwares e documentos disponíveis para download.",
    categorias: [
      {
        titulo: "Manuais",
        scroll: true,
        arquivos: [
          { nome: "Manual do Usuário — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "Manual do Usuário — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manual do Usuário — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manual do Usuário — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manual do Usuário — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manual do Usuário — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual do Usuário — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual do Usuário — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual do Usuário — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual do Usuário — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual do Usuário — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual do Usuário — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Usuário — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Guias Rápidos",
        arquivos: [
          { nome: "Guia de Instalação Rápida",       tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Guia de Manutenção e Limpeza",    tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Primeiros Passos — App Acquafy",  tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Guia do Parceiro Acquafy",        tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Guia de Troca de Filtros",        tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Softwares",
        arquivos: [
          { nome: "App Acquafy — iOS",    tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Firmware Neo v2.4.1",  tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Documentos",
        arquivos: [
          { nome: "Ficha Técnica — Linha Neo",           tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Certificado de Conformidade",         tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Contrato Modelo de Parceria",         tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Política de Garantia Acquafy",        tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Declaração de Conformidade ANATEL",   tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  en: {
    heading: "Downloads",
    subheading: "Manuals, guides, software, and documents available for download.",
    categorias: [
      {
        titulo: "Manuals",
        scroll: true,
        arquivos: [
          { nome: "User Manual — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "User Manual — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "User Manual — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "User Manual — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "User Manual — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "User Manual — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "User Manual — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "User Manual — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "User Manual — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "User Manual — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "User Manual — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "User Manual — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "User Manual — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Quick Guides",
        arquivos: [
          { nome: "Quick Installation Guide",        tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Maintenance and Cleaning Guide",  tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Getting Started — Acquafy App",   tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Acquafy Partner Guide",           tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Filter Replacement Guide",        tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Software",
        arquivos: [
          { nome: "Acquafy App — iOS",    tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "Acquafy App — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Neo Firmware v2.4.1",  tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Documents",
        arquivos: [
          { nome: "Technical Sheet — Neo Line",         tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Certificate of Conformity",          tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Partnership Agreement Template",     tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Acquafy Warranty Policy",            tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "ANATEL Declaration of Conformity",   tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  es: {
    heading: "Descargas",
    subheading: "Manuales, guías, software y documentos disponibles para descarga.",
    categorias: [
      {
        titulo: "Manuales",
        scroll: true,
        arquivos: [
          { nome: "Manual de Usuario — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "Manual de Usuario — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manual de Usuario — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manual de Usuario — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manual de Usuario — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manual de Usuario — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual de Usuario — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual de Usuario — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual de Usuario — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual de Usuario — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual de Usuario — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual de Usuario — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual de Usuario — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Guías Rápidas",
        arquivos: [
          { nome: "Guía de Instalación Rápida",          tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Guía de Mantenimiento y Limpieza",    tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Primeros Pasos — App Acquafy",        tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Guía del Socio Acquafy",              tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Guía de Cambio de Filtros",           tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Software",
        arquivos: [
          { nome: "App Acquafy — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Firmware Neo v2.4.1",   tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Documentos",
        arquivos: [
          { nome: "Ficha Técnica — Línea Neo",           tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Certificado de Conformidad",          tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Contrato Modelo de Asociación",       tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Política de Garantía Acquafy",        tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Declaración de Conformidad ANATEL",   tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  fr: {
    heading: "Téléchargements",
    subheading: "Manuels, guides, logiciels et documents disponibles en téléchargement.",
    categorias: [
      {
        titulo: "Manuels Utilisateur",
        scroll: true,
        arquivos: [
          { nome: "Manuel Utilisateur — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "Manuel Utilisateur — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manuel Utilisateur — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manuel Utilisateur — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manuel Utilisateur — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manuel Utilisateur — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuel Utilisateur — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Guides Rapides",
        arquivos: [
          { nome: "Guide d'Installation Rapide",          tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Guide de Maintenance et Nettoyage",    tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Premiers Pas — Application Acquafy",   tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Guide du Partenaire Acquafy",          tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Guide de Remplacement des Filtres",    tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Logiciels",
        arquivos: [
          { nome: "App Acquafy — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Firmware Neo v2.4.1",   tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Documents",
        arquivos: [
          { nome: "Fiche Technique — Gamme Neo",          tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Certificat de Conformité",             tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Modèle de Contrat de Partenariat",     tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Politique de Garantie Acquafy",        tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Déclaration de Conformité ANATEL",     tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  de: {
    heading: "Downloads",
    subheading: "Handbücher, Leitfäden, Software und Dokumente zum Herunterladen.",
    categorias: [
      {
        titulo: "Benutzerhandbücher",
        scroll: true,
        arquivos: [
          { nome: "Benutzerhandbuch — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "Benutzerhandbuch — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Benutzerhandbuch — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Benutzerhandbuch — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Benutzerhandbuch — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Benutzerhandbuch — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Benutzerhandbuch — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Kurzanleitungen",
        arquivos: [
          { nome: "Schnellinstallationsanleitung",        tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Wartungs- und Reinigungsanleitung",    tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Erste Schritte — Acquafy App",         tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Acquafy Partner-Leitfaden",            tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Filteraustauschanleitung",             tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Software",
        arquivos: [
          { nome: "Acquafy App — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "Acquafy App — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Neo Firmware v2.4.1",   tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Dokumente",
        arquivos: [
          { nome: "Technisches Datenblatt — Neo-Linie",   tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Konformitätszertifikat",               tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Partnerschaftsvertragsvorlage",        tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Acquafy Garantierichtlinie",           tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "ANATEL-Konformitätserklärung",         tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  it: {
    heading: "Download",
    subheading: "Manuali, guide, software e documenti disponibili per il download.",
    categorias: [
      {
        titulo: "Manuali Utente",
        scroll: true,
        arquivos: [
          { nome: "Manuale Utente — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "Manuale Utente — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manuale Utente — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manuale Utente — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manuale Utente — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manuale Utente — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manuale Utente — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manuale Utente — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manuale Utente — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manuale Utente — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manuale Utente — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manuale Utente — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manuale Utente — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Guide Rapide",
        arquivos: [
          { nome: "Guida all'Installazione Rapida",       tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Guida alla Manutenzione e Pulizia",    tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Primi Passi — App Acquafy",            tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Guida del Partner Acquafy",            tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Guida alla Sostituzione dei Filtri",   tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Software",
        arquivos: [
          { nome: "App Acquafy — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Firmware Neo v2.4.1",   tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Documenti",
        arquivos: [
          { nome: "Scheda Tecnica — Linea Neo",           tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Certificato di Conformità",            tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Modello di Contratto di Partnership",  tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Politica di Garanzia Acquafy",         tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Dichiarazione di Conformità ANATEL",   tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  zh: {
    heading: "下载",
    subheading: "提供手册、指南、软件和文档下载。",
    categorias: [
      {
        titulo: "用户手册",
        scroll: true,
        arquivos: [
          { nome: "用户手册 — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "用户手册 — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "用户手册 — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "用户手册 — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "用户手册 — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "用户手册 — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "用户手册 — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "用户手册 — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "用户手册 — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "用户手册 — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "用户手册 — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "用户手册 — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "用户手册 — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "快速指南",
        arquivos: [
          { nome: "快速安装指南",              tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "维护与清洁指南",            tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "入门指南 — Acquafy 应用",   tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Acquafy 合作伙伴指南",      tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "滤芯更换指南",              tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "软件",
        arquivos: [
          { nome: "Acquafy 应用 — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "Acquafy 应用 — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Neo 固件 v2.4.1",        tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "文档",
        arquivos: [
          { nome: "技术规格表 — Neo 系列",    tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "合规证书",                tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "合作伙伴协议模板",         tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Acquafy 保修政策",        tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "ANATEL 合规声明",         tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  ja: {
    heading: "ダウンロード",
    subheading: "マニュアル、ガイド、ソフトウェア、ドキュメントをダウンロードできます。",
    categorias: [
      {
        titulo: "ユーザーマニュアル",
        scroll: true,
        arquivos: [
          { nome: "ユーザーマニュアル — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "ユーザーマニュアル — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "ユーザーマニュアル — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "ユーザーマニュアル — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "ユーザーマニュアル — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "ユーザーマニュアル — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "ユーザーマニュアル — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "クイックガイド",
        arquivos: [
          { nome: "クイックインストールガイド",       tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "メンテナンス・クリーニングガイド", tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "はじめに — Acquafy アプリ",        tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Acquafy パートナーガイド",         tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "フィルター交換ガイド",             tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "ソフトウェア",
        arquivos: [
          { nome: "Acquafy アプリ — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "Acquafy アプリ — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Neo ファームウェア v2.4.1", tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "ドキュメント",
        arquivos: [
          { nome: "技術仕様書 — Neo シリーズ",        tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "適合証明書",                       tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "パートナーシップ契約テンプレート", tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Acquafy 保証ポリシー",             tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "ANATEL 適合宣言",                  tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
  ko: {
    heading: "다운로드",
    subheading: "다운로드 가능한 매뉴얼, 가이드, 소프트웨어 및 문서.",
    categorias: [
      {
        titulo: "사용자 매뉴얼",
        scroll: true,
        arquivos: [
          { nome: "사용자 매뉴얼 — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "사용자 매뉴얼 — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "사용자 매뉴얼 — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "사용자 매뉴얼 — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "사용자 매뉴얼 — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "사용자 매뉴얼 — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "사용자 매뉴얼 — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "빠른 가이드",
        arquivos: [
          { nome: "빠른 설치 가이드",              tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "유지보수 및 청소 가이드",       tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "시작하기 — Acquafy 앱",         tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Acquafy 파트너 가이드",         tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "필터 교체 가이드",              tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "소프트웨어",
        arquivos: [
          { nome: "Acquafy 앱 — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "Acquafy 앱 — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Neo 펌웨어 v2.4.1",    tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "문서",
        arquivos: [
          { nome: "기술 사양서 — Neo 라인",        tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "적합성 인증서",                 tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "파트너십 계약 템플릿",          tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Acquafy 보증 정책",             tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "ANATEL 적합성 선언",            tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },

  "pt-pt": {
    heading: "Downloads",
    subheading: "Manuais, guias, softwares e documentos disponíveis para transferência.",
    categorias: [
      {
        titulo: "Manuais",
        scroll: true,
        arquivos: [
          { nome: "Manual do Utilizador — Neo UP",                    tipo: "PDF", tamanho: "7 MB",  href: "#" },
          { nome: "Manual do Utilizador — Neo FIT",                   tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manual do Utilizador — Neo SMART H₂",             tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manual do Utilizador — Neo TOUCH",                 tipo: "PDF", tamanho: "8 MB",  href: "#" },
          { nome: "Manual do Utilizador — Neo PLUS",                  tipo: "PDF", tamanho: "9 MB",  href: "#" },
          { nome: "Manual do Utilizador — Neo ULTRA",                 tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo ULTRA SPARK",           tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo ULTRA SPARK H₂",       tipo: "PDF", tamanho: "10 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo MAX",                   tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo MAX SPARK",             tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo MAX SPARK H₂",         tipo: "PDF", tamanho: "11 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo INFINITY",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo INFINITY SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo INFINITY SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo PRESTIGE",              tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo PRESTIGE SPARK",        tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo PRESTIGE SPARK H₂",    tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo PRIME",                 tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo PRIME SPARK",           tipo: "PDF", tamanho: "12 MB", href: "#" },
          { nome: "Manual do Utilizador — Neo PRIME SPARK H₂",       tipo: "PDF", tamanho: "12 MB", href: "#" },
        ],
      },
      {
        titulo: "Guias Rápidos",
        arquivos: [
          { nome: "Guia de Instalação Rápida",           tipo: "PDF", tamanho: "2 MB",  href: "#" },
          { nome: "Guia de Manutenção e Limpeza",        tipo: "PDF", tamanho: "3 MB",  href: "#" },
          { nome: "Primeiros Passos — App Acquafy",      tipo: "PDF", tamanho: "4 MB",  href: "#" },
          { nome: "Guia do Parceiro Acquafy",            tipo: "PDF", tamanho: "5 MB",  href: "#" },
          { nome: "Guia de Substituição de Filtros",     tipo: "PDF", tamanho: "2 MB",  href: "#" },
        ],
      },
      {
        titulo: "Softwares",
        arquivos: [
          { nome: "App Acquafy — iOS",     tipo: "APP", tamanho: "App Store",  href: "#" },
          { nome: "App Acquafy — Android", tipo: "APP", tamanho: "Play Store", href: "#" },
          { nome: "Firmware Neo v2.4.1",   tipo: "ZIP", tamanho: "15 MB",      href: "#" },
        ],
      },
      {
        titulo: "Documentos",
        arquivos: [
          { nome: "Ficha Técnica — Linha Neo",              tipo: "PDF", tamanho: "3 MB",   href: "#" },
          { nome: "Certificado de Conformidade",            tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Contrato Modelo de Parceria",            tipo: "PDF", tamanho: "2 MB",   href: "#" },
          { nome: "Política de Garantia Acquafy",           tipo: "PDF", tamanho: "1 MB",   href: "#" },
          { nome: "Declaração de Conformidade ANATEL",      tipo: "PDF", tamanho: "500 KB", href: "#" },
        ],
      },
    ],
  },
};

export default function DownloadsBK() {
  const { lang } = useLang();
  const t = T[lang];
  const categorias = t.categorias;

  return (
    <section
      id="downloads"
      className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]"
    >
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subheading}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] w-full">
          {categorias.map((cat) => (
            <div
              key={cat.titulo}
              className="border border-[#e8edf5] rounded-[16px] overflow-hidden"
            >
              {/* Category header */}
              <div className="bg-[#f6f9fe] px-[20px] py-[14px] border-b border-[#e8edf5]">
                <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91]">
                  {cat.titulo}
                </h3>
              </div>

              {/* File list */}
              <ul className={`list-none m-0 p-0 divide-y divide-[#f0f3f9]${cat.scroll ? " max-h-[282px] overflow-y-auto" : ""}`}>
                {cat.arquivos.map((arquivo) => {
                  const badge = tipoBadge[arquivo.tipo];
                  return (
                    <li key={arquivo.nome}>
                      <a
                        href={arquivo.href}
                        className="group flex gap-[12px] items-center px-[20px] py-[14px] hover:bg-[#f6f9fe] transition-colors no-underline"
                      >
                        {/* Type badge */}
                        <span
                          className="shrink-0 font-['Avenir_LT_Pro:85_Heavy'] text-[10px] leading-none px-[7px] py-[4px] rounded-[4px] w-[36px] text-center"
                          style={{ backgroundColor: badge.bg, color: badge.color }}
                        >
                          {arquivo.tipo}
                        </span>

                        {/* File name */}
                        <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#333] group-hover:text-[#0233c3] transition-colors flex-1 min-w-0">
                          {arquivo.nome}
                        </span>

                        {/* File size */}
                        <span className="shrink-0 font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#999] whitespace-nowrap">
                          {arquivo.tamanho}
                        </span>

                        {/* Download button */}
                        <div className="shrink-0 flex items-center justify-center size-[32px] rounded-[8px] bg-[#f0f4ff] group-hover:bg-[#0233c3] transition-colors text-[#0233c3] group-hover:text-white">
                          <IconDownload />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
