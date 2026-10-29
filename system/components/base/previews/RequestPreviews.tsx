// components/base/previews/RequestPreviews.tsx
import { MobileRequest } from "@/components/mobile/sections/MobileRequest";
import { RequestSummary } from "@/components/sections/RequestSummary";
import { RequestWorkspace } from "@/components/sections/RequestWorkspace";
import { UNIT_PRICE } from "@/config/investor";
import { projectRequest, type ProjectionBaseline } from "@/lib/portal/projection";
import { getPortalSummary } from "@/lib/portal/schedule";
import {
  MobileRequestHistoryDemo,
  MobileRequestStepsDemo,
  RequestHistoryDemo,
  RequestStepInstallDemo,
  RequestStepPaymentDemo,
  RequestStepQuantityDemo,
  RequestStepReviewDemo,
  RequestSuccessDemo,
} from "./RequestDemos";
import type { PreviewMap } from "./types";

/** Same baseline the pages build: what the investor owns today, plus the price of one unit. */
function baseline(): ProjectionBaseline & { today: string } {
  const s = getPortalSummary();
  return { units: s.units, monthlyPayout: s.monthlyPayout, installments: s.installments.length, unitPrice: UNIT_PRICE, today: s.today };
}

export const requestPreviews: PreviewMap = {
  RequestHistory: () => ({ node: <RequestHistoryDemo baseline={baseline()} /> }),
  RequestStepInstall: () => ({ node: <RequestStepInstallDemo /> }),
  RequestStepPayment: () => ({ node: <RequestStepPaymentDemo /> }),
  RequestStepQuantity: () => ({ node: <RequestStepQuantityDemo unitPrice={UNIT_PRICE} /> }),
  RequestStepReview: () => ({ node: <RequestStepReviewDemo baseline={baseline()} /> }),
  RequestSuccess: () => ({ node: <RequestSuccessDemo /> }),
  RequestSummary: () => ({
    node: (
      <div className="max-w-sm">
        <RequestSummary projection={projectRequest(5, baseline())} />
      </div>
    ),
  }),
  RequestWorkspace: () => {
    const { today, ...base } = baseline();
    return { node: <RequestWorkspace today={today} baseline={base} /> };
  },
  MobileRequest: () => {
    const { today, ...base } = baseline();
    return { node: <MobileRequest today={today} baseline={base} />, tall: true };
  },
  MobileRequestHistory: () => ({ node: <MobileRequestHistoryDemo baseline={baseline()} />, tall: true }),
  MobileRequestSteps: () => ({ node: <MobileRequestStepsDemo baseline={baseline()} />, tall: true, note: "Quatro etapas no mesmo arquivo: quantidade, instalação, pagamento e revisão." }),
};
