"use client";
import { TbHomeEdit } from "react-icons/tb";
import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
const ViewTablet = ({
  establishmentsData,
  handleCopyId,
  handleOpenEditModal,
  handleDelete,
}) => {
  return (
    <Table aria-label='Establishments Table' className='w-full'>
      <TableHeader>
        <TableColumn>Action</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Address</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Date Created</TableColumn>
      </TableHeader>
      <TableBody>
        {establishmentsData?.map((establishment) => (
          <TableRow key={establishment.id}>
            <TableCell className='flex gap-4 items-center w-full xl:max-w-[100px]'>
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
            </TableCell>
            <TableCell>{establishment.name}</TableCell>
            <TableCell>{establishment.address}</TableCell>
            <TableCell>{establishment.phone}</TableCell>
            <TableCell>{new Date(establishment.dateCreated).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ViewTablet;
