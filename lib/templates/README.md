# Templates

Each template is a TypeScript module in `lib/templates/` that exports an object with:

```ts
{
  id: string;           // kebab-case identifier
  name: string;         // display name
  sectionOrder: string[]; // order of site sections
  theme: { primary: string; font: string };
  copyBank: Record<string, unknown>; // default copy for each section
  thumbnail: string;    // SVG markup for preview
}
```

## Adding a new template

1. Create `lib/templates/yourIndustry.ts` following the existing pattern
2. Export the template object
3. Register it in `lib/templates/registry.ts`
4. That's it — the builder, generator, and API will pick it up automatically
