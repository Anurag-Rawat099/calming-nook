import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Property",
        "Rooms",
        "Exterior",
        "Interior",
        "View",
        "Food",
        "Activities",
      ],
      default: "Property",
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);