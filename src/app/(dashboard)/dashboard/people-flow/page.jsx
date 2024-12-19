"use client";
import dinamyc from "next/dynamic";

const PeopleFlow = dinamyc(() => import("@/components/peopleflow/PeopleFlow"), {
  ssr: false,
});

function PeopleFlowPage() {
  return <PeopleFlow />;
}

export default PeopleFlowPage;
