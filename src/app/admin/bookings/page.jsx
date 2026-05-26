export default function BookingsPage() {
  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-10">
        <div>
          <p
            className="
            uppercase
            tracking-[6px]
            text-[var(--primary)]
            text-xs
          "
          >
            Booking Management
          </p>

          <h1
            className="
            text-4xl
            font-bold
            mt-3
          "
          >
            All Bookings
          </h1>
        </div>

        <button
          className="
          bg-[var(--primary)]
          text-white
          px-5
          py-3
          text-sm
          font-medium
        "
        >
          Export Bookings
        </button>
      </div>

      {/* Top Stats */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        mb-8
      "
      >
        {[
          {
            title: "Today's Check-ins",
            value: "08",
          },
          {
            title: "Today's Check-outs",
            value: "05",
          },
          {
            title: "Pending Bookings",
            value: "12",
          },
          {
            title: "Monthly Revenue",
            value: "₹2.4L",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="
            bg-white
            border
            border-black/5
            p-5
          "
          >
            <p className="text-sm text-black/50">
              {item.title}
            </p>

            <h2
              className="
              text-3xl
              font-bold
              mt-3
              text-[var(--primary)]
            "
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Calendar + Booking List */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-[350px_1fr]
        gap-6
      "
      >
        {/* Calendar */}

        <div
          className="
          bg-white
          border
          border-black/5
          p-5
          h-fit
        "
        >
          <div className="flex items-center justify-between">
            <h3
              className="
              text-xl
              font-semibold
            "
            >
              June 2026
            </h3>

            <button className="text-sm text-black/50">
              Today
            </button>
          </div>

          {/* Calendar Grid */}

          <div
            className="
            grid
            grid-cols-7
            gap-2
            mt-6
            text-center
          "
          >
            {[
              "S",
              "M",
              "T",
              "W",
              "T",
              "F",
              "S",
            ].map((day, index) => (
              <div
                key={index}
                className="
                text-xs
                font-medium
                text-black/40
              "
              >
                {day}
              </div>
            ))}

            {Array.from({ length: 30 }).map((_, index) => (
              <button
                key={index}
                className={`
                  h-10
                  text-sm
                  border
                  border-black/5
                  hover:bg-[var(--primary)]
                  hover:text-white
                  transition-all

                  ${
                    index === 14
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[#faf7f2]"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Calendar Info */}

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="
                w-3
                h-3
                bg-[var(--primary)]
              "
              />

              <p className="text-sm text-black/60">
                Fully Booked
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                w-3
                h-3
                bg-[#e7dfd2]
              "
              />

              <p className="text-sm text-black/60">
                Available
              </p>
            </div>
          </div>
        </div>

        {/* Booking List */}

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((booking) => (
            <div
              key={booking}
              className="
              bg-white
              border
              border-black/5
              p-5
              flex
              items-center
              justify-between
              gap-5
            "
            >
              {/* Left */}

              <div>
                <div className="flex items-center gap-3">
                  <h2
                    className="
                    text-lg
                    font-semibold
                  "
                  >
                    Rahul Sharma
                  </h2>

                  <span
                    className="
                    text-xs
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                  "
                  >
                    Confirmed
                  </span>
                </div>

                <p className="text-sm text-black/50 mt-2">
                  Deluxe Mountain Room
                </p>

                <div className="flex items-center gap-5 mt-4">
                  <div>
                    <p className="text-xs text-black/40">
                      Check In
                    </p>

                    <p className="text-sm font-medium mt-1">
                      14 June 2026
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-black/40">
                      Check Out
                    </p>

                    <p className="text-sm font-medium mt-1">
                      16 June 2026
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-black/40">
                      Guests
                    </p>

                    <p className="text-sm font-medium mt-1">
                      2 Adults
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="text-right">
                <h3
                  className="
                  text-2xl
                  font-bold
                  text-[var(--primary)]
                "
                >
                  ₹9,000
                </h3>

                <p className="text-sm text-black/40 mt-1">
                  Total Amount
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    className="
                    border
                    border-black/10
                    px-5
                    py-2
                    text-sm
                    hover:bg-black
                    hover:text-white
                    transition-all
                  "
                  >
                    View
                  </button>

                  <button
                    className="
                    border
                    border-red-200
                    text-red-500
                    px-5
                    py-2
                    text-sm
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                  "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}