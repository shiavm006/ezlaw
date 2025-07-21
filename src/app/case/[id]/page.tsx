"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function CaseDetailsPage() {
  const params = useParams();
  const caseId = params?.id || "";

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Case Details</h1>
      <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 480, textAlign: 'center' }}>
        Details for case <strong>{caseId}</strong> will appear here soon.
      </p>
    </div>
  );
}
