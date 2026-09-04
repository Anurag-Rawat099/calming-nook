import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        guestName: {
            type: String,
            required: true,
            trim: true,
        },

        guestEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        guestPhone: {
            type: String,
            required: true,
            trim: true,
        },

        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        checkIn: {
            type: Date,
            required: true,
        },

        checkOut: {
            type: Date,
            required: true,
        },

        adults: {
            type: Number,
            required: true,
            min: 1,
        },

        children: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "partially_paid",
                "refunded",
                "failed",
            ],
            default: "pending",
        },

        paymentMethod: {
            type: String,
            enum: [
                "cash",
                "upi",
                "card",
                "online",
                "other",
            ],
            default: "other",
        },

        bookingStatus: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "completed",
                "cancelled",
            ],
            default: "pending",
        },

        specialRequest: {
            type: String,
            default: "",
            trim: true,
        },

        adminNote: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking =
    mongoose.models.Booking ||
    mongoose.model("Booking", BookingSchema);

export default Booking;