import { plumberTemplate } from "./plumber";
import { electricianTemplate } from "./electrician";
import { salonTemplate } from "./salon";
import { restaurantTemplate } from "./restaurant";
import { autoRepairTemplate } from "./autoRepair";

export interface Template {
  id: string;
  name: string;
  sectionOrder: string[];
  theme: { primary: string; font: string };
  copyBank: Record<string, unknown>;
  thumbnail: string;
}

const templates: Template[] = [
  plumberTemplate,
  electricianTemplate,
  salonTemplate,
  restaurantTemplate,
  autoRepairTemplate,
];

export function getTemplates(): Template[] {
  return templates;
}

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
