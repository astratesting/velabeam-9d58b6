"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { SettingsSections } from "@/components/dashboard/SettingsSections";
import { Toast } from "@/components/ui/Toast";

interface ApiKey {
  id: string;
  name: string;
  last4: string;
  createdAt: string;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [workspace, setWorkspace] = useState<{ id: string; name: string; slug: string } | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [wsRes, keysRes] = await Promise.all([
        fetch("/api/workspace"),
        fetch("/api/keys"),
      ]);
      if (wsRes.ok) {
        const wsData = await wsRes.json();
        setWorkspace(wsData.workspace);
      }
      if (keysRes.ok) {
        const keysData = await keysRes.json();
        setApiKeys(keysData.keys);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleGenerateKey = async (name: string): Promise<string | null> => {
    const res = await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const data = await res.json();
      loadData();
      return data.token;
    }
    return null;
  };

  const handleRevokeKey = async (id: string) => {
    await fetch(`/api/keys/${id}`, { method: "DELETE" });
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
    setToast("API key revoked");
  };

  const handleUpdateWorkspace = async (data: { name?: string; slug?: string }) => {
    const res = await fetch("/api/workspace", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      setWorkspace(result.workspace);
      setToast("Workspace updated");
    }
  };

  if (!session?.user || !workspace) {
    return <div className="space-y-4"><div className="h-96 bg-navy-surface2 rounded animate-pulse" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-24 font-semibold text-text-primary font-sans">Settings</h1>
      <SettingsSections
        user={{
          id: session.user.id || "",
          email: session.user.email || "",
          name: session.user.name || null,
        }}
        workspace={workspace}
        apiKeys={apiKeys}
        onGenerateKey={handleGenerateKey}
        onRevokeKey={handleRevokeKey}
        onUpdateWorkspace={handleUpdateWorkspace}
      />
      {toast && <Toast message={toast} variant="success" onClose={() => setToast(null)} />}
    </div>
  );
}
