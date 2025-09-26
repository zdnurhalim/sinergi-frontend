export type DialogType = "interview" | "hire" | "reject" | null;

export interface DialogState {
  type: DialogType;
  payload: {
    date?: Date;
    time?: string;
    message?: string;
    applicantName?: string;
    isOnline?: boolean;
    url?: string;
    location?: string;
  };
}
