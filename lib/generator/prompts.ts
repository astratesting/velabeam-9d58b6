// LLM prompt scaffolds for real OpenAI integration.
// These are used when OPENAI_API_KEY is set in the environment.

export function buildGenerationPrompt(input: {
  templateId: string;
  businessName: string;
  tagline?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  hours?: string;
  services?: string;
  about?: string;
}): string {
  return `You are a website copywriter for local businesses. Generate a professional website for this business.

Business: ${input.businessName}
Industry: ${input.templateId}
${input.tagline ? `Tagline: ${input.tagline}` : ""}
${input.phone ? `Phone: ${input.phone}` : ""}
${input.address ? `Address: ${input.address}` : ""}
${input.city ? `City: ${input.city}` : ""}
${input.state ? `State: ${input.state}` : ""}
${input.hours ? `Hours: ${input.hours}` : ""}
${input.services ? `Services: ${input.services}` : ""}
${input.about ? `About: ${input.about}` : ""}

Generate the following JSON structure:
{
  "sections": [
    { "type": "hero", "props": { "headline": "", "sub": "", "cta": "", "phone": "" } },
    { "type": "services", "props": { "items": [{ "title": "", "desc": "", "icon": "" }] } },
    { "type": "about", "props": { "title": "", "body": "", "imageAlt": "" } },
    { "type": "testimonials", "props": { "items": [{ "quote": "", "author": "" }] } },
    { "type": "contact", "props": { "address": "", "phone": "", "hours": "", "mapEmbedUrl": "" } },
    { "type": "footer", "props": { "copyright": "" } }
  ]
}

Rules:
- Professional, concise copy. No fluff.
- Use the actual business details provided.
- For testimonials, generate realistic-sounding quotes but do NOT invent real names.
- Return ONLY valid JSON.`;
}
