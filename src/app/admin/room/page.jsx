import Link from "next/link";

export default function RoomsPage() {
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
            Room Management
          </p>

          <h1
            className="
            text-4xl
            font-bold
            mt-3
          "
          >
            All Rooms
          </h1>
        </div>

        <Link
          href="/admin/room/add"
          className="
          bg-[var(--primary)]
          text-white
          px-5
          py-3
          text-sm
          font-medium
          hover:opacity-90
          transition-all
        "
        >
          + Add Room
        </Link>
      </div>

      {/* Room List */}

      <div className="space-y-4">
        {[1, 2, 3, 4].map((room) => (
          <div
            key={room}
            className="
            bg-white
            border
            border-black/5
            p-4
            flex
            items-center
            justify-between
            gap-5
          "
          >
            {/* Left */}

            <div className="flex items-center gap-5">
              {/* Image */}

              <div
                className="
                w-[120px]
                h-[90px]
                bg-[#e7dfd2]
                shrink-0
              "
              />

              {/* Info */}

              <div>
                <h2
                  className="
                  text-lg
                  font-semibold
                "
                >
                  Deluxe Mountain Room
                </h2>

                <p
                  className="
                  text-sm
                  text-black/50
                  mt-2
                  max-w-[500px]
                "
                >
                  Cozy heritage room with wooden
                  interiors and beautiful valley
                  views.
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span
                    className="
                    text-xs
                    border
                    border-black/10
                    px-3
                    py-1
                  "
                  >
                    2 Guests
                  </span>

                  <span
                    className="
                    text-xs
                    border
                    border-black/10
                    px-3
                    py-1
                  "
                  >
                    Deluxe
                  </span>

                  <span
                    className="
                    text-xs
                    border
                    border-black/10
                    px-3
                    py-1
                  "
                  >
                    ₹4,500 / night
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="flex items-center gap-3">
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
                Edit
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
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}