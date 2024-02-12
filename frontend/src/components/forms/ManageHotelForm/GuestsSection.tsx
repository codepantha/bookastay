import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-300 p-6">
        <label className="flex flex-col text-sm flex-1 justify-start">
          Adults
          <input
            type="number"
            {...register('adultCount', { required: 'This field is required' })}
            className="py-2 px-3 border rounded"
          />
          {errors.adultCount && (
            <span className="text-red-500 text-xs font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex flex-col text-sm flex-1 justify-start">
          Children
          <input
            type="number"
            {...register('childCount', { required: 'This field is required' })}
            className="py-2 px-3 border rounded"
          />
          {errors.childCount && (
            <span className="text-red-500 text-xs font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
