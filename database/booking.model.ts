import {
  Schema,
  model,
  models,
  Model,
  HydratedDocument,
  Types,
} from "mongoose";
import { Event } from "./event.model";

/**
 * Core shape of a Booking document.
 */
export interface Booking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingDocument = HydratedDocument<Booking>;

const emailRegex =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const bookingSchema = new Schema<Booking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value: string): boolean {
          return emailRegex.test(value);
        },
        message: "Email must be a valid email address.",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Index eventId to speed up queries by event.
bookingSchema.index({ eventId: 1 });

/**
 * Before saving a booking, ensure the referenced event exists and
 * validate email format.
 */
bookingSchema.pre("save", async function (next) {
  const doc = this as BookingDocument;

  if (!emailRegex.test(doc.email)) {
    return next(new Error("Email must be a valid email address."));
  }

  const eventExists = await Event.exists({ _id: doc.eventId }).lean();

  if (!eventExists) {
    return next(new Error("Cannot create booking for a non-existent event."));
  }

  return next();
});

// Reuse existing model in development to prevent overwrite errors.
export const Booking: Model<Booking> =
  (models.Booking as Model<Booking> | undefined) ||
  model<Booking>("Booking", bookingSchema);
