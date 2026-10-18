export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedSubject = input.subject.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide a return email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please specify a brief subject or topic.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please include a short message or project brief.';
  } else if (trimmedMessage.length < 12) {
    errors.message = 'Message must be at least 12 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoUrl(recipientEmail: string, input: ContactFormInput): string {
  const subject = `[Portfolio Inquiry] ${input.subject.trim()} — from ${input.name.trim()}`;
  const bodyLines = [
    `Hello Yash,`,
    ``,
    input.message.trim(),
    ``,
    `—`,
    `From: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
  ];
  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });
  return `mailto:${recipientEmail}?${params.toString().replace(/\+/g, '%20')}`;
}

export function filterProjectsByCategory<T extends { category: string }>(
  items: readonly T[],
  category: string
): T[] {
  if (!category || category === 'all') {
    return [...items];
  }
  return items.filter((item) => item.category === category);
}

export function computeParallaxOffset(
  normX: number,
  normY: number,
  maxPixels: number,
  motionEnabled: boolean
): { x: number; y: number } {
  if (!motionEnabled) {
    return { x: 0, y: 0 };
  }
  const clampedX = Math.max(-1, Math.min(1, normX));
  const clampedY = Math.max(-1, Math.min(1, normY));
  return {
    x: Number((clampedX * maxPixels).toFixed(2)),
    y: Number((clampedY * maxPixels).toFixed(2)),
  };
}
