"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicChartDonuts = dynamic(() => import("../ChartDonutComponent"), {
  ssr: false,
});

const PeopleFlow = ({ peopleFlowData }) => {
  const router = useRouter();
  return (
    <div className='flex w-full p-4 gap-4'>
      <div className='flex flex-col gap-4 w-full rounded-md mt-8'>
        <h1 className='place-self-start text-3xl mb-4 font-black'>People Flow</h1>
        <div className='flex justify-center mb-4 w-full'>
          <Button
            className='bg-[--color-text-shade] hover:bg-[--color-primary] text-center text-xl font-bold rounded-lg'
            onClick={() => router.push("/dashboard/people-flow")}>
            <h2 className='text-center text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-text-shade)]'>
              View People Flow Details
            </h2>
          </Button>
        </div>
        <div className='flex min-h-[400px] p-4 gap-8 overflow-x-scroll max-w-[300px] min-w-[100%]'>
          {peopleFlowData.length > 0 ? (
            peopleFlowData.map((commerce) => {
              const hasValidData = commerce.enter > 0 || commerce.exit > 0;
              return (
                <div
                  key={`${commerce.commerceId}-${commerce.enter}-${commerce.exit}`}
                  className='text-sm shadow-sm shadow-[--color-text] md:text-lg bgorange-500 lg:text-xl min-w-[300px] border-b p-2 flex flex-col h-full'>
                  <h4 className='font-bold text-2xl'>{commerce.commerceName}</h4>
                  {hasValidData ? (
                    <>
                      <p className='text-md font-bold'>
                        Entering: <span className='text-[#007bff]'>{commerce.enter}</span>
                      </p>
                      <p className='text-md font-bold'>
                        Exiting: <span className=' text-[#ca0000]'>{commerce.exit}</span>
                      </p>
                      <DynamicChartDonuts
                        key={`${commerce.commerceId}-${commerce.enter}-${commerce.exit}`}
                        graphData={{
                          labels: ["Entering", "Exiting"],
                          series: [commerce.enter, commerce.exit],
                        }}
                      />
                    </>
                  ) : (
                    <p className='text-[--color-text]'>
                      No people flow data available for this establishment
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No people flow data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleFlow;
