import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    maxGuests: {
      type: Number,
      default: 2,
    },

    totalRooms: {
      type: Number,
      default: 1,
    },

    available: {
      type: Boolean,
      default: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Room ||
  mongoose.model("Room", RoomSchema);