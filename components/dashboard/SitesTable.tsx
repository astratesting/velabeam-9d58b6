"use client";

import { useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SkeletonTable } from "@/components/ui/Skeleton";

interface Site {
  id: string;
  businessName: string;
  templateId: string;
  subdomain: string;
  status: string;
  publishedAt: string | null;
  deployCount: number;
  updatedAt: string;
}

interface SitesTableProps {
  sites: Site[];
  loading?: boolean;
  onUnpublish?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusVariant = (s: string) => {
  if (s === "live") return "live" as const;
  if (s === "building") return "building" as const;
  if (s === "draft") return "draft" as const;
  if (s === "error") return "error" as const;
  return "draft" as const;
};

export function SitesTable({ sites, loading, onUnpublish, onDelete }: SitesTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Site | null>(null);

  if (loading) return <SkeletonTable rows={8} />;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-14">
          <thead className="text-12 text-text-secondary uppercase tracking-wider border-b border-navy-border">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Site</th>
              <th className="px-4 py-3 text-left font-medium">Business</th>
              <th className="px-4 py-3 text-left font-medium">Domain</th>
              <th className="px-4 py-3 text-left font-medium">Template</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Last Deployed</th>
              <th className="px-4 py-3 text-left font-medium">Deploys</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-border">
            {sites.map((site) => (
              <tr key={site.id} className="hover:bg-navy-surface2 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/sites/${site.id}`} className="text-cobalt hover:underline font-medium">
                    {site.businessName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-secondary">{site.businessName}</td>
                <td className="px-4 py-3 font-mono text-text-secondary">{site.subdomain}.velabeam.app</td>
                <td className="px-4 py-3 text-text-secondary">{site.templateId}</td>
                <td className="px-4 py-3">
                  <Pill variant={statusVariant(site.status)}>{site.status}</Pill>
                </td>
                <td className="px-4 py-3 text-text-secondary font-mono text-13">
                  {site.publishedAt
                    ? new Date(site.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "—"}
                </td>
                <td className="px-4 py-3 font-mono text-text-secondary">{site.deployCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/sites/${site.id}`}>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </Link>
                    {site.status === "live" && onUnpublish && (
                      <Button size="sm" variant="ghost" onClick={() => onUnpublish(site.id)}>
                        Unpublish
                      </Button>
                    )}
                    {onDelete && (
                      <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(site)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sites.length === 0 && (
          <div className="text-center py-12 text-text-secondary text-14">
            No sites yet. Build your first site from the Leads page.
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete site"
      >
        <p className="text-14 text-text-secondary mb-4">
          Are you sure you want to delete <strong className="text-text-primary">{deleteTarget?.businessName}</strong>?
          This will soft-delete the site and it will be hidden from the list.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (deleteTarget) {
                onDelete?.(deleteTarget.id);
                setDeleteTarget(null);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
