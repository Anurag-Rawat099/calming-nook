"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ImagePlus,
  X,
  IndianRupee,
  Users,
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

export default function EditRoomPage({ params }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
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

  // ---------------- FETCH ROOM ----------------

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await fetch(`/api/rooms/${params.id}`);

      const data = await res.json();

      if (data.success) {
        setForm(data.room);
      } else {
        alert("Room not found.");
        router.push("/admin/rooms");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- IMAGE UPLOAD ----------------

  const uploadImages = async (files) => {
    try {
      setUploading(true);

      const uploadedImages = [];

      for (const file of files) {
        const body = new FormData();
        body.append("image", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          credentials: "include",
          body,
        });

        const data = await res.json();

        if (data.success) {
          uploadedImages.push(data.image);
        }
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- REMOVE IMAGE ----------------

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ---------------- TOGGLE AMENITY ----------------

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // ---------------- UPDATE ROOM ----------------

  const updateRoom = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      form.images.length === 0
    ) {
      alert("Please complete required fields.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`/api/rooms/${params.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Room updated successfully.");
        router.push("/admin/rooms");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2
          className="animate-spin text-[var(--primary)]"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
          Room Management
        </p>

        <h1 className="text-4xl font-bold mt-3">
          Edit Room
        </h1>

        <p className="text-black/50 mt-3">
          Update room information, images and amenities.
        </p>
      </div>

      <form
        onSubmit={updateRoom}
        className="bg-white border border-black/5 rounded-xl p-8 space-y-8"
      >

        {/* Room Name */}

        <div>
          <label className="text-sm font-medium">
            Room Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 rounded-lg outline-none"
          />
        </div>

        {/* Price + Guests */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-medium">
              Price Per Night
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
                className="w-full pl-11 border border-black/10 bg-[#faf7f2] px-4 py-3 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Max Guests
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
                className="w-full pl-11 border border-black/10 bg-[#faf7f2] px-4 py-3 rounded-lg outline-none"
              />
            </div>
          </div>

        </div>

        {/* Total Rooms */}

        <div>
          <label className="text-sm font-medium">
            Total Rooms
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
            Room Description
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
            className="w-full mt-3 border border-black/10 bg-[#faf7f2] px-5 py-3 rounded-lg resize-none outline-none"
          />
        </div>

        {/* Images */}

        <div className="space-y-5">

          <label className="text-sm font-medium">
            Room Images
          </label>

          <label className="border-2 border-dashed border-[var(--primary)] rounded-xl h-44 flex flex-col justify-center items-center bg-[#faf7f2] cursor-pointer">

            {uploading ? (
              <>
                <Loader2 className="animate-spin mb-3 text-[var(--primary)]" />
                Uploading...
              </>
            ) : (
              <>
                <ImagePlus
                  size={38}
                  className="mb-3 text-[var(--primary)]"
                />

                Upload More Images
              </>
            )}

            <input
              hidden
              multiple
              accept="image/*"
              type="file"
              onChange={(e) =>
                uploadImages(Array.from(e.target.files))
              }
            />

          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {form.images.map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border border-black/10"
              >
                <img
                  src={img.url}
                  className="w-full h-36 object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <X size={16} className="text-red-500" />
                </button>
              </div>
            ))}

          </div>

        </div>

        {/* Amenities */}

        <div>
          <label className="text-sm font-medium">
            Amenities
          </label>

          <div className="grid md:grid-cols-3 gap-3 mt-4">

            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className={`cursor-pointer rounded-lg border px-4 py-3 transition ${
                  form.amenities.includes(amenity)
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "border-black/10 bg-[#faf7f2]"
                }`}
              >
                <input
                  hidden
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />

                {amenity}
              </label>
            ))}

          </div>
        </div>

        {/* Switches */}

        <div className="grid md:grid-cols-2 gap-6">

          <label className="bg-[#faf7f2] rounded-lg p-4 flex gap-3 items-center cursor-pointer">
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

            Featured Room
          </label>

          <label className="bg-[#faf7f2] rounded-lg p-4 flex gap-3 items-center cursor-pointer">
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

            Room Available
          </label>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-4">

          <button
            type="button"
            onClick={() => router.push("/admin/rooms")}
            className="px-6 py-3 border border-black/10 rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={saving || uploading}
            className="px-8 py-3 rounded-lg bg-[var(--primary)] text-white disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Room"}
          </button>

        </div>

      </form>

    </div>
  );
}