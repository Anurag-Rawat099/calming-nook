"use client";

import { useState } from "react";
import {
  X,
  CalendarDays,
  Users,
  BedDouble,
} from "lucide-react";

export default function BookingModal({
  open,
  onClose,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      roomType: "",
      guests: "",
      children: "",
      checkin: "",
      checkout: "",
      message: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert(
      "Booking Request Submitted"
    );

    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-4
    "
    >
      <div
        className="
        relative
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        bg-white
        p-8
        md:p-12
      "
        style={{
          scrollbarWidth: "none",
        }}
      >
        {/* Hide Scrollbar */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {/* Close */}
        <button
          onClick={onClose}
          className="
          absolute
          right-5
          top-5
          text-gray-500
          hover:text-black
          transition-all
        "
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <div className="mb-10">

          <p
            className="
            uppercase
            tracking-[4px]
            text-xs
            text-[var(--primary)]
          "
          >
            CALMING NOOK
          </p>

          <h2
            className="
            text-3xl
            font-semibold
            mt-4
          "
          >
            Book Your Stay
          </h2>

          <p
            className="
            text-gray-500
            mt-3
            text-sm
          "
          >
            Fill your details below.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name & Phone */}
          <div className="grid md:grid-cols-2 gap-6">

            <Field
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Field
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

          {/* Email */}
          <Field
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Room + Guests */}
          <div className="grid md:grid-cols-3 gap-6">

            <Field
              label="Room Type"
              icon={
                <BedDouble size={16} />
              }
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
            />

            <Field
              label="Total Guests"
              icon={
                <Users size={16} />
              }
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            />

            <Field
              label="Children"
              name="children"
              value={formData.children}
              onChange={handleChange}
            />

          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6">

            <DateField
              label="Check In"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
            />

            <DateField
              label="Check Out"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
            />

          </div>

          {/* Message */}
          <div>

            <label
              className="
              block
              mb-3
              text-sm
              font-medium
            "
            >
              Additional Notes
            </label>

            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Special requests..."
              className="
              w-full
              border
              border-black/10
              bg-white
              p-4
              text-sm
              rounded-none
              outline-none
              resize-none
              focus:border-black
            "
            />

          </div>
          <p
  className="
  text-xs
  leading-6
  text-gray-500
  border-t
  border-black/10
  pt-5
"
>
  Note : Additional experiences and activities
  such as bonfires, guided walks,
  local sightseeing, trekking, café
  setups, and customized arrangements
  can be selected and discussed upon
  check-in during your stay.
</p>

          {/* Button */}
          <button
            type="submit"
            className="
            primary-btn
            w-full
            py-4
          "
          >
            Send Booking Request
          </button>

        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  icon,
  onChange,
}) {
  return (
    <div>

      <label
        className="
        text-sm
        block
        mb-3
        font-medium
      "
      >
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div
            className="
            absolute
            left-2
            top-2
            text-gray-400
          "
          >
            {icon}
          </div>
        )}

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full
            py-1
            border
            border-black/10
            bg-white
            px-4
            text-sm
            rounded-none
            outline-none
            transition-all
            focus:border-black
            ${icon ? "pl-10" : ""}
          `}
        />

      </div>

    </div>
  );
}

function DateField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label
        className="
        text-sm
        block
        mb-3
        font-medium
      "
      >
        {label}
      </label>

      <div className="relative">

        <CalendarDays
          size={16}
          className="
          absolute
          left-4
          top-4
          text-gray-400
        "
        />

        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="
          w-full
          h-12
          border
          border-black/10
          bg-white
          pl-10
          pr-4
          text-sm
          rounded-none
          outline-none
          transition-all
          focus:border-black
        "
        />

      </div>

    </div>
  );
}