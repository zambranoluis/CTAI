"use client";

const Modal = ({ children, onClose, title }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 transition-all duration-300  text-[var(--color-text)] flex items-center justify-center z-[99]'>
      <div
        id='modal'
        className='bg-[--color-background-shade] bg-opacity-100 p-6   rounded-lg shadow-lg w-full max-w-lg'>
        <div className='flex justify-between mb-4'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-[--color-text] hover:text-[--color-primary] text-xl'>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
