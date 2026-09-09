"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Users,
  BedDouble,
} from "lucide-react";

const ROOM_PRICE = 2500; // Price per room per night

export default function BookingForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",

    roomsNeeded: 1,
    guests: 2,

    checkin: "",
    checkout: "",

    specialRequest: "",
  });
  const [availability, setAvailability] = useState({
    checking: false,
    availableRooms: 0,
    isAvailable: true,
  });

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "roomsNeeded" || name === "guests"
          ? Number(value)
          : value,
    }));
  };

  /* ---------------- BOOKING CALCULATION ---------------- */

  const bookingSummary = useMemo(() => {
    if (!formData.checkin || !formData.checkout) {
      return {
        nights: 0,
        totalAmount: 0,
      };
    }

    const checkIn = new Date(formData.checkin);
    const checkOut = new Date(formData.checkout);

    const nights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) {
      return {
        nights: 0,
        totalAmount: 0,
      };
    }

    return {
      nights,
      totalAmount:
        nights *
        ROOM_PRICE *
        Number(formData.roomsNeeded),
    };
  }, [
    formData.checkin,
    formData.checkout,
    formData.roomsNeeded,
  ]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.guestName ||
      !formData.phone ||
      !formData.checkin ||
      !formData.checkout
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (bookingSummary.nights <= 0) {
      alert("Check-out date must be after Check-in.");
      return;
    }
    if (!availability.isAvailable) {
      alert("Sorry! No rooms are available for these dates.");
      return;
    }

    if (formData.roomsNeeded > availability.availableRooms) {
      alert(
        `Only ${availability.availableRooms} rooms are available for selected dates.`
      );
      return;
    }

    try {
      setLoading(true);

      // Save booking in MongoDB
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName: formData.guestName,
          email: formData.email,
          phone: formData.phone,

          roomsNeeded: formData.roomsNeeded,

          checkIn: formData.checkin,
          checkOut: formData.checkout,

          adults: formData.guests,
          children: 0,

          totalAmount: bookingSummary.totalAmount,

          specialRequest:
            formData.specialRequest,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      // WhatsApp Message
      const message = `
🏡 CALMING NOOK BOOKING REQUEST

━━━━━━━━━━━━━━━━━━

👤 Guest Details

Name: ${formData.guestName}
Phone: ${formData.phone}
Email: ${formData.email || "Not Provided"}

━━━━━━━━━━━━━━━━━━

🏠 Booking Details

Rooms Needed: ${formData.roomsNeeded}
Guests: ${formData.guests}

━━━━━━━━━━━━━━━━━━

📅 Stay Details

Check In: ${formData.checkin}
Check Out: ${formData.checkout}
Total Nights: ${bookingSummary.nights}

━━━━━━━━━━━━━━━━━━

💰 Estimated Amount

₹${bookingSummary.totalAmount.toLocaleString(
        "en-IN"
      )}

━━━━━━━━━━━━━━━━━━

📝 Special Request

${formData.specialRequest || "None"}

━━━━━━━━━━━━━━━━━━

Booking submitted from Calming Nook Website.
`;

      const whatsappNumber =
        "919557803336";

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );

      alert(
        "Booking request submitted successfully!"
      );

      // Reset Form
      setFormData({
        guestName: "",
        email: "",
        phone: "",

        roomsNeeded: 1,
        guests: 2,

        checkin: "",
        checkout: "",

        specialRequest: "",
      });
    } catch (error) {
      console.error(error);
      alert("Booking failed.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!formData.checkin || !formData.checkout) return;

    const checkAvailability = async () => {
      try {
        setAvailability((prev) => ({
          ...prev,
          checking: true,
        }));

        const res = await fetch(
          `/api/availability?checkIn=${formData.checkin}&checkOut=${formData.checkout}`
        );

        const data = await res.json();

        if (data.success) {
          setAvailability({
            checking: false,
            availableRooms: data.availableRooms,
            isAvailable: data.isAvailable,
          });
        }
      } catch (error) {
        console.error(error);

        setAvailability((prev) => ({
          ...prev,
          checking: false,
        }));
      }
    };

    checkAvailability();
  }, [formData.checkin, formData.checkout]);

  return (
    <section className="py-16">
      <div className="container-custom">

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 xl:gap-16 items-start">

          {/* LEFT CONTACT CARD */}

          <div className="theme-card p-8 lg:p-10 sticky top-28">

            <p className="text-sm uppercase tracking-[4px] text-[var(--primary)]">
              Reach Us
            </p>

            <h3 className="text-2xl font-semibold mt-2 leading-tight">
              Your peaceful mountain stay awaits.
            </h3>

            <p className="text-muted mt-3 leading-7">
              Questions about rooms, activities, or bookings?
              We'd love to help.
            </p>

            <div className="mt-8 space-y-5">

              <ContactItem
                icon={<Phone size={18} />}
                title="Phone"
                value="+91 95578 03336"
              />

              <ContactItem
                icon={<Mail size={18} />}
                title="Email"
                value="clamingnookstays@gmail.com"
              />

              <ContactItem
                icon={<MapPin size={18} />}
                title="Location"
                value="Kempty Road, Mussoorie, Uttarakhand 248179"
              />

            </div>

          </div>

          {/* BOOKING FORM */}

          <form
            onSubmit={handleSubmit}
            className="theme-card p-6 md:p-8 lg:p-10 space-y-6"
          >

            <div>
              <h3 className="text-3xl font-semibold">
                Booking Request
              </h3>

              <p className="text-muted mt-2">
                Fill out the details below and we'll confirm
                your stay shortly.
              </p>
            </div>

            {/* NAME + PHONE */}

            <div className="grid md:grid-cols-2 gap-4">

              <Field
                label="Full Name"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                required
              />

              <Field
                label="Phone Number"
                type="tel"
                icon={<Phone size={18} />}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <Field
              label="Email Address"
              type="email"
              icon={<Mail size={18} />}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* ROOMS + GUESTS */}

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <label className="text-sm block mb-3 font-medium">
                  Rooms Needed
                </label>

                <div className="relative">

                  <BedDouble
                    size={18}
                    className="absolute left-4 top-5 text-gray-400"
                  />

                  <select
                    name="roomsNeeded"
                    value={formData.roomsNeeded}
                    onChange={handleChange}
                    className="w-full h-14 rounded-xl border border-black/10 bg-white/40 pl-11 pr-4 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
                      <option key={room} value={room}>
                        {room} Room{room > 1 && "s"}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              <Field
                label="Number of Guests"
                type="number"
                icon={<Users size={18} />}
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              />

            </div>

            {/* CHECK-IN / CHECK-OUT */}

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
            <div className="rounded-xl border border-black/10 bg-[#faf7f2] p-5">
              <h4 className="font-semibold mb-4">
                Room Availability
              </h4>

              {availability.checking ? (
                <p className="text-sm text-black/50">
                  Checking availability...
                </p>
              ) : availability.isAvailable ? (
                <div className="space-y-2">
                  <p className="text-green-700 font-medium">
                    ✅ Rooms Available
                  </p>

                  <p className="text-sm text-black/60">
                    {availability.availableRooms} room(s) left for these dates.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-red-600 font-medium">
                    ❌ No Rooms Available
                  </p>

                  <p className="text-sm text-black/60">
                    Please choose different dates.
                  </p>
                </div>
              )}
            </div>

            {/* SPECIAL REQUEST */}

            <div>

              <label className="block mb-3 text-sm font-medium">
                Additional Notes
              </label>

              <textarea
                rows={4}
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                placeholder="Any special requests..."
                className="w-full rounded-xl border border-black/10 bg-white/40 p-4 resize-none outline-none"
              />

            </div>

            {/* BOOKING SUMMARY */}

            <div className="rounded-xl border border-[var(--primary)]/10 bg-[#faf7f2] p-6">

              <div className="flex items-center justify-between mb-4">

                <h4 className="font-semibold text-lg">
                  Booking Summary
                </h4>

                <CalendarDays
                  size={20}
                  className="text-[var(--primary)]"
                />

              </div>

              <div className="space-y-3 text-sm text-black/70">

                <div className="flex justify-between">
                  <span>Rooms</span>
                  <span>{formData.roomsNeeded}</span>
                </div>

                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{formData.guests}</span>
                </div>

                <div className="flex justify-between">
                  <span>Price / Night / Room</span>
                  <span>₹{ROOM_PRICE}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Nights</span>
                  <span>{bookingSummary.nights}</span>
                </div>

                <div className="border-t border-black/10 my-3"></div>

                <div className="flex justify-between items-center">

                  <span className="font-medium text-base">
                    Estimated Total
                  </span>

                  <span className="text-3xl font-bold text-[var(--primary)]">
                    ₹
                    {bookingSummary.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full disabled:opacity-70"
            >
              {loading
                ? "Submitting Booking..."
                : "Send Booking Request"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ContactItem({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex gap-4">

      <div className="w-11 h-11 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
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
          className={`w-full h-14 rounded-xl border border-black/10 bg-white/40 px-5 outline-none ${icon ? "pl-11" : ""
            }`}
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
          className="w-full h-14 rounded-xl border border-black/10 bg-white/40 pl-11 pr-4 outline-none"
        />

      </div>

    </div>
  );
}