"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export interface SiteFormData {
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  hours: string;
  services: string;
  about: string;
  primaryColor: string;
}

interface SiteFormProps {
  data: SiteFormData;
  onChange: (data: SiteFormData) => void;
}

export function SiteForm({ data, onChange }: SiteFormProps) {
  const update = (field: keyof SiteFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        label="Business Name"
        value={data.businessName}
        onChange={(e) => update("businessName", e.target.value)}
        placeholder="e.g. TideWell Plumbing"
      />
      <Input
        label="Tagline"
        value={data.tagline}
        onChange={(e) => update("tagline", e.target.value)}
        placeholder="e.g. Professional plumbing services"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Phone"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="(555) 000-0000"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-13 font-medium text-text-secondary">Primary Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => update("primaryColor", e.target.value)}
              className="w-10 h-10 rounded-8 border border-navy-border bg-navy-base cursor-pointer"
            />
            <input
              type="text"
              value={data.primaryColor}
              onChange={(e) => update("primaryColor", e.target.value)}
              className="flex-1 h-10 px-3 rounded-8 border border-navy-border bg-navy-base text-text-primary text-14 font-mono focus:outline-none focus:ring-2 focus:ring-cobalt"
            />
          </div>
        </div>
      </div>
      <Input
        label="Address"
        value={data.address}
        onChange={(e) => update("address", e.target.value)}
        placeholder="123 Main St"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="City"
          value={data.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="Austin"
        />
        <Input
          label="State"
          value={data.state}
          onChange={(e) => update("state", e.target.value)}
          placeholder="TX"
        />
      </div>
      <Textarea
        label="Business Hours"
        value={data.hours}
        onChange={(e) => update("hours", e.target.value)}
        placeholder="Mon-Fri: 8am-6pm, Sat: 9am-2pm"
      />
      <Textarea
        label="Services (one per line)"
        value={data.services}
        onChange={(e) => update("services", e.target.value)}
        placeholder="Emergency repairs&#10;Drain cleaning&#10;Water heater installation"
      />
      <Textarea
        label="About"
        value={data.about}
        onChange={(e) => update("about", e.target.value)}
        placeholder="Tell visitors about your business..."
      />
    </div>
  );
}
