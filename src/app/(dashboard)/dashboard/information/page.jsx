"use client";
import dinamyc from "next/dynamic";

const Information = dinamyc(() => import("@/components/Information"), {
  ssr: false,
});

function InformationPage() {
  return <Information />;
}

export default InformationPage;
