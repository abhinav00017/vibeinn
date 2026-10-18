"use client";

import { useState } from "react";
import type { SizeChart as Chart } from "@/lib/commerce/types";
import { Modal } from "@/components/ui/modal";

export function SizeChart({ chart }: { chart: Chart }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 hover:opacity-60"
      >
        Size chart
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Size chart">
        <div className="p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.12em] text-muted">
                <th className="py-2 pr-4 font-medium">Size</th>
                {chart.columns.map((c) => (
                  <th key={c} className="py-2 pr-4 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((r) => (
                <tr key={r.size} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4 font-medium">{r.size}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className="py-2 pr-4 tabular-nums">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-muted">
            All measurements in {chart.unit}.{chart.note ? ` ${chart.note}` : ""}
          </p>
        </div>
      </Modal>
    </>
  );
}
