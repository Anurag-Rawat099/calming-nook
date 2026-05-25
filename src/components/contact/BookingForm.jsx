"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Users,
} from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    checkin: "",
    checkout: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Booking Request Submitted");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        <div
          className="
          grid
          lg:grid-cols-[420px_1fr]
          gap-10
          xl:gap-20
          items-start
        "
        >

          {/* LEFT */}
          <div
            className="
            theme-card
            p-8
            lg:p-10
            sticky
            top-28
          "
          >

            <p
              className="
              text-sm
              uppercase
              tracking-[4px]
              text-[var(--primary)]
            "
            >
              Reach Us
            </p>

            <h3
              className="
              text-3xl
              font-semibold
              mt-4
              leading-tight
            "
            >
              Your peaceful
              mountain stay
              awaits.
            </h3>

            <p
              className="
              text-gray-500
              mt-6
              leading-8
            "
            >
              Questions about rooms,
              activities or bookings?
              We’d love to help.
            </p>

            <div className="mt-12 space-y-8">

              <ContactItem
                icon={<Phone size={18} />}
                title="Phone"
                value="+91 XXXXX XXXXX"
              />

              <ContactItem
                icon={<Mail size={18} />}
                title="Email"
                value="hello@calmingnook.com"
              />

              <ContactItem
                icon={<MapPin size={18} />}
                title="Location"
                value="Uttarakhand, India"
              />

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
            theme-card
            px-8
            sm:px-10
            md:px-14
            lg:px-16
            xl:px-20
            py-10
            lg:py-14
            space-y-10
          "
          >

            <div>

              <h3 className="text-3xl font-semibold">
                Booking Request
              </h3>

              <p className="text-gray-500 mt-3">
                Fill out the details below.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

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

            <Field
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="grid md:grid-cols-3 gap-8">

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

              <Field
                label="Guests"
                icon={<Users size={18} />}
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="block mb-3 text-sm font-medium">
                Additional Notes
              </label>

              <textarea
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Special requests..."
                className="
                w-full
                rounded-2xl
                border
                border-black/10
                bg-white/40
                p-5
                outline-none
                resize-none
              "
              />

            </div>

            <button
              type="submit"
              className="primary-btn w-full py-5"
            >
              Send Booking Request
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex gap-4">

      <div
        className="
        w-11
        h-11
        rounded-full
        bg-[var(--primary)]/10
        text-[var(--primary)]
        flex
        items-center
        justify-center
      "
      >
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h4 className="mt-1 font-medium">
          {value}
        </h4>

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

      <label className="text-sm block mb-3 font-medium">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div
            className="
            absolute
            left-4
            top-5
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
            h-14
            rounded-xl
            border
            border-black/10
            bg-white/40
            px-5
            ${icon ? "pl-11" : ""}
            outline-none
            focus:border-[var(--primary)]
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

      <label className="text-sm block mb-3 font-medium">
        {label}
      </label>

      <div className="relative">

        <CalendarDays
          size={18}
          className="
          absolute
          left-4
          top-5
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
          h-14
          rounded-xl
          border
          border-black/10
          bg-white/40
          pl-11
          pr-4
          outline-none
          focus:border-[var(--primary)]
        "
        />

      </div>

    </div>
  );
}