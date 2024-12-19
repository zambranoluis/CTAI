"use client";

import ReportTypeView from "../ReportTypeView";

const Reports = ({ reportsData, currentReportType, setCurrentReportType }) => {
  return (
    <div className='flex flex-col w-full mdw-[95%] py-4 mt-12 max-md:mt32'>
      <div className='flex flex-col rounded-md max-w-full'>
        <h1 className='place-self-start text-3xl mb-4 font-black'>Reports</h1>
        <div className={`relative flex items-start justify-center w-full ${reportsData.length > 0 ? "h-[500px]" : "h-[500px] noScrollBar"} bgred-400 overflow-hidden   z-60`}>
          <ReportTypeView
            reportsData={reportsData}
            currentReportType={currentReportType}
            onReportTypeChange={(newType) => setCurrentReportType(newType)}
            
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
