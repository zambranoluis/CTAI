"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { TbHomeEdit } from "react-icons/tb";
import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

const ViewGallery = ({
  establishmentsData,
  handleCopyId,
  handleOpenEditModal,
  handleDelete,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {establishmentsData?.map((establishment) => (
        <Card
          key={establishment.id}
          className='bg-[var(--background-color)] max-md:w-full sm:w-[250px]'>
          <CardHeader className='p-2 flex items-center justify-center bg-[var(--color-text-shade)]'>
            <div className='flex w-full justify-center items-center gap-4'>
              <button
                size='sm'
                onClick={() => handleCopyId(establishment.id)}
                className='bg-green-500 rounded-medium px-3 py-2'>
                <FaRegCopy size={16} />
              </button>
              <button
                size='sm'
                onClick={() => handleOpenEditModal(establishment)}
                className='bg-yellow-500 rounded-medium px-3 py-2'>
                <TbHomeEdit size={16} />
              </button>
              <button
                size='sm'
                onClick={() => handleDelete(establishment.id)}
                className='bg-red-500 rounded-medium px-3 py-2'>
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </CardHeader>
          <CardBody className='p-6'>
            <p className='font-bold text-lg'>{establishment.name}</p>
            <small className='text-sm'>{establishment.address}</small>
            <h4 className='font-bold'>{establishment.phone}</h4>
            <p>{new Date(establishment.dateCreated).toLocaleString()}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ViewGallery;
