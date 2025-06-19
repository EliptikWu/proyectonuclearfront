// components/DatePickerSection.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerSection = ({ t, selectedDate, handleDateChange }) => {
  return (
    <div className="lg:col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-sm sm:text-base">{t('classroomAssignment.selectDate')}</h3>
        <Calendar className="w-5 h-5 text-white" />
      </div>
      <div className="w-full max-w-[280px] mx-auto">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          minDate={new Date()}
          className="w-full"
          calendarClassName="border-black_text bg-principal_purple rounded-lg react-datepicker--static scale-90 origin-top-left"
          dayClassName={() => "text-white_text hover:bg-principal_purple text-sm"}
          monthClassName={() => "text-white_text"}
          weekDayClassName={() => "text-indigo-300"}
        />
      </div>
    </div>
  );
};

export default DatePickerSection;
