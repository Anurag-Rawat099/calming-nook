export default function AddRoomPage() {
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
                    Add Room
                </p>

                <h1
                    className="
          text-3xl
          font-bold
          mt-4
        "
                >
                    Create New Room
                </h1>
            </div>

            {/* Form */}

            <div
                className="
        bg-white
        p-8
        border
        border-black/5
      "
            >
                <div
                    className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
        "
                >
                    {/* Room Title */}

                    <div>
                        <label className="font-medium">
                            Room Title
                        </label>

                        <input
                            type="text"
                            placeholder="Deluxe Mountain Room"
                            className="
              w-full
              mt-3
              bg-[#f8f5ef]
              border
              border-black/5
              px-5
              py-2
              outline-none
            "
                        />
                    </div>

                    {/* Price */}

                    <div>
                        <label className="font-medium">
                            Price Per Night
                        </label>

                        <input
                            type="text"
                            placeholder="₹4500"
                            className="
              w-full
              mt-3
              bg-[#f8f5ef]
              border
              border-black/5
              px-5
              py-2
              outline-none
            "
                        />
                    </div>

                    {/* Room Type */}

                    <div>
                        <label className="font-medium">
                            Room Type
                        </label>

                        <select
                            className="
              w-full
              mt-3
              bg-[#f8f5ef]
              border
              border-black/5
              px-5
              py-2
              outline-none
            "
                        >
                            <option>Deluxe</option>
                            <option>Suite</option>
                            <option>Premium</option>
                            <option>Family</option>
                        </select>
                    </div>

                    {/* Capacity */}

                    <div>
                        <label className="font-medium">
                            Capacity
                        </label>

                        <input
                            type="number"
                            placeholder="2 Guests"
                            className="
              w-full
              mt-3
              bg-[#f8f5ef]
              border
              border-black/5
              px-5
              py-2
              outline-none
            "
                        />
                    </div>
                </div>

                {/* Description */}

                <div className="mt-6">
                    <label className="font-medium">
                        Room Description
                    </label>

                    <textarea
                        rows={6}
                        placeholder="Write about the room..."
                        className="
            w-full
            h-30
            mt-3
            bg-[#f8f5ef]
            border
            border-black/5
            px-5
            py-2
            outline-none
            resize-none
          "
                    />
                </div>

                {/* Amenities */}

                <div className="mt-6">
                    <label className="font-medium">
                        Amenities
                    </label>

                    <input
                        type="text"
                        placeholder="Wifi, Heater, Balcony..."
                        className="
            w-full
            mt-3
            bg-[#f8f5ef]
            border
            border-black/5
            px-5
            py-2
            outline-none
          "
                    />
                </div>

                {/* Upload */}

                <div className="mt-6">
                    <label className="font-medium">
                        Upload Images
                    </label>

                    <div
                        className="
            mt-3
            border-2
            border-dashed
            border-black/10
            p-10
            text-center
            bg-[#faf7f2]
          "
                    >
                        <p className="text-black/50">
                            Upload room images here
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-end w-full">
                    <button
                        className="
          mt-8
          bg-[var(--primary)]
          text-white
          px-8
          py-2
          font-medium
          hover:opacity-90
          transition-all
        "
                    >
                        Save Room
                    </button>
                </div>
            </div>
        </div>
    );
}