"use client";

import { useRef, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

const CashierAlerts = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <section
      id='section_cashierAlerts'
      className='flex gap-4 p-8 w-[95%] h-[95%] rounded-md  bg-[var(--color-background-shade)] flex-col z-50'>
      <div>
        <h1>Cashier Alerts</h1>
      </div>
    </section>
  );
};
export default CashierAlerts;
