import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_4ZhradHP_g4FLHTHPGapMoCp2zSPkP7sz");
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const topic = formData.get("topic");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    if (!topic || !firstName || !lastName || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Alle felter skal udfyldes" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const fullName = `${firstName} ${lastName}`;
    const { data, error } = await resend.emails.send({
      from: "MunchMap <onboarding@resend.dev>",
      // Brug din verificerede domain senere
      to: ["osla0001@stud.ek.dk"],
      // Din Resend konto email (test mode)
      replyTo: email,
      subject: `Ny support-anmodning fra ${fullName} - ${topic}`,
      html: `
        <h2>Ny support-anmodning</h2>
        <p><strong>Emne:</strong> ${topic}</p>
        <p><strong>Fra:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
        <p><strong>Besked:</strong></p>
        <p>${message}</p>
      `
    });
    if (error) {
      console.error("Resend fejl:", error);
      return new Response(JSON.stringify({ error: "Kunne ikke sende email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("Email sendt:", data);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Din support-anmodning er sendt!"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Fejl i support API:", error);
    return new Response(
      JSON.stringify({
        error: "Der opstod en fejl"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
