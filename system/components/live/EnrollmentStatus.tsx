// components/live/EnrollmentStatus.tsx
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { enrollmentLabels } from "@/lib/enrollment/types";

const TONES: Record<string, BadgeTone> = {
  invited: "warn",
  changes_requested: "warn",
  details_submitted: "violet",
  approved: "brand",
  accepted: "brand",
  payment_pending: "warn",
  payment_review: "danger",
  active: "ok",
  cancelled: "neutral",
};

/** Investor-enrollment state as a badge: tone by stage, text from `enrollmentLabels`. */
export function EnrollmentStatus({ status }: { status: string }) {
  return (
    <Badge tone={TONES[status] ?? "neutral"} dot>
      {(enrollmentLabels as Record<string, string>)[status] ?? status}
    </Badge>
  );
}
