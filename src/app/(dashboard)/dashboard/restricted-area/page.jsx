"use client";
import dinamyc from "next/dynamic";

const Reports = dinamyc(() => import("@/components/reports/Reports"), { ssr: false });

function RestrictedAreaPage() {
  return <Reports />;
}

export default RestrictedAreaPage;
