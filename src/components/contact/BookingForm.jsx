"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Users,
  BedDouble,
} from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    guests: "",
    checkin: "",
    checkout: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.checkin ||
      !formData.checkout
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const message = `
🏡 CALMING NOOK BOOKING REQUEST

━━━━━━━━━━━━━━━

👤 Guest Details

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

━━━━━━━━━━━━━━━

🏠 Room Details

Room Type: ${formData.roomType || "Not Selected"}
Guests: ${formData.guests}

━━━━━━━━━━━━━━━

📅 Stay Details

Check In: ${formData.checkin}
Check Out: ${formData.checkout}

━━━━━━━━━━━━━━━

📝 Special Requests

${formData.message || "None"}

━━━━━━━━━━━━━━━

Sent from Calming Nook Website
`;

    const whatsappNumber = "918171325155";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16">
      <div className="container-custom">

        <div
          className="
          grid
          lg:grid-cols-[380px_1fr]
          gap-8
          xl:gap-16
          items-start
        "
        >

          {/* LEFT INFO */}

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
              text-2xl
              font-semibold
              mt-2
              leading-tight
            "
            >
              Your peaceful mountain stay awaits.
            </h3>

            <p
              className="
              text-muted
              mt-3
              leading-7
            "
            >
              Questions about rooms, activities,
              or bookings? We'd love to help.
            </p>

            <div className="mt-8 space-y-5">

              <ContactItem
                icon={<Phone size={18} />}
                title="Phone"
                value="+91 81713 25155"
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

          {/* BOOKING FORM */}

          <form
            onSubmit={handleSubmit}
            className="
            theme-card
            p-6
            md:p-8
            lg:p-10
            space-y-5
          "
          >

            <div>

              <h3 className="text-3xl font-semibold">
                Booking Request
              </h3>

              <p className="text-muted mt-2">
                Fill out the details below and we'll
                connect with you on WhatsApp.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <Field
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Field
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            <Field
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <label className="text-sm block mb-3 font-medium">
                  Room Type
                </label>

                <div className="relative">

                  <BedDouble
                    size={18}
                    className="absolute left-4 top-5 text-gray-400"
                  />

                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
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
                  "
                  >
                    <option value="">
                      Select Room
                    </option>

                    <option>
                      Deluxe Room
                    </option>

                    <option>
                      Family Suite
                    </option>

                    <option>
                      Mountain View Room
                    </option>

                  </select>

                </div>

              </div>

              <Field
                label="Guests"
                icon={<Users size={18} />}
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              />

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <DateField
                label="Check In"
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
                required
              />

              <DateField
                label="Check Out"
                name="checkout"
                value={formData.checkout}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <label className="block mb-3 text-sm font-medium">
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
                rounded-xl
                border
                border-black/10
                bg-white/40
                p-4
                resize-none
                outline-none
              "
              />

            </div>

            <button
              type="submit"
              className="primary-btn w-full"
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

        <p className="text-sm text-muted">
          {title}
        </p>

        <h4 className="font-medium mt-1">
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
  type = "text",
  required = false,
}) {
  return (
    <div>

      <label className="text-sm block mb-3 font-medium">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-5 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          className={`
            w-full
            h-14
            rounded-xl
            border
            border-black/10
            bg-white/40
            px-5
            outline-none
            ${icon ? "pl-11" : ""}
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
  required = false,
}) {
  return (
    <div>

      <label className="text-sm block mb-3 font-medium">
        {label}
      </label>

      <div className="relative">

        <CalendarDays
          size={18}
          className="absolute left-4 top-5 text-gray-400"
        />

        <input
          type="date"
          name={name}
          value={value}
          required={required}
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
          "
        />

      </div>

    </div>
  );
}