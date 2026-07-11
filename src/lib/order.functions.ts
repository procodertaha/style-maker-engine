import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";
import { getServerEnvVar } from "../lib/env";

const orderSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(5, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(255),
  city: z.string().trim().min(2, "Please enter your city").max(100),
  address: z.string().trim().min(5, "Please enter your address").max(1000),
  productName: z.string().trim().min(2).max(255),
  size: z.string().trim().min(1).max(50),
  color: z.string().trim().min(1).max(50),
  quantity: z.number().int().min(1),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = getServerEnvVar("RESEND_API_KEY");
    const contactEmail = getServerEnvVar("CONTACT_EMAIL");

    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY");
    }

    if (!contactEmail) {
      throw new Error("Missing CONTACT_EMAIL");
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "SKB Fashion <onboarding@resend.dev>",
      to: contactEmail,
      subject: "New Order - SKB Fashion",
      html: `
        <h2>New Order Received</h2>
        <p><strong>Customer Name:</strong> ${data.name}</p>
        <p><strong>Phone Number:</strong> ${data.phone}</p>
        <p><strong>Email Address:</strong> ${data.email}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Delivery Address:</strong> ${data.address}</p>
        <p><strong>Product Name:</strong> ${data.productName}</p>
        <p><strong>Selected Size:</strong> ${data.size}</p>
        <p><strong>Selected Color:</strong> ${data.color}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Additional Notes:</strong> ${data.notes || "None"}</p>
      `,
    });

    return { ok: true as const };
  });
