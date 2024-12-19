"use client";
import dinamyc from "next/dynamic";

const Profile = dinamyc(() => import("@/components/profile/Profile"), { ssr: false });

function Page() {
  return <Profile />;
}

export default Page;
