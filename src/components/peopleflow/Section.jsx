"use client";


import { Card, CardBody } from "@nextui-org/card";
import { IoCreate } from "react-icons/io5";
import dynamic from "next/dynamic";

import { MdReportProblem } from "react-icons/md";

import { Button } from "@nextui-org/button";
import {Switch} from "@nextui-org/switch";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { MdNotificationAdd } from "react-icons/md";


import {DatePicker} from "@nextui-org/date-picker";
import {now, parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

import ActivateNotifications from "../ActivateNotifications";


const DynamicApexChart = dynamic(() => import("../ApexChartComponent"), { ssr: false });
const Section = ({
  commerces,
  loading,
  handleCreateEvent,
  handleSubmit,
  dateSpanOptions,
  selectedCommerce,
  setSelectedCommerce,
  handleDatePremade,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  graphData,
  currentLabel,
  setCurrentLabel,
  error,
  isOpen,
  onOpen,
  onOpenChange
}) => {
  return (
    
    <div className='w-full h-full p-8'>
      <div className='w-full flex flex-col'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold mb-4'>People Flow</h1>
          <div className="max-md:flex-col md:flex gap-2 ">
            <div>
              <Button onClick={() => {handleCreateEvent()}}>
                <MdReportProblem />
              </Button>
            </div>
          </div>
        </div>
        
        <form className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Select Establishment</label>
            <select
              value={selectedCommerce}
              onChange={(e) => setSelectedCommerce(e.target.value)}
              className='w-full p-2 border rounded max-w-[500px]'>
              <option value=''>Select an Establishment</option>
              {commerces.map((commerce) => (
                <option key={commerce.id} value={commerce.id}>
                  {commerce.name}
                </option>
              ))}
            </select>
            <div
              id='buttons_premade'
              className='grid p-2 bgrose-300  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-4 max-w-[500px] md:max-w-[700px] max-xl:overflow-y-auto max-h-[100px]'>
              {dateSpanOptions.map((option) => (
                <Button
                  key={option.label}
                  isDisabled={loading}
                  className={`${currentLabel === option.label ? "bg-[--color-background]" : ""}`}
                  onClick={() => {
                    handleDatePremade(option.label);
                    setCurrentLabel(option.label);
                  }}>
                  {option.label}
                </Button>
              ))}
            </div>
            <div className='flex flex-col sm:flex-row bgred-300  gap-4 mt-4 p-2'>
              <DatePicker
                className="w-full max-w-[250px]"
                label='Start Date'
                variant="bordered"
                showMonthAndYearPickers
                hideTimeZone
                granularity='second'
                onChange={(selectedDate) => { setStartDate(selectedDate)}}
              />
              <DatePicker
                className="w-full max-w-[250px]"
                label='End Date'
                variant="bordered"
                showMonthAndYearPickers
                hideTimeZone
                granularity='second'
                onChange={(selectedDate) => { setEndDate(selectedDate)}}
              />
            </div>
            <Button onClick={(e) => {e.preventDefault(); handleSubmit()}} className='mt-4' isDisabled={loading} isLoading={loading}>
              Fetch Reports
            </Button>
            {error && <div className='text-red-500 mt-4'>{error}</div>}
          </form>
        <Card className='mt-8 w-full max-w-[500px] place-self-center'>
          <CardBody>
            <p className='text-4xl font-bold text-center'>
              {currentLabel === "" ? "Select a Date" : currentLabel}
            </p>
            <p className='text-4xl font-bold text-center'>
              Total Entering: {graphData.enterSeries.reduce((a, b) => a + b, 0)}
            </p>
            <p className='text-4xl font-bold text-center'>
              Total Exiting: {graphData.exitSeries.reduce((a, b) => a + b, 0)}
            </p>
          </CardBody>
        </Card>
        {graphData.labels.length > 0 && (
          <DynamicApexChart graphData={graphData} graphType='peopleFlow' />
        )}
      </div>
    </div>
  );
};

export default Section;
