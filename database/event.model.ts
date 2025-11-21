// my-app/database/event.model.ts
import { Schema, model, models, Model, HydratedDocument } from "mongoose";

/**
 * Core shape of an Event document.
 */
export interface Event {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // ISO string
  time: string; // normalized HH:mm (24-hour) string
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventDocument = HydratedDocument<Event>;

/**
 * Generate a URL-friendly slug from a title.
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Normalize a time string to 24-hour HH:mm format.
 * Accepts common 24h inputs like "9:00", "09:00", "09:00:30".
 */
function normalizeTime(input: string): string {
  const value = input.trim();

  const match = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    throw new Error(
      "Invalid time format; expected HH:mm or HH:mm:ss (24-hour)"
    );
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time value; hours must be 0-23 and minutes 0-59");
  }

  const normalizedHours = hours.toString().padStart(2, "0");
  const normalizedMinutes = minutes.toString().padStart(2, "0");

  return `${normalizedHours}:${normalizedMinutes}`;
}

const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator(value: string[]): boolean {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Agenda must contain at least one item.",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator(value: string[]): boolean {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Tags must contain at least one item.",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

/**
 * Ensure string fields are present and non-empty, generate a slug when needed,
 * and normalize date/time into consistent formats before validation runs.
 */
eventSchema.pre("validate", function (next) {
  const doc = this as EventDocument;

  const requiredStringFields: (keyof Event)[] = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  for (const field of requiredStringFields) {
    const value = doc[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return next(
        new Error(`Field "${String(field)}" is required and cannot be empty.`)
      );
    }
  }

  if (!Array.isArray(doc.agenda) || doc.agenda.length === 0) {
    return next(
      new Error("Agenda is required and must contain at least one item.")
    );
  }

  if (!Array.isArray(doc.tags) || doc.tags.length === 0) {
    return next(
      new Error("Tags are required and must contain at least one item.")
    );
  }

  // Generate or update slug only when the title changes.
  if (doc.isNew || doc.isModified("title")) {
    doc.slug = generateSlug(doc.title);
  }

  // Normalize date to ISO string (UTC) and ensure it is valid.
  const parsedDate = new Date(doc.date);
  if (Number.isNaN(parsedDate.getTime())) {
    return next(
      new Error("Invalid date; unable to parse into a valid ISO date.")
    );
  }
  doc.date = parsedDate.toISOString();

  try {
    doc.time = normalizeTime(doc.time);
  } catch (error) {
    return next(error as Error);
  }

  return next();
});

// Reuse existing model in development to prevent overwrite errors.
/**
 * FIXED:
 * MUST be Model<EventDocument>, NOT Model<Event>.
 */
export const Event: Model<EventDocument> =
  (models.Event as Model<EventDocument>) ||
  model<EventDocument>("Event", eventSchema);
