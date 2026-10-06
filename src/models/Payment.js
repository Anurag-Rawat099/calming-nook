import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        bookingId: {
            type: String,
            required: true,
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

        amount: {
            type: Number,
            required: true,
            min: 0,
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

        transactionId: {
            type: String,
            default: "",
            trim: true,
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

        paidAt: {
            type: Date,
            default: null,
        },

        note: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Payment =
    mongoose.models.Payment ||
    mongoose.model("Payment", PaymentSchema);

export default Payment;