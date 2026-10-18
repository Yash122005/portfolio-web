import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  Send,
  AlertCircle,
} from 'lucide-react';
import { OWNER_PROFILE, SOCIAL_LINKS } from '../data/socialLinks';
import {
  ContactFormInput,
  validateContactForm,
  buildMailtoUrl,
} from '../utils/portfolioLogic';
import { SectionHeading } from '../components/SectionHeading';

interface ContactSectionProps {
  motionEnabled: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  motionEnabled,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'ready'
  >('idle');
  const [generatedMailto, setGeneratedMailto] = useState<string>('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleInputChange = (
    field: keyof ContactFormInput,
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitStatus === 'ready') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmitStatus('idle');
      return;
    }

    setErrors({});
    setSubmitStatus('submitting');

    const mailtoHref = buildMailtoUrl(OWNER_PROFILE.email, formState);
    setGeneratedMailto(mailtoHref);

    // Also copy formatted message to clipboard for convenience
    try {
      await navigator.clipboard.writeText(
        `To: ${OWNER_PROFILE.email}\nSubject: ${formState.subject}\nFrom: ${formState.name} (${formState.email})\n\n${formState.message}`
      );
    } catch {
      // ignore clipboard errors in restricted contexts
    }

    setTimeout(() => {
      setSubmitStatus('ready');
      window.location.href = mailtoHref;
    }, 200);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-section-heading"
      className="px-[var(--gutter)] py-24 sm:py-32 bg-[#050505] border-t border-[#292724]"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          chapter="04 / INITIATE DIALOGUE"
          metaRight="INTERNSHIPS · FULL-STACK ROLES · COLLABORATIONS"
          title={
            <span id="contact-section-heading">
              Let&apos;s build something{' '}
              <span className="italic text-[#FF8047]">enduring.</span>
            </span>
          }
          subtitle="Available for software engineering internships, full-stack product collaborations, and technical discussions."
          motionEnabled={motionEnabled}
        />

        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Verified Email & Social Channels (5 cols) */}
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Primary Verified Email Card */}
            <div className="p-6 sm:p-8 rounded-[16px] bg-[#101010] border border-[#292724]">
              <span className="text-[10px] font-mono-editorial uppercase tracking-[0.14em] text-[#FF8047]">
                DIRECT ELECTRONIC MAIL
              </span>
              <a
                href={`mailto:${OWNER_PROFILE.email}`}
                className="mt-3 block font-serif-editorial text-[24px] sm:text-[28px] text-[#F1EEE7] hover:text-[#FF8047] transition-colors break-all"
              >
                {OWNER_PROFILE.email}
              </a>
              <p className="mt-2 text-[13px] text-[#A39D94] leading-[1.6]">
                Verified primary inbox for engineering inquiries, hackathons,
                and recruitment correspondence.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${OWNER_PROFILE.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#FF8047] hover:bg-[#ff9261] text-[#050505] text-[12px] font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#161514] hover:border-[#FF8047]/60 text-[#F1EEE7] border border-[#292724] text-[12px] font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#FF8047]" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#A39D94]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Profiles List */}
            <div className="divide-y divide-[#292724] border-t border-b border-[#292724]">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-4 flex items-center justify-between gap-4 hover:bg-[#101010]/60 transition-colors px-2 -mx-2 rounded-[8px]"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif-editorial text-[22px] text-[#F1EEE7] group-hover:text-[#FF8047] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-mono-editorial text-[#A39D94]">
                        {item.handle}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#A39D94]/80 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A39D94] group-hover:text-[#FF8047] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Validated Direct Inquiry Composer (7 cols) */}
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7 p-6 sm:p-10 rounded-[16px] bg-[#101010] border border-[#292724]"
          >
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#292724]">
              <div>
                <h3 className="font-serif-editorial text-[28px] leading-none text-[#F1EEE7]">
                  Compose a Direct Note
                </h3>
                <p className="mt-1.5 text-[13px] text-[#A39D94]">
                  Validates your message and prepares a direct dispatch to{' '}
                  <span className="text-[#F1EEE7] font-mono-editorial text-[12px]">
                    {OWNER_PROFILE.email}
                  </span>{' '}
                  (no external backend required).
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Rohan Verma"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-4 py-3 rounded-[10px] bg-[#080808] border border-[#292724] focus:border-[#FF8047] text-[14px] text-[#F1EEE7] placeholder:text-[#A39D94]/40 transition-colors"
                  />
                  {errors.name && (
                    <p
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#FF8047]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94] mb-2"
                  >
                    Return Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="you@organization.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-4 py-3 rounded-[10px] bg-[#080808] border border-[#292724] focus:border-[#FF8047] text-[14px] text-[#F1EEE7] placeholder:text-[#A39D94]/40 transition-colors"
                  />
                  {errors.email && (
                    <p
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#FF8047]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-[11px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94] mb-2"
                >
                  Subject / Context
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Software Engineering Internship / Project Collaboration"
                  aria-invalid={Boolean(errors.subject)}
                  className="w-full px-4 py-3 rounded-[10px] bg-[#080808] border border-[#292724] focus:border-[#FF8047] text-[14px] text-[#F1EEE7] placeholder:text-[#A39D94]/40 transition-colors"
                />
                {errors.subject && (
                  <p
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#FF8047]"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-mono-editorial uppercase tracking-[0.12em] text-[#A39D94] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Share details about the role, timeline, or technical problem you are exploring..."
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-4 py-3 rounded-[10px] bg-[#080808] border border-[#292724] focus:border-[#FF8047] text-[14px] text-[#F1EEE7] placeholder:text-[#A39D94]/40 transition-colors resize-y"
                />
                {errors.message && (
                  <p
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#FF8047]"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[10px] bg-[#FF8047] hover:bg-[#ff9261] disabled:opacity-60 text-[#050505] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitStatus === 'submitting'
                      ? 'Preparing Dispatch...'
                      : 'Prepare & Open in Mail Client'}
                  </span>
                </button>

                <span className="text-[11px] font-mono-editorial text-[#A39D94]/75">
                  Copy also saved to clipboard on submit
                </span>
              </div>

              {submitStatus === 'ready' && (
                <div
                  role="status"
                  className="p-4 rounded-[12px] bg-[#151311] border border-[#FF8047]/45 text-[13px] text-[#F1EEE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <span>
                    ✓ Formatted inquiry copied to your clipboard and ready for{' '}
                    <strong className="text-[#FF8047]">
                      {OWNER_PROFILE.email}
                    </strong>
                    .
                  </span>
                  <a
                    href={generatedMailto}
                    className="inline-flex items-center gap-1.5 text-[12px] font-mono-editorial uppercase tracking-[0.1em] text-[#FF8047] hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>Launch Mailto</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
