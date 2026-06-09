import { generateMockSite, type GeneratedSite } from "./mockGenerator";
import { buildGenerationPrompt } from "./prompts";

interface GenerateInput {
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
  primaryColor?: string;
}

export async function generateSite(input: GenerateInput): Promise<GeneratedSite> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const prompt = buildGenerationPrompt(input);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);
        return {
          template: input.templateId,
          theme: { primary: input.primaryColor || "#2D5BFF", font: "IBM Plex Sans" },
          sections: content.sections,
        };
      }
    } catch {
      // Fall through to mock
    }
  }

  return generateMockSite(input);
}
