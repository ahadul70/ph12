
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceId: {
        type: String, // Or ObjectId if we had a Service model, but using static ID for now
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    durationDays: {
        type: Number,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    location: {
        division: String,
        district: String,
        city: String,
        address: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
