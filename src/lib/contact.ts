/** Where enquiries from the site are sent. Single source of truth. */
export const CONTACT_EMAIL = "rajuxstudio@gmail.com";

type MailtoOptions = {
  to?: string;
  subject: string;
  body: string;
};

/**
 * Builds a `mailto:` URL that opens the visitor's own email client with the
 * subject and body pre-filled.
 *
 * `URLSearchParams` encodes spaces as "+", which several mail clients render
 * literally in the subject line, so those are converted back to %20.
 */
export function buildMailto({ to = CONTACT_EMAIL, subject, body }: MailtoOptions): string {
  const query = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${to}?${query}`;
}
