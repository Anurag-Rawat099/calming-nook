export default function AdminDashboard() {
  return (
    <div>
      {/* Heading */}

      <div className="mb-10">
        <p
          className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          text-sm
        "
        >
          Dashboard Overview
        </p>

        <h1
          className="
          text-5xl
          font-bold
          mt-4
        "
        >
          Welcome Back 👋
        </h1>

        <p className="text-black/50 mt-4">
          Here’s what’s happening at Calming Nook today.
        </p>
      </div>

      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
        {[
          {
            title: "Total Bookings",
            value: "128",
          },
          {
            title: "Revenue",
            value: "₹2.4L",
          },
          {
            title: "Room Occupancy",
            value: "82%",
          },
          {
            title: "Website Visits",
            value: "12.5K",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="
            bg-white
            p-7
            rounded-xl
            border
            border-black/5
            shadow-sm
          "
          >
            <p className="text-black/50">
              {item.title}
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-4
              text-[var(--primary)]
            "
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Main Grid */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mt-8
      "
      >
        {/* Recent Bookings */}

        <div
          className="
          xl:col-span-2
          bg-white
          p-7
          border
          border-black/5
        "
        >
          <div className="flex items-center justify-between">
            <h3
              className="
              text-2xl
              font-bold
            "
            >
              Recent Bookings
            </h3>

            <button
              className="
              text-[var(--primary)]
              font-medium
            "
            >
              View All
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {[
              {
                guest: "Rahul Sharma",
                room: "Deluxe Mountain Room",
                status: "Confirmed",
              },
              {
                guest: "Priya Verma",
                room: "Wooden Suite",
                status: "Pending",
              },
              {
                guest: "Aman Gupta",
                room: "Valley View Room",
                status: "Checked In",
              },
            ].map((booking, index) => (
              <div
                key={index}
                className="
                flex
                items-center
                justify-between
                bg-[#faf7f2]
                p-5
              "
              >
                <div>
                  <h4 className="font-semibold">
                    {booking.room}
                  </h4>

                  <p className="text-sm text-black/50 mt-1">
                    Guest: {booking.guest}
                  </p>
                </div>

                <div
                  className="
                  px-4
                  py-2
                  bg-green-100
                  text-green-700
                  text-sm
                  font-medium
                "
                >
                  {booking.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}

        <div
          className="
          bg-white
          p-7
          border
          border-black/5
        "
        >
          <h3
            className="
            text-2xl
            font-bold
          "
          >
            Quick Actions
          </h3>

          <div className="mt-6 space-y-4">
            {[
              "Add New Room",
              "Create Booking",
              "Upload Images",
              "Manage Reviews",
              "Website Settings",
            ].map((item, index) => (
              <button
                key={index}
                className="
                w-full
                bg-[var(--primary)]
                text-white
                py-4
                font-medium
                hover:opacity-90
                transition-all
              "
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-8
      "
      >
        {/* Latest Reviews */}

        <div
          className="
          bg-white
          p-7
          border
          border-black/5
        "
        >
          <div className="flex items-center justify-between">
            <h3
              className="
              text-2xl
              font-bold
            "
            >
              Latest Reviews
            </h3>

            <button
              className="
              text-[var(--primary)]
              font-medium
            "
            >
              View All
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {[
              {
                name: "Sneha Kapoor",
                review:
                  "Beautiful peaceful stay with amazing mountain views.",
              },
              {
                name: "Rohit Mehta",
                review:
                  "Loved the interiors and cozy ambience.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="
                bg-[#faf7f2]
                p-5
              "
              >
                <h4 className="font-semibold">
                  {review.name}
                </h4>

                <p className="text-black/60 mt-3 leading-relaxed">
                  {review.review}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}

        <div
          className="
          bg-white
          p-7
          border
          border-black/5
        "
        >
          <div className="flex items-center justify-between">
            <h3
              className="
              text-2xl
              font-bold
            "
            >
              Recent Activity
            </h3>

            <button
              className="
              text-[var(--primary)]
              font-medium
            "
            >
              Refresh
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {[
              "New booking received from Rahul Sharma.",
              "2 new room images uploaded.",
              "Payment received for Wooden Suite.",
              "Guest checked into Valley View Room.",
              "Website homepage banner updated.",
            ].map((activity, index) => (
              <div
                key={index}
                className="
                flex
                items-start
                gap-4
              "
              >
                <div
                  className="
                  w-3
                  h-3
                  bg-[var(--primary)]
                  mt-2
                "
                />

                <p className="text-black/70">
                  {activity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}