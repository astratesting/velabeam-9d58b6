"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

interface LeadScanFormProps {
  onScan: (data: { area: string; radius: number; categories: string[] }) => void;
  loading?: boolean;
}

const CATEGORIES = ["Plumber", "Electrician", "Salon", "Restaurant", "Auto Repair", "Dentist", "Landscaper", "Other"];

export function LeadScanForm({ onScan, loading }: LeadScanFormProps) {
  const [area, setArea] = useState("");
  const [radius, setRadius] = useState(15);
  const [categories, setCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!area.trim()) return;
    onScan({ area, radius, categories });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-navy-surface1 border border-navy-border rounded-8 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="Target area"
            placeholder="e.g. Austin, TX"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <div className="w-40">
          <label className="text-13 font-medium text-text-secondary block mb-1.5">
            Radius: {radius}mi
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-navy-border rounded appearance-none cursor-pointer accent-cobalt"
          />
        </div>
        <div className="flex items-end">
          <Button type="submit" loading={loading} disabled={!area.trim()}>
            <Search size={16} strokeWidth={1.5} />
            Scan
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => toggleCategory(cat)}
            className={`px-3 py-1 rounded-full text-12 border transition-colors ${
              categories.includes(cat)
                ? "bg-cobalt/20 border-cobalt/40 text-cobalt"
                : "bg-navy-base border-navy-border text-text-secondary hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </form>
  );
}
