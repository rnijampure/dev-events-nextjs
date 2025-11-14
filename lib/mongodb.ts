import mongoose, { Mongoose, ConnectOptions } from "mongoose";

/**
 * Shape of the cached Mongoose connection used to avoid creating
 * multiple connections during development (due to module hot reloading).
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * We store the connection cache on the global object so that it
 * persists across hot reloads in development. In production, this
 * code is only evaluated once per serverless instance / process.
 */
declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var _mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your environment configuration."
  );
}

// Initialize the cached connection container if it does not exist yet.
const cached: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global._mongooseCache) {
  global._mongooseCache = cached;
}

/**
 * Common connection options for Mongoose.
 *
 * - bufferCommands: false => let Next.js / the app handle failures instead of buffering.
 * - maxPoolSize: limit the number of concurrent connections per instance.
 */
const connectionOptions: ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
};

/**
 * Establishes (or reuses) a Mongoose connection.
 *
 * This function is safe to call from any server-side code (API routes, route handlers,
 * server components) and will reuse an existing connection when available.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // If we already have an open connection, reuse it.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection attempt is already in progress, await it instead of
  // creating a new one.
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, connectionOptions)
      .then((mongooseInstance: Mongoose) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
