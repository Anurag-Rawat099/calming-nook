import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: "",
        },

        description: {
            type: String,
            trim: true,
            default: "",
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

        category: {
            type: String,
            enum: [
                "property",
                "rooms",
                "dining",
                "exterior",
                "interior",
                "nearby",
                "activities",
            ],
            default: "property",
        },

        sortOrder: {
            type: Number,
            default: 0,
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

const Gallery =
    mongoose.models.Gallery ||
    mongoose.model("Gallery", GallerySchema);

export default Gallery;