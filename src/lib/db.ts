import { DB, Project, ProjectTemplate, uid, User } from "../models/types";

const LS_KEY = "pf-estimator";

export const seedUsers: User[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@example.com" },
  { id: "u2", name: "Sam Patel", email: "sam@example.com" },
  { id: "u3", name: "Jamie Lee", email: "jamie@example.com" },
  { id: "u4", name: "Priya Chen", email: "priya@example.com" },
];

export const seedTemplate: ProjectTemplate = {
  id: "t1",
  name: "Standard App Migration",
  description: "Baseline for app migration to OpenShift with discovery & build phases.",
  defaults: {
    matrix: {
      projectType: "Migration",
      contractType: "T&M",
      strategicImportance: "Medium",
      stakeholderSupport: "Medium",
      usersAffected: "1k-10k",
      requirementsVolatility: "Moderate",
      products: ["OpenShift", "RHEL", "Ansible"],
      technicalDependencies: "AD, LDAP, Oracle",
      partnerDependencies: "GSI partner X for data migration",
      geographicDelivery: "Multi-region",
      urgency: "Medium",
      priorExperience: "Experienced",
      documentationLanguage: "EN",
      systemAccess: "Limited",
      engSupported: true,
      teamCompositionNotes: "Architect + 2 Consultants + PM",
      teamSize: 4,
      durationWeeks: 12,
    },
    outcomes: [
      { id: uid(), phase: "Discovery", track: "Platform", description: "Baseline architecture documented" },
      { id: uid(), phase: "Build", track: "App", description: "Pilot app migrated to OpenShift" },
    ],
    tasks: [
      { id: uid(), phase: "Discovery", track: "Platform", product: "OpenShift", environment: "LAB", name: "Environment assessment", bestCase: 1, mostLikely: 2, worstCase: 4, notes: "Stakeholder interviews" },
      { id: uid(), phase: "Build", track: "App", product: "OpenShift", environment: "DEV", name: "Containerize pilot", bestCase: 2, mostLikely: 4, worstCase: 7 },
    ],
    risks: [ { id: uid(), description: "Access delays", mitigation: "Request early; escalate via sponsor" } ],
    outOfScope: [ { id: uid(), description: "Production support beyond hypercare" } ],
    prereqs: [ { id: uid(), description: "Access to source repo and CI pipeline" } ],
    training: [ { id: uid(), audience: "Ops", topic: "OpenShift Admin", format: "Instructor-led" } ],
    teamRoles: [ { id: uid(), name: "Architect", responsibilities: "Overall solution design" } ],
    teamModeling: [ { id: uid(), role: "Architect", weeks: 12 } ],
  },
};

export function initDB(): DB {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) return JSON.parse(raw);
  const db: DB = { users: seedUsers, templates: [seedTemplate], projects: [] };
  localStorage.setItem(LS_KEY, JSON.stringify(db));
  return db;
}

export function saveDB(db: DB) { localStorage.setItem(LS_KEY, JSON.stringify(db)); }

export function cloneIntoProjectFromTemplate(t: ProjectTemplate, users = seedUsers): Project {
  const now = new Date().toISOString();
  const defaults = t.defaults ?? {};
  return {
    id: uid(),
    name: `${t.name} - ${new Date().toLocaleDateString()}`,
    templateId: t.id,
    status: "created",
    opportunity: {
      salesforceId: "",
      salesforceLink: "",
      clientName: "",
      clientShortName: "",
      opportunityName: "",
      opportunityDescription: "",
      attachments: [],
    },
    matrix: defaults.matrix ?? {
      projectType: "",
      contractType: "",
      strategicImportance: "Medium",
      stakeholderSupport: "Medium",
      usersAffected: "100-1k",
      requirementsVolatility: "Moderate",
      products: [],
      technicalDependencies: "",
      partnerDependencies: "",
      geographicDelivery: "",
      urgency: "Medium",
      priorExperience: "Some",
      documentationLanguage: "EN",
      systemAccess: "Limited",
      engSupported: false,
      teamCompositionNotes: "",
      teamSize: 3,
      durationWeeks: 8,
    },
    outcomes: defaults.outcomes ?? [],
    tasks: defaults.tasks ?? [],
    risks: defaults.risks ?? [],
    outOfScope: defaults.outOfScope ?? [],
    prereqs: defaults.prereqs ?? [],
    training: defaults.training ?? [],
    teamRoles: defaults.teamRoles ?? [],
    teamModeling: defaults.teamModeling ?? [],
    sharing: {
      owners: [users[0].id],
      participants: [users[1].id],
      taskLeads: [], taskParticipants: [], taskShadows: [],
      effortFacilitators: [], effortParticipants: [], effortShadows: [],
      peerParticipants: [], peerShadows: [],
    },
    createdAt: now,
    updatedAt: now,
  };
}

// Simple hook wrapper for localStorage-backed DB
import { useEffect, useState } from "react";
export const useDB = () => {
  const [db, setDb] = useState<DB | null>(null);
  useEffect(() => { setDb(initDB()); }, []);
  const persist = (updater: (d: DB) => void) => {
    if (!db) return;
    const next = { ...db };
    updater(next);
    setDb(next);
    saveDB(next);
  };
  return { db, persist };
};