export default function SettingsPage() {
  return (
    <div>
      {/* Header */}

      <div className="mb-10">
        <p
          className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          text-xs
        "
        >
          Website Settings
        </p>

        <h1
          className="
          text-4xl
          font-bold
          mt-3
        "
        >
          Stay Information
        </h1>

        <p className="text-black/50 mt-3">
          Update your stay details and business
          information.
        </p>
      </div>

      {/* Form */}

      <div
        className="
        bg-white
        border
        border-black/5
        p-8
      "
      >
        {/* Grid */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
        >
          {/* Stay Name */}

          <div>
            <label className="text-sm font-medium">
              Stay Name
            </label>

            <input
              type="text"
              placeholder="Calming Nook"
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-2
              outline-none
            "
            />
          </div>

          {/* Email */}

          <div>
            <label className="text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="hello@calmingnook.com"
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-2
              outline-none
            "
            />
          </div>

          {/* Phone */}

          <div>
            <label className="text-sm font-medium">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="+91 9876543210"
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-2
              outline-none
            "
            />
          </div>

          {/* Location */}

          <div>
            <label className="text-sm font-medium">
              Location
            </label>

            <input
              type="text"
              placeholder="Kalpa, Himachal Pradesh"
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-2
              outline-none
            "
            />
          </div>
        </div>

        {/* About */}

        <div className="mt-6">
          <label className="text-sm font-medium">
            About Stay
          </label>

          <textarea
            rows={5}
            placeholder="Write about your stay..."
            className="
            w-full
            mt-3
            border
            border-black/10
            bg-[#faf7f2]
            px-5
            py-2
            outline-none
            resize-none
          "
          />
        </div>

        {/* Address */}

        <div className="mt-6">
          <label className="text-sm font-medium">
            Full Address
          </label>

          <textarea
            rows={3}
            placeholder="Enter complete address..."
            className="
            w-full
            mt-3
            border
            border-black/10
            bg-[#faf7f2]
            px-5
            py-2
            outline-none
            resize-none
          "
          />
        </div>

        {/* Social Links */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          mt-6
        "
        >
          <div>
            <label className="text-sm font-medium">
              Instagram Link
            </label>

            <input
              type="text"
              placeholder="https://instagram.com/..."
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-2
              outline-none
            "
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Google Maps Link
            </label>

            <input
              type="text"
              placeholder="https://maps.google.com/..."
              className="
              w-full
              mt-3
              border
              border-black/10
              bg-[#faf7f2]
              px-5
              py-2
              outline-none
            "
            />
          </div>
        </div>

        {/* Policies */}

        <div className="mt-6">
          <label className="text-sm font-medium">
            Stay Policies
          </label>

          <textarea
            rows={5}
            placeholder="Check-in time, cancellation policy, etc."
            className="
            w-full
            mt-3
            border
            border-black/10
            bg-[#faf7f2]
            px-5
            py-2
            outline-none
            resize-none
          "
          />
        </div>

        {/* Save Button */}

        <button
          className="
          mt-8
          bg-[var(--primary)]
          text-white
          px-8
          py-2
          text-sm
          font-medium
          hover:opacity-90
          transition-all
        "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}