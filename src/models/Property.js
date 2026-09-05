import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: String,
    description: String,

    address: String,
    city: String,
    state: String,
    pincode: String,

    phone: String,
    whatsapp: String,
    email: String,

    googleMapsUrl: String,

    checkInTime: String,
    checkOutTime: String,

    cancellationPolicy: String,
    houseRules: String,

    instagram: String,
    facebook: String,
    youtube: String,

    logo: {
      url: String,
      publicId: String,
    },

    coverImage: {
      url: String,
      publicId: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);