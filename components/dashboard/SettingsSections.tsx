"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";

interface SettingsSectionsProps {
  user: { id: string; email: string; name: string | null };
  workspace: { id: string; name: string; slug: string };
  apiKeys: { id: string; name: string; last4: string; createdAt: string }[];
  onGenerateKey?: (name: string) => Promise<string | null>;
  onRevokeKey?: (id: string) => void;
  onUpdateWorkspace?: (data: { name?: string; slug?: string }) => void;
}

export function SettingsSections({ user, workspace, apiKeys, onGenerateKey, onRevokeKey, onUpdateWorkspace }: SettingsSectionsProps) {
  const [workspaceName, setWorkspaceName] = useState(workspace.name);
  const [workspaceSlug, setWorkspaceSlug] = useState(workspace.slug);
  const [keyName, setKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSaveWorkspace = async () => {
    setSaving(true);
    try {
      await onUpdateWorkspace?.({ name: workspaceName, slug: workspaceSlug });
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateKey = async () => {
    if (!keyName.trim()) return;
    const key = await onGenerateKey?.(keyName);
    if (key) {
      setGeneratedKey(key);
      setKeyName("");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Profile */}
      <Card>
        <h3 className="text-16 font-semibold text-text-primary mb-4 font-sans">Profile</h3>
        <div className="space-y-3">
          <Input label="Email" value={user.email} disabled />
          <Input label="Name" value={user.name || ""} disabled />
        </div>
        <p className="text-12 text-text-secondary mt-3">Profile editing coming soon.</p>
      </Card>

      {/* Workspace */}
      <Card>
        <h3 className="text-16 font-semibold text-text-primary mb-4 font-sans">Workspace</h3>
        <div className="space-y-3">
          <Input
            label="Name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <Input
            label="Slug"
            value={workspaceSlug}
            onChange={(e) => setWorkspaceSlug(e.target.value)}
          />
        </div>
        <Button size="sm" className="mt-4" onClick={handleSaveWorkspace} loading={saving}>
          Save Changes
        </Button>
      </Card>

      {/* Billing */}
      <Card>
        <h3 className="text-16 font-semibold text-text-primary mb-4 font-sans">Billing</h3>
        <p className="text-14 text-text-secondary">
          You are on the <strong className="text-text-primary">Pro</strong> plan.
        </p>
        <Button size="sm" variant="outline" className="mt-3">
          Manage Billing
        </Button>
      </Card>

      {/* API Keys */}
      <Card>
        <h3 className="text-16 font-semibold text-text-primary mb-4 font-sans">API Keys</h3>
        <div className="space-y-3 mb-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between py-2 border-b border-navy-border last:border-0">
              <div>
                <span className="text-14 text-text-primary">{key.name}</span>
                <span className="text-13 text-text-secondary font-mono ml-2">••••{key.last4}</span>
                <span className="text-12 text-text-secondary ml-2">
                  {new Date(key.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setRevokeTarget(key.id)}>
                Revoke
              </Button>
            </div>
          ))}
          {apiKeys.length === 0 && (
            <p className="text-14 text-text-secondary">No API keys generated.</p>
          )}
        </div>
        <Button size="sm" variant="outline" onClick={() => setKeyModalOpen(true)}>
          Generate Key
        </Button>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-accent/30">
        <h3 className="text-16 font-semibold text-red-accent mb-4 font-sans">Danger Zone</h3>
        <p className="text-14 text-text-secondary mb-3">
          Delete this workspace and all associated data. This action cannot be undone.
        </p>
        <Button size="sm" variant="danger">Delete Workspace</Button>
      </Card>

      {/* Generate Key Modal */}
      <Modal open={keyModalOpen} onClose={() => { setKeyModalOpen(false); setGeneratedKey(null); }} title="Generate API Key">
        {generatedKey ? (
          <div>
            <p className="text-14 text-text-secondary mb-3">
              Your API key has been generated. Copy it now — you will not be able to see it again.
            </p>
            <div className="bg-navy-base border border-navy-border rounded-8 p-3 font-mono text-13 text-text-primary break-all">
              {generatedKey}
            </div>
            <Button
              size="sm"
              className="mt-3"
              onClick={() => {
                navigator.clipboard.writeText(generatedKey);
              }}
            >
              Copy to Clipboard
            </Button>
          </div>
        ) : (
          <div>
            <Input
              label="Key Name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="e.g. Production API"
            />
            <Button size="sm" className="mt-4" onClick={handleGenerateKey} disabled={!keyName.trim()}>
              Generate
            </Button>
          </div>
        )}
      </Modal>

      {/* Revoke Confirmation */}
      <Modal open={!!revokeTarget} onClose={() => setRevokeTarget(null)} title="Revoke API Key">
        <p className="text-14 text-text-secondary mb-4">
          Are you sure? Any applications using this key will immediately lose access.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setRevokeTarget(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (revokeTarget) {
                onRevokeKey?.(revokeTarget);
                setRevokeTarget(null);
              }
            }}
          >
            Revoke Key
          </Button>
        </div>
      </Modal>
    </div>
  );
}
