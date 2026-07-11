import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";
import { getServerEnvVar } from "../lib/env";

// Server-side validation schema — enforced on the trusted server, not just the client.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000),
  // Simple honeypot — bots fill this, humans don't see it.
  website: z.string().max(0).optional().or(z.literal("")),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website && data.website.length > 0) {
      // Silently accept honeypot hits — do not tell bots.
      return { ok: true as const };
    }

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
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return { ok: true as const };
  });