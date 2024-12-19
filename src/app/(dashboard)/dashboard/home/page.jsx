"use client";
import dinamyc from "next/dynamic";

const Widget = dinamyc(() => import("../../../../components/home/Widget"), {
  ssr: false,
});

function HomePage() {
  return <Widget />;
}

export default HomePage;
