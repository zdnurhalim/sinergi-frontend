export type AlertType = "shortlist" | "reject" | "hire" | "interview" | null;

export interface AlertState {
  type: AlertType;
  payload?: {
    applicantName?: string;
    applicantId?: number;
  };
}