export type User = { id: string; name: string; email: string };

export interface Sharing {
  owners: string[];
  participants: string[];
  taskLeads: string[];
  taskParticipants: string[];
  taskShadows: string[];
  effortFacilitators: string[];
  effortParticipants: string[];
  effortShadows: string[];
  peerParticipants: string[];
  peerShadows: string[];
}

export type AttachmentLabel = "scoping call" | "discovery session" | "scope presentation" | "GFA";
export interface Attachment { id: string; name: string; url: string; labels: AttachmentLabel[] }

export interface OpportunityInfo {
  salesforceId: string;
  salesforceLink: string;
  clientName: string;
  clientShortName: string;
  opportunityName: string;
  opportunityDescription: string;
  presalesRequestUrl?: string;
  attachments: Attachment[];
}

export interface ComplexityMatrix {
  projectType: string;
  contractType: string;
  strategicImportance: "Low" | "Medium" | "High";
  stakeholderSupport: "Low" | "Medium" | "High";
  usersAffected: "<100" | "100-1k" | "1k-10k" | ">10k";
  requirementsVolatility: "Stable" | "Moderate" | "Volatile";
  products: string[];
  technicalDependencies: string;
  partnerDependencies: string;
  geographicDelivery: string;
  urgency: "Low" | "Medium" | "High";
  priorExperience: "New" | "Some" | "Experienced";
  documentationLanguage: string;
  systemAccess: "None" | "Limited" | "Full";
  engSupported: boolean;
  teamCompositionNotes: string;
  teamSize: number;
  durationWeeks: number;
}

export interface Outcome { id: string; phase: string; track: string; description: string }
export interface TaskItem {
  id: string;
  phase: string;
  track: string;
  product: string;
  environment: string;
  name: string;
  bestCase: number;
  mostLikely: number;
  worstCase: number;
  notes?: string;
}
export interface Risk { id: string; description: string; mitigation?: string }
export interface OutOfScope { id: string; description: string }
export interface Prereq { id: string; description: string }
export interface TrainingRec { id: string; audience: string; topic: string; format: string }
export interface TeamRole { id: string; name: string; responsibilities?: string }
export interface TeamModeling { id: string; role: string; weeks: number }

export type ProjectStatus = "created" | "level of effort completed" | "peer verified" | "delivered to client";

export interface ProjectTemplate {
  id: string;
  name: string;
  description?: string;
  defaults: Partial<{
    matrix: ComplexityMatrix;
    outcomes: Outcome[];
    tasks: TaskItem[];
    risks: Risk[];
    outOfScope: OutOfScope[];
    prereqs: Prereq[];
    training: TrainingRec[];
    teamRoles: TeamRole[];
    teamModeling: TeamModeling[];
  }>;
}

export interface Project {
  id: string;
  name: string;
  templateId?: string;
  status: ProjectStatus;
  opportunity: OpportunityInfo;
  matrix: ComplexityMatrix;
  outcomes: Outcome[];
  tasks: TaskItem[];
  risks: Risk[];
  outOfScope: OutOfScope[];
  prereqs: Prereq[];
  training: TrainingRec[];
  teamRoles: TeamRole[];
  teamModeling: TeamModeling[];
  sharing: Sharing;
  createdAt: string;
  updatedAt: string;
}

export type DB = { users: User[]; templates: ProjectTemplate[]; projects: Project[] };
export const uid = () => Math.random().toString(36).slice(2, 10);