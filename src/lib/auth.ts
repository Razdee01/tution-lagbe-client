import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB as string);
const db = client.db("mentor-lagbe");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["student", "tutor", "admin"],
        defaultValue: "student",
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: { ...user, role: user.role === "tutor" ? "tutor" : "student" },
        }),
      },
    },
  },
});
