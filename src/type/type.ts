export type TuitionMode = "Online" | "Offline" | "Hybrid" | (string & {});

export type TuitionApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | (string & {});

export interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: TuitionMode;
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: TuitionApprovalStatus;
  isActive: boolean;
  createdAt: string;
}

export interface TuitionsApiResponse {
  tuitions?: Tuition[];
  data?: Tuition[];
}
