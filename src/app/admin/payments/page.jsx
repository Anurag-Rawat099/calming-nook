export default function PaymentsPage() {
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
            Payment Management
          </p>

          <h1
            className="
            text-4xl
            font-bold
            mt-3
          "
          >
            Payments
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
          Download Report
        </button>
      </div>

      {/* Stats */}

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
            title: "Total Revenue",
            value: "₹2.4L",
          },
          {
            title: "Pending Payments",
            value: "₹18K",
          },
          {
            title: "Completed",
            value: "128",
          },
          {
            title: "Refunds",
            value: "₹5K",
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

      {/* Payment List */}

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((payment) => (
          <div
            key={payment}
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
                  Paid
                </span>
              </div>

              <p className="text-sm text-black/50 mt-2">
                Deluxe Mountain Room
              </p>

              <div className="flex items-center gap-5 mt-4 flex-wrap">
                <div>
                  <p className="text-xs text-black/40">
                    Transaction ID
                  </p>

                  <p className="text-sm font-medium mt-1">
                    TXN874839
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black/40">
                    Payment Method
                  </p>

                  <p className="text-sm font-medium mt-1">
                    UPI
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black/40">
                    Date
                  </p>

                  <p className="text-sm font-medium mt-1">
                    14 June 2026
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
                Total Paid
              </p>

              <div className="flex gap-3 mt-5 justify-end">
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
                  Invoice
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
                  Refund
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}