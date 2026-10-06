"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ImagePlus,
  X,
  Loader2,
  BedDouble,
  Users,
  IndianRupee,
} from "lucide-react";

const amenitiesList = [
  "Free WiFi",
  "Mountain View",
  "Balcony",
  "Breakfast Included",
  "Parking",
  "TV",
  "Room Heater",
  "Hot Water",
  "Air Conditioner",
  "Attached Bathroom",
  "Tea / Coffee Maker",
  "Work Desk",
  "Wardrobe",
  "Power Backup",
  "Bonfire Access",
];

export default function AddRoomPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 3500,
    maxGuests: 2,
    totalRooms: 8,
    featured: false,
    available: true,
    amenities: [],
    images: [],
  });

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImages = async (files) => {
    try {
      setUploading(true);

      const uploadedImages = [];

      for (const file of files) {
        const data = new FormData();
        data.append("image", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          credentials: "include",
          body: data,
        });

        const result = await res.json();

        if (result.success) {
          uploadedImages.push(result.image);
        }
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- REMOVE IMAGE ---------------- */

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- TOGGLE AMENITY ---------------- */

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  /* ---------------- SAVE ROOM ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      form.images.length === 0
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/rooms", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Room added successfully.");

        router.push("/admin/rooms");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save room.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
          Room Management
        </p>

        <h1 className="text-4xl font-bold mt-3">
          Add New Room
        </h1>

        <p className="text-black/50 mt-3">
          Create a new room for Calming Nook.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black/5 rounded-xl p-8 space-y-8"
      >
        {/* Room Name */}

        <div>
          <label className="text-sm font-medium">
            Room Name *
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Deluxe Mountain Room"
            className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 outline-none rounded-lg"
          />
        </div>

        {/* Price + Guests */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-medium">
              Price Per Night (₹)
            </label>

            <div className="relative mt-3">
              <IndianRupee
                size={18}
                className="absolute left-4 top-4 text-black/40"
              />

              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
                className="w-full border border-black/10 bg-[#faf7f2] pl-11 px-4 py-3 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Maximum Guests
            </label>

            <div className="relative mt-3">
              <Users
                size={18}
                className="absolute left-4 top-4 text-black/40"
              />

              <input
                type="number"
                value={form.maxGuests}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxGuests: Number(e.target.value),
                  })
                }
                className="w-full border border-black/10 bg-[#faf7f2] pl-11 px-4 py-3 rounded-lg outline-none"
              />
            </div>
          </div>

        </div>

        {/* Total Rooms */}

        <div>
          <label className="text-sm font-medium">
            Total Rooms Available
          </label>

          <input
            type="number"
            value={form.totalRooms}
            onChange={(e) =>
              setForm({
                ...form,
                totalRooms: Number(e.target.value),
              })
            }
            className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 rounded-lg outline-none"
          />
        </div>

        {/* Description */}

        <div>
          <label className="text-sm font-medium">
            Room Description *
          </label>

          <textarea
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Write room description..."
            className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 rounded-lg resize-none outline-none"
          />
        </div>

        {/* IMAGE UPLOAD */}

        <div className="space-y-5">

          <label className="text-sm font-medium">
            Upload Room Images *
          </label>

          <label className="border-2 border-dashed border-[var(--primary)] rounded-xl h-52 flex flex-col justify-center items-center bg-[#faf7f2] cursor-pointer hover:bg-[#f5efe3] transition">

            {uploading ? (
              <>
                <Loader2 className="animate-spin text-[var(--primary)] mb-3" />
                Uploading Images...
              </>
            ) : (
              <>
                <ImagePlus
                  size={40}
                  className="text-[var(--primary)] mb-3"
                />

                <p className="font-medium">
                  Click to Upload Multiple Images
                </p>

                <p className="text-xs text-black/50 mt-2">
                  JPG, PNG, WEBP
                </p>
              </>
            )}

            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={(e) =>
                uploadImages(
                  Array.from(e.target.files)
                )
              }
            />

          </label>

          {/* Preview Images */}

          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {form.images.map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden border border-black/10"
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-36 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                  >
                    <X
                      size={16}
                      className="text-red-500"
                    />
                  </button>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Amenities */}

        <div>

          <label className="text-sm font-medium">
            Room Amenities
          </label>

          <div className="grid md:grid-cols-3 gap-3 mt-4">

            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className={`border px-4 py-3 rounded-lg cursor-pointer transition ${
                  form.amenities.includes(
                    amenity
                  )
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "border-black/10 bg-[#faf7f2]"
                }`}
              >
                <input
                  type="checkbox"
                  hidden
                  checked={form.amenities.includes(
                    amenity
                  )}
                  onChange={() =>
                    toggleAmenity(amenity)
                  }
                />

                {amenity}
              </label>
            ))}

          </div>

        </div>

        {/* Featured + Availability */}

        <div className="grid md:grid-cols-2 gap-6">

          <label className="flex items-center gap-3 bg-[#faf7f2] p-4 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({
                  ...form,
                  featured: e.target.checked,
                })
              }
            />

            <span className="font-medium">
              Featured Room
            </span>
          </label>

          <label className="flex items-center gap-3 bg-[#faf7f2] p-4 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm({
                  ...form,
                  available: e.target.checked,
                })
              }
            />

            <span className="font-medium">
              Room Available
            </span>
          </label>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-4">

          <button
            type="button"
            onClick={() =>
              router.push("/admin/rooms")
            }
            className="px-6 py-3 border border-black/10 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || uploading}
            className="px-8 py-3 bg-[var(--primary)] text-white rounded-lg disabled:opacity-60"
          >
            {saving
              ? "Saving Room..."
              : "Save Room"}
          </button>

        </div>

      </form>

    </div>
  );
}