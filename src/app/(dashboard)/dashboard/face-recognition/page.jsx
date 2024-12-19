"use client";
import dinamyc from "next/dynamic";

const Reports = dinamyc(() => import("@/components/reports/Reports"), { ssr: false });

function FaceRecognitionPage() {
  return <Reports />;
}

export default FaceRecognitionPage;
