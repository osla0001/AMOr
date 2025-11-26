// src/pages/api/support.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

// Initialize Resend with your API key
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Read data from form submission
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Valider data
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Alle felter skal udfyldes" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "MunchMap <onboarding@resend.dev>", // Brug din verificerede domain senere
      to: ["osla0001@stud.ek.dk"], // Din Resend konto email (test mode)
      replyTo: email as string,
      subject: `Ny support-anmodning fra ${name}`,
      html: `
        <h2>Ny support-anmodning</h2>
        <p><strong>Fra:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Besked:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend fejl:", error);
      return new Response(JSON.stringify({ error: "Kunne ikke sende email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Email sendt:", data);

    // Returnér success
    return new Response(
      JSON.stringify({
        success: true,
        message: "Din support-anmodning er sendt!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Fejl i support API:", error);
    return new Response(
      JSON.stringify({
        error: "Der opstod en fejl",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
