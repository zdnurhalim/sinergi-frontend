import { AlertState, AlertType } from "@/types/AlertType";
import { ReusableAlert } from "@/components/reusable/AlertDialog";
import { DialogState } from "@/types/DialogType";

interface JobAlertsProps {
  alertState: AlertState;
  setAlertState: React.Dispatch<React.SetStateAction<AlertState>>;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
  onShortlist: () => void;
}

export const JobAlerts: React.FC<JobAlertsProps> = ({
  alertState,
  setAlertState,
  setDialogState,
  onShortlist,
}) => {
  if (!alertState.type) return null;

  const alertConfig = {
    reject: {
      title: `Reject Candidate ${alertState.payload?.applicantName ?? ""}`,
      description: "This action cannot be undone.",
      confirmText: "Yes, Reject",
      onConfirm: () =>
        setDialogState({
          type: "reject",
          payload: { applicantName: alertState.payload?.applicantName ?? "" },
        }),
    },
    shortlist: {
      title: "Shortlist Candidate?",
      description: "This will permanently shortlist the candidate.",
      confirmText: "Yes, Shortlist",
      onConfirm: onShortlist,
    },
    interview: {
      title: "Schedule Interview?",
      description: "This will permanently schedule an interview.",
      confirmText: "Yes, Schedule",
      onConfirm: () =>
        setDialogState({
          type: "interview",
          payload: { applicantName: alertState.payload?.applicantName ?? "" },
        }),
    },
    hire: {
      title: "Hire Candidate?",
      description: "This will permanently hire the candidate.",
      confirmText: "Yes, Hire",
      onConfirm: () =>
        setDialogState({
          type: "hire",
          payload: { applicantName: alertState.payload?.applicantName ?? "" },
        }),
    },
  };

  const { title, description, confirmText, onConfirm } =
    alertConfig[alertState.type];

  return (
    <ReusableAlert
      open={!!alertState.type}
      onOpenChange={(open) =>
        setAlertState(
          open ? alertState : { type: null } // reset kalau ditutup
        )
      }
      title={title}
      description={description}
      confirmText={confirmText}
      onConfirm={onConfirm}
    />
  );
};
