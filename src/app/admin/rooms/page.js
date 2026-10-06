"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BedDouble, Pencil, Trash2, Plus, Users } from "lucide-react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("/api/rooms");
    const data = await res.json();

    if (data.success) {
      setRooms(data.rooms);
    }

    setLoading(false);
  };

  const deleteRoom = async (id) => {
    if (!confirm("Delete this room?")) return;

    await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchRooms();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="uppercase tracking-[6px] text-[var(--primary)] text-xs">
            Room Management
          </p>

          <h1 className="text-4xl font-bold mt-3">All Rooms</h1>
        </div>

        <Link
          href="/admin/rooms/add"
          className="bg-[var(--primary)] text-white px-5 py-3 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Room
        </Link>
        <Link
          href={`/admin/rooms/edit/${room._id}`}
          className="flex-1 border border-black/10 py-2 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition"
        >
          <Pencil size={16} />
          Edit
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : rooms.length === 0 ? (
        <div className="bg-white border border-dashed border-black/10 p-20 text-center">
          <BedDouble size={45} className="mx-auto text-black/30" />

          <p className="mt-4 text-black/50">No rooms added yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl overflow-hidden border"
            >
              <img
                src={room.images?.[0]?.url || "/placeholder-room.jpg"}
                alt={room.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">{room.name}</h2>

                <p className="text-black/60 mt-2">{room.description}</p>

                <p className="text-[var(--primary)] font-bold mt-3">
                  ₹{room.price}/Night
                </p>

                <button onClick={() => deleteRoom(room._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
