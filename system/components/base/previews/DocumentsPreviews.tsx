// components/base/previews/DocumentsPreviews.tsx
import { MobileDocumentsExplorer } from "@/components/mobile/sections/MobileDocumentsExplorer";
import { DocumentsLibrary } from "@/components/sections/DocumentsLibrary";
import { officialDocuments } from "@/config/documents-page";
import { portalToday } from "@/lib/portal/schedule";
import {
  DocumentRowDemo,
  DocumentsAsideDemo,
  DocumentsPreviewModalDemo,
  DocumentsUploadModalDemo,
  MobileDocumentPreviewSheetDemo,
  MobileDocumentRowDemo,
  MobileDocumentUploadSheetDemo,
} from "./DocumentsDemos";
import type { PreviewMap } from "./types";

/** A contract: official documents have a file, so preview, download and "open in a new tab" all work. */
const sample = () => officialDocuments[0];

export const documentsPreviews: PreviewMap = {
  DocumentsAside: () => ({ node: <DocumentsAsideDemo documents={officialDocuments} /> }),
  DocumentsLibrary: () => ({ node: <DocumentsLibrary today={portalToday()} /> }),
  DocumentsPreviewModal: () => ({ node: <DocumentsPreviewModalDemo doc={sample()} /> }),
  DocumentsRow: () => ({ node: <DocumentRowDemo doc={sample()} />, note: "Exporta também DocumentsColumnHeader (cabeçalho das colunas), mostrado junto." }),
  DocumentsUploadModal: () => ({ node: <DocumentsUploadModalDemo today={portalToday()} /> }),
  MobileDocumentPreviewSheet: () => ({ node: <MobileDocumentPreviewSheetDemo doc={sample()} />, tall: true }),
  MobileDocumentRow: () => ({ node: <MobileDocumentRowDemo doc={sample()} />, tall: true }),
  MobileDocumentUploadSheet: () => ({ node: <MobileDocumentUploadSheetDemo today={portalToday()} />, tall: true }),
  MobileDocumentsExplorer: () => ({ node: <MobileDocumentsExplorer today={portalToday()} />, tall: true }),
};
