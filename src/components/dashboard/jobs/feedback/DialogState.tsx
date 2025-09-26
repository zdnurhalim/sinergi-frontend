import React from "react";
import { ReusableDialog } from "@/components/reusable/Dialog";
import { DatePicker } from "@/components/reusable/Datepicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // ✅ shadcn switch
import { Label } from "@/components/ui/label";   // ✅ shadcn label
import { DialogState } from "@/types/DialogType";

interface JobDialogsProps {
  dialogState: DialogState;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
  onInterviewConfirm: () => void;
  onHireConfirm: () => void;
  onRejectConfirm: () => void;
}

export const JobDialogs: React.FC<JobDialogsProps> = ({
  dialogState,
  setDialogState,
  onInterviewConfirm,
  onHireConfirm,
  onRejectConfirm,
}) => {
  if (!dialogState.type) return null;

  const dialogConfig = {
    interview: {
      title: "Set Interview Schedule",
      description: "Choose a date and message for the candidate.",
      confirmText: "Send Invitation",
      onConfirm: onInterviewConfirm,
      renderContent: () => (
        <>
          {/* Switch Online/Offline */}
          <div className="flex items-center gap-3 mb-3">
            <Label htmlFor="interview-mode" className="text-sm font-medium">
              {dialogState.payload.isOnline ? "Online Interview" : "Offline Interview"}
            </Label>
            <Switch
              id="interview-mode"
              checked={dialogState.payload.isOnline ?? false}
              onCheckedChange={(checked) =>
                setDialogState((prev) => ({
                  ...prev,
                  payload: { ...prev.payload, isOnline: checked },
                }))
              }
            />
          </div>

          {/* Conditional Field */}
          {dialogState.payload.isOnline ? (
            <Input
              type="url"
              placeholder="Enter video conference URL"
              value={dialogState.payload.url ?? ""}
              onChange={(e) =>
                setDialogState((prev) => ({
                  ...prev,
                  payload: { ...prev.payload, url: e.target.value },
                }))
              }
              className="mb-3"
            />
          ) : (
            <Input
              type="text"
              placeholder="Enter interview location"
              value={dialogState.payload.location ?? ""}
              onChange={(e) =>
                setDialogState((prev) => ({
                  ...prev,
                  payload: { ...prev.payload, location: e.target.value },
                }))
              }
              className="mb-3"
            />
          )}

          {/* Tanggal + Jam */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <DatePicker
                value={dialogState.payload.date}
                onChange={(date) =>
                  setDialogState((prev) => ({
                    ...prev,
                    payload: { ...prev.payload, date },
                  }))
                }
              />
            </div>
            <div className="flex-1">
              <Input
                type="time"
                value={dialogState.payload.time ?? ""}
                onChange={(e) =>
                  setDialogState((prev) => ({
                    ...prev,
                    payload: { ...prev.payload, time: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          {/* Message */}
          <Textarea
            placeholder="Message to candidate..."
            value={dialogState.payload.message ?? ""}
            onChange={(e) =>
              setDialogState((prev) => ({
                ...prev,
                payload: { ...prev.payload, message: e.target.value },
              }))
            }
            rows={3}
          />
        </>
      ),
    },
    hire: {
      title: "Set Meeting Schedule",
      description: "Choose a date and message for the meeting.",
      confirmText: "Send Invitation",
      onConfirm: onHireConfirm,
      renderContent: () => (
        <>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <DatePicker
                value={dialogState.payload.date}
                onChange={(date) =>
                  setDialogState((prev) => ({
                    ...prev,
                    payload: { ...prev.payload, date },
                  }))
                }
              />
            </div>
            <div className="flex-1">
              <Input
                type="time"
                value={dialogState.payload.time ?? ""}
                onChange={(e) =>
                  setDialogState((prev) => ({
                    ...prev,
                    payload: { ...prev.payload, time: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <Textarea
            placeholder="Message to candidate..."
            value={dialogState.payload.message ?? ""}
            onChange={(e) =>
              setDialogState((prev) => ({
                ...prev,
                payload: { ...prev.payload, message: e.target.value },
              }))
            }
            rows={3}
          />
        </>
      ),
    },
    reject: {
      title: `Reject Candidate ${dialogState.payload.applicantName ?? ""}`,
      description: "Fill in the message to be sent to the candidate.",
      confirmText: "Reject Candidate",
      onConfirm: onRejectConfirm,
      renderContent: () => (
        <Textarea
          placeholder="Message to candidate..."
          value={dialogState.payload.message ?? ""}
          onChange={(e) =>
            setDialogState((prev) => ({
              ...prev,
              payload: { ...prev.payload, message: e.target.value },
            }))
          }
          rows={3}
        />
      ),
    },
  };

  const { title, description, confirmText, onConfirm, renderContent } =
    dialogConfig[dialogState.type];

  return (
    <ReusableDialog
      open={!!dialogState.type}
      onOpenChange={(open) =>
        setDialogState((prev) => ({ ...prev, type: open ? prev.type : null }))
      }
      title={title}
      description={description}
      confirmText={confirmText}
      onConfirm={onConfirm}
    >
      {renderContent()}
    </ReusableDialog>
  );
};
