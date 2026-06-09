import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").max(100),
  workspaceName: z.string().min(1, "Workspace name is required").max(100),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const leadScanSchema = z.object({
  area: z.string().min(1, "Area is required").max(200),
  radius: z.number().min(1).max(50).default(15),
  categories: z.array(z.string()).default([]),
});

export const leadUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "disqualified"]).optional(),
  notes: z.string().max(2000).optional(),
  saved: z.boolean().optional(),
});

export const siteCreateSchema = z.object({
  leadId: z.string().optional(),
  businessName: z.string().min(1).max(200),
  templateId: z.string().min(1),
  tagline: z.string().max(500).optional(),
  phone: z.string().max(30).optional(),
  address: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  hours: z.string().max(500).optional(),
  services: z.string().max(2000).optional(),
  about: z.string().max(5000).optional(),
  primaryColor: z.string().max(20).optional(),
});

export const siteGenerateSchema = z.object({
  templateId: z.string().min(1),
  businessName: z.string().min(1).max(200),
  tagline: z.string().max(500).optional(),
  phone: z.string().max(30).optional(),
  address: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  hours: z.string().max(500).optional(),
  services: z.string().max(2000).optional(),
  about: z.string().max(5000).optional(),
  primaryColor: z.string().max(20).optional(),
});

export const workspaceUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(50).optional(),
});

export const apiKeyCreateSchema = z.object({
  name: z.string().min(1).max(100),
});
