import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { db } from "~/server/db";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox", // change to "production" when going live
});



export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,

      use: [
        checkout({
          products: [
            {
              productId: "09137337-501a-4058-bc7b-1174ecf8ed2a",
              slug: "small",
            },
            {
              productId: "40c61b9c-aefb-4d4d-92c7-b72be403aec7",
              slug: "medium",
            },
            {
              productId: "f13c6269-ca57-4176-80b7-ee415b6adbdc",
              slug: "large",
            },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),

        portal(),

        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,

          onOrderPaid: async (order) => {
            try {
              const email = order.data.customer.email;
              const polarCustomerId = order.data.customer.id;

              if (!email) {
                console.error("No email found on customer.");
                return;
              }

              // ✅ Find user by email instead of ID
              const user = await db.user.findUnique({
                where: { email },
              });

              if (!user) {
                console.error("No user found with email:", email);
                return;
              }

              const productId = order.data.productId;

              let creditsToAdd = 0;

              switch (productId) {
                case "09137337-501a-4058-bc7b-1174ecf8ed2a":
                  creditsToAdd = 50;
                  break;
                case "40c61b9c-aefb-4d4d-92c7-b72be403aec7":
                  creditsToAdd = 200;
                  break;
                case "f13c6269-ca57-4176-80b7-ee415b6adbdc":
                  creditsToAdd = 400;
                  break;
                default:
                  console.error("Unknown product ID:", productId);
                  return;
              }

              await db.user.update({
                where: { id: user.id },
                data: {
                  polarCustomerId, 
                  credits: {
                    increment: creditsToAdd,
                  },
                },
              });

              console.log(
                `Successfully added ${creditsToAdd} credits to user ${user.email}`
              );
            } catch (error) {
              console.error("Webhook error:", error);
            }
          },

        }),
      ],
    }),
  ],
});
