"use client";

import { useState } from "react";
import {
  CalendarDays,
  Users,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function BookingPage() {
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

    alert("Booking request submitted!");
  };

  return (
    <main>

      {/* Hero */}

      <section className="pt-10 pb-20">

        <div className="container-custom text-center">

          <p
            className="
            uppercase
            tracking-[6px]
            text-[var(--primary)]
            "
          >
            Booking
          </p>

          <h1
            className="
            heading-lg
            mt-5
            "
          >
            Reserve Your Peaceful Escape
          </h1>

          <p
            className="
            text-muted
            mt-6
            max-w-2xl
            mx-auto
            leading-8
            "
          >
            Share your travel plans and let us create
            a calm and memorable stay experience at
            Calming Nook.
          </p>

        </div>

      </section>



      {/* Booking Layout */}

      <section className="pb-24">

        <div
          className="
          container-custom
          grid
          xl:grid-cols-[1fr_420px]
          gap-10
          items-start
          "
        >

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
            theme-card
            p-6
            sm:p-8
            lg:p-10
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              mb-8
              "
            >
              Booking Request
            </h2>


            <div
              className="
              grid
              md:grid-cols-2
              gap-6
              "
            >

              <Input
                label="Full Name"
                name="name"
                onChange={handleChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                onChange={handleChange}
              />

            </div>


            <div className="mt-6">

              <Input
                label="Email Address"
                name="email"
                onChange={handleChange}
              />

            </div>


            <div
              className="
              grid
              md:grid-cols-3
              gap-6
              mt-6
              "
            >

              <DateField
                label="Check In"
                name="checkin"
                onChange={handleChange}
              />

              <DateField
                label="Check Out"
                name="checkout"
                onChange={handleChange}
              />

              <Input
                label="Guests"
                name="guests"
                icon={<Users size={18} />}
                onChange={handleChange}
              />

            </div>


            <div className="mt-6">

              <label
                className="
                block
                mb-3
                text-sm
                font-medium
                "
              >
                Notes
              </label>

              <textarea
                rows="5"
                name="message"
                onChange={handleChange}
                placeholder="Special requests..."
                className="
                w-full
                rounded-3xl
                border
                border-black/10
                bg-white/40
                p-5
                resize-none
                outline-none
                focus:border-[var(--primary)]
                "
              />

            </div>


            <button
              className="
              primary-btn
              mt-8
              px-8
              py-4
              flex
              items-center
              gap-3
              "
            >
              Send Request

              <ArrowRight size={18} />

            </button>

          </form>


          {/* CONTACT SIDE */}

          <div className="space-y-5">

            <ContactCard
              icon={<Phone size={18} />}
              title="Phone"
              value="+91 XXXXX XXXXX"
            />

            <ContactCard
              icon={<Mail size={18} />}
              title="Email"
              value="hello@calmingnook.com"
            />

            <ContactCard
              icon={<MapPin size={18} />}
              title="Location"
              value="Uttarakhand, India"
            />

          </div>

        </div>

      </section>

    </main>
  );
}


function ContactCard({
  icon,
  title,
  value,
}) {
  return (

    <div
      className="
      theme-card
      p-6
      flex
      gap-4
      items-center
      "
    >

      <div
        className="
        w-12
        h-12
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

        <h3 className="font-semibold">
          {value}
        </h3>

      </div>

    </div>

  );
}


function Input({
  label,
  name,
  onChange,
  icon,
}) {
  return (

    <div>

      <label
        className="
        block
        mb-3
        text-sm
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
            left-4
            top-5
            text-gray-400
            "
          >
            {icon}
          </div>
        )}

        <input
          name={name}
          onChange={onChange}
          className={`
          w-full
          h-14
          rounded-2xl
          border
          border-black/10
          bg-white/40
          outline-none
          focus:border-[var(--primary)]
          ${icon ? "pl-12" : "px-5"}
          `}
        />

      </div>

    </div>

  );
}



function DateField({
  label,
  name,
  onChange,
}) {
  return (

    <div>

      <label
        className="
        block
        mb-3
        text-sm
        font-medium
        "
      >
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
          onChange={onChange}
          className="
          w-full
          h-14
          rounded-2xl
          border
          border-black/10
          bg-white/40
          pl-12
          outline-none
          focus:border-[var(--primary)]
          "
        />

      </div>

    </div>

  );
}