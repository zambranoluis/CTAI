"use client";

import React, { useState, useEffect } from "react";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { Button } from "@nextui-org/button";
import { validateText, validateNumber } from "@/utils/validation";

const Form = ({
  fieldsConfig,
  formData = {},
  handleChange,
  handleSubmit,
  loading,
  buttonText,
  errors,
}) => {
  const [localErrors, setLocalErrors] = useState({});

  // Validar un campo específico en tiempo real
  const validateField = (name, value) => {
    let error = "";

    if (name === "phonesNotify") {
      if (!validateNumber(value)) {
        error = "Phone number must contain only digits.";
      }
    } else if (name === "name") {
      if (!validateText(value)) {
        error = "This field must contain only letters, numbers, and spaces.";
      }
    }

    setLocalErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Manejadores de phonesNotify
  const addPhone = () => {
    const updatedPhones = [...(formData.phonesNotify || []), ""];
    handleChange({ target: { name: "phonesNotify", value: updatedPhones } });
  };

  const updatePhone = (index, value) => {
    const updatedPhones = [...(formData.phonesNotify || [])];
    updatedPhones[index] = value;
    handleChange({ target: { name: "phonesNotify", value: updatedPhones } });
  };

  const removePhone = (index) => {
    const updatedPhones = [...(formData.phonesNotify || [])];
    updatedPhones.splice(index, 1);
    handleChange({ target: { name: "phonesNotify", value: updatedPhones } });
  };

  // Manejar cambios generales en el formulario
  const onInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    handleChange(e);
  };

  return (
    <form id='formEstablishment' onSubmit={(e) => e.preventDefault()}>
      <div className='w-[90%] m-[auto] flex flex-col gap-4'>
        {fieldsConfig.map((field) => (
          <div key={field.id} className='w-full'>
            <label className='block text-sm font-medium mb-2 capitalize'>
              {field.label}
            </label>
            {field.name === "phonesNotify" ? (
              <div className='relative w-full border border-gray-300 rounded p-4 bg-background h-[200px] '>
                <div className='flex flex-col gap-2 max-h-[120px] overflow-y-auto noScrollBar'>
                  {formData.phonesNotify?.map((phone, index) => (
                    <div key={index} className='flex items-center gap-4 mb-2'>
                      <input
                        type='text'
                        value={phone}
                        onChange={(e) => updatePhone(index, e.target.value)}
                        placeholder='Phone Number'
                        className='flex-1 px-2 py-1 border border-gray-300 rounded'
                      />
                      <IoMdRemoveCircle
                        onClick={() => removePhone(index)}
                        className='text-red-500 text-xl cursor-pointer hover:text-red-700'
                      />
                    </div>
                  ))}
                </div>
                <button
                  type='button'
                  onClick={addPhone}
                  className='mt-2 px-4 py-2 bg-[var(--color-background-shade)] text-white rounded hover:bg-[var(--color-primary)]'>
                  Add Phone
                </button>
              </div>
            ) : (
              <input
                className='w-full px-2 py-2 border bg-background border-gray-300 rounded'
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onInputChange}
                placeholder={field.placeholder}
              />
            )}
            {localErrors[field.name] && (
              <div className='text-red-500 text-sm'>{localErrors[field.name]}</div>
            )}
            {errors && errors[field.name] && (
              <div className='text-red-500 text-sm'>{errors[field.name]}</div>
            )}
          </div>
        ))}
      </div>
      <div className='w-full flex justify-end mt-4'>
        <Button
          type='submit'
          onClick={() => handleSubmit(formData)}
          className='bg-[#575a5f] border-[var(--color-text)] text-[--color-background] border-[1px] px-[17px] py-[3px] font-bold rounded hover:bg-[var(--color-primary)] hover:text-[var(--color-text)]'
          auto
          isLoading={loading}
          disabled={loading}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
