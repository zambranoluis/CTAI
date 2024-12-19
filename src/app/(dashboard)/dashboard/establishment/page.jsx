"use client";
import dinamyc from "next/dynamic";

const Establishments = dinamyc(
  () => import("@/components/establishment/Establishments"),
  { ssr: false },
);

function Page() {
  return <Establishments />;
}

export default Page;
