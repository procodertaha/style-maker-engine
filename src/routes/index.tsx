import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  ArrowUp,
  Award,
  Check,
  ChevronDown,
  Clock,
  Facebook,
  Headphones,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";

import { submitContact } from "@/lib/contact.functions";
import heroImg from "@/assets/hero.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catCasual from "@/assets/cat-casual.jpg";
import catFormal from "@/assets/cat-formal.jpg";
import catSeasonal from "@/assets/cat-seasonal.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000),
});

const categories = [
  { title: "Men's Fashion", tag: "Refined", image: catMen },
  { title: "Women's Fashion", tag: "Elegant", image: catWomen },
  { title: "Casual Wear", tag: "Everyday", image: catCasual },
  { title: "Formal Wear", tag: "Occasion", image: catFormal },
  { title: "Seasonal Collection", tag: "Autumn '26", image: catSeasonal },
  { title: "Accessories", tag: "Details", image: catAccessories },
];

const reasons = [
  { icon: Award, title: "Premium Quality", body: "Handpicked fabrics that hold their shape and colour." },
  { icon: Tag, title: "Affordable Pricing", body: "Considered luxury, without the mark-ups." },
  { icon: Sparkles, title: "Trendy Collections", body: "New arrivals guided by the season, not by algorithms." },
  { icon: Heart, title: "Customer Satisfaction", body: "A 5.0 rating that we work to protect every day." },
  { icon: Headphones, title: "Fast Response", body: "Speak to a stylist within hours, not days." },
  { icon: Check, title: "Trusted Local Store", body: "A neighbourhood boutique built on referrals." },
];

const faqs = [
  {
    q: "What products do you sell?",
    a: "We stock a curated selection of contemporary clothing for men and women — everyday essentials, formal pieces, seasonal collections and finishing accessories.",
  },
  {
    q: "Do you offer the latest fashion trends?",
    a: "Yes. Our buyers refresh the floor weekly, balancing on-trend statement pieces with timeless staples.",
  },
  {
    q: "Can customers contact you through WhatsApp?",
    a: "Absolutely. Use the WhatsApp link in our contact section for quick styling questions, size checks and store pickups.",
  },
  {
    q: "Where is your store located?",
    a: "Visit our boutique in the city fashion district — the exact address, phone and hours are listed in the contact section below.",
  },
];

function HomePage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-sans text-ink">
      <Nav />
      <Hero />
      <About />
      <Categories />
      <WhyChoose />
      <Testimonials />
      <Gallery />
      <ContactAndFaq />
      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid size-11 place-items-center rounded-full bg-ink text-surface shadow-lg transition-transform hover:scale-105"
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#collections", label: "Collections" },
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <nav className="sticky top-0 z-40 border-b border-ink/5 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="#top" className="font-serif text-2xl tracking-tight">
          SKB <span className="text-gold">Fashion</span>
        </a>
        <div className="hidden gap-8 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#collections"
            className="hidden h-10 items-center bg-ink px-4 text-xs font-medium uppercase tracking-widest text-surface transition-colors hover:bg-ink/90 sm:inline-flex"
          >
            Shop Now
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden"
          >
            <ChevronDown
              className={`size-6 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-ink/5 bg-surface sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-ink/80 hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#collections"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center bg-ink px-4 text-xs font-medium uppercase tracking-widest text-surface"
            >
              Shop Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div className="fade-up">
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-ink-soft">
              <span className="h-px w-10 bg-gold" /> New Season 2026
            </p>
            <h1 className="text-balance font-serif text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              Elevate your style with{" "}
              <span className="italic text-gold">SKB Fashion</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-lg text-ink-soft">
              Discover trendy, high-quality clothing designed to help you look
              and feel your best — curated with care for the modern wardrobe.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#collections"
                className="inline-flex h-12 items-center gap-2 bg-ink px-6 text-sm font-medium uppercase tracking-widest text-surface transition-colors hover:bg-ink/90"
              >
                Shop Collection
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 border border-ink/15 px-6 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:border-ink/40"
              >
                Contact Us
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs uppercase tracking-widest text-ink-soft">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-gold text-gold" /> 5.0 rated
              </span>
              <span>Curated weekly</span>
              <span>Local boutique</span>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Model wearing a modern outfit from the SKB Fashion collection"
              width={1080}
              height={1350}
              className="aspect-[4/5] w-full object-cover shadow-[0_30px_80px_-40px_rgba(20,20,20,0.4)]"
            />
            <div className="absolute -bottom-6 left-6 hidden bg-surface px-5 py-4 shadow-lg ring-1 ring-ink/5 lg:block">
              <p className="font-serif text-xl leading-none">Est. 2024</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-soft">
                Independent fashion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    { icon: Award, label: "Quality Products" },
    { icon: Tag, label: "Affordable Prices" },
    { icon: Sparkles, label: "Latest Trends" },
    { icon: Heart, label: "Friendly Service" },
  ];
  return (
    <section id="about" className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Our Philosophy
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight md:text-5xl">
              Where quality meets modern elegance.
            </h2>
            <p className="mt-6 max-w-[56ch] text-pretty text-ink-soft">
              At SKB Fashion, we believe great style should be accessible to
              everyone. We offer carefully selected fashion pieces that combine
              quality, comfort, and modern design. Whether you're shopping for
              everyday wear or something special, SKB Fashion is committed to
              helping customers express themselves through fashion.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.label} className="flex flex-col gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-gold-soft text-gold">
                  <v.icon className="size-5" />
                </div>
                <span className="text-sm font-semibold">{v.label}</span>
                <span className="text-xs text-ink-soft">
                  A cornerstone of the SKB experience.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="collections" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              The Collections
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Shop by category</h2>
          </div>
          <a
            href="#contact"
            className="hidden text-xs font-medium uppercase tracking-widest text-ink-soft transition-colors hover:text-ink sm:inline"
          >
            Ask a stylist →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={`${c.title} at SKB Fashion`}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink">
                  {c.tag}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-lg">{c.title}</h3>
                <span className="text-xs uppercase tracking-widest text-ink-soft transition-colors group-hover:text-gold">
                  Explore →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="border-y border-ink/5 bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Why SKB Fashion
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">
            Small details that make a lasting difference.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group flex gap-5 bg-surface p-8 ring-1 ring-ink/5 transition-shadow hover:shadow-lg"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-soft text-gold">
                <r.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Sana Faizan",
      body: "Wonderful shopping experience. Highly recommended.",
    },
    {
      name: "Dilroz Khan",
      body: "Excellent quality products and great customer service.",
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-serif text-2xl italic md:text-3xl">
            5.0 / 5 based on customer reviews
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-4xl">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="bg-muted/60 p-10 text-left ring-1 ring-ink/5"
              >
                <div className="mb-4 flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl italic leading-snug text-ink">
                  "{r.body}"
                </blockquote>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  {r.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    { src: gallery1, alt: "SKB Fashion boutique interior", span: "sm:row-span-2" },
    { src: gallery2, alt: "Neatly folded neutral clothing" },
    { src: gallery3, alt: "Fashion lifestyle on a city street" },
    { src: gallery4, alt: "Fabric details on a hanger" },
  ];
  return (
    <section id="gallery" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              The Look
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">From the atelier</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          {images.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden bg-surface ${img.span ?? ""} ${
                i === 0 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactAndFaq() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-2">
          <ContactBlock />
          <FaqBlock />
        </div>
      </div>
    </section>
  );
}

function ContactBlock() {
  const submit = useServerFn(submitContact);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof contactSchema>) => submit({ data }),
    onSuccess: () => setSent(true),
    onError: (err: Error) => setFormError(err.message || "Something went wrong."),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});
    setSent(false);
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "");
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }
    mutation.mutate(parsed.data);
  };

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        Get in touch
      </p>
      <h2 className="font-serif text-4xl md:text-5xl">Visit or write to us</h2>
      <p className="mt-4 max-w-md text-ink-soft">
        Have a styling question, a size query, or want to plan a store visit?
        Send us a message and we'll respond within one business day.
      </p>

      <ul className="mt-10 grid gap-5 text-sm">
        <ContactRow icon={Phone} label="Phone" value="+92 000 000 0000" href="tel:+920000000000" />
        <ContactRow
          icon={MessageCircle}
          label="WhatsApp"
          value="Chat with a stylist"
          href="https://wa.me/920000000000"
        />
        <ContactRow icon={Mail} label="Email" value="hello@skbfashion.com" href="mailto:hello@skbfashion.com" />
        <ContactRow icon={MapPin} label="Address" value="SKB Fashion Boutique, City Center" />
        <ContactRow icon={Clock} label="Hours" value="Monday – Sunday · 10:00 AM – 09:00 PM" />
      </ul>

      <form onSubmit={onSubmit} noValidate className="mt-12 grid gap-6">
        <Field
          label="Full Name"
          name="name"
          placeholder="Enter your name"
          error={fieldErrors.name}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="hello@example.com"
            error={fieldErrors.email}
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Optional"
            error={fieldErrors.phone}
          />
        </div>
        <Field
          label="Message"
          name="message"
          textarea
          placeholder="How can we help you?"
          error={fieldErrors.message}
        />

        {/* Honeypot — visually hidden, but bots fill it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        {formError && (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        )}
        {sent && (
          <p
            role="status"
            className="border border-gold/40 bg-gold-soft px-4 py-3 text-sm text-ink"
          >
            Thanks — your message has landed with our team. We'll reply shortly.
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex h-12 items-center justify-center gap-2 bg-ink text-sm font-medium uppercase tracking-[0.2em] text-surface transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? "Sending…" : "Send Message"}
          {!mutation.isPending && <Send className="size-4" />}
        </button>
      </form>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-soft text-gold">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
          {label}
        </span>
        <span className="block text-sm">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="flex items-center gap-4 transition-colors hover:text-gold"
        >
          {inner}
        </a>
      ) : (
        <span className="flex items-center gap-4">{inner}</span>
      )}
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  error?: string;
}) {
  const base =
    "w-full bg-transparent border-b border-ink/15 py-3 text-sm outline-none transition-colors focus:border-gold placeholder:text-ink/30";
  return (
    <label className="grid gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          className={`${base} resize-none`}
          aria-invalid={!!error}
          maxLength={2000}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={base}
          aria-invalid={!!error}
          maxLength={255}
        />
      )}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

function FaqBlock() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        FAQ
      </p>
      <h2 className="font-serif text-4xl md:text-5xl">Common questions</h2>
      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium">{f.q}</span>
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform ${
                    isOpen ? "rotate-180 text-gold" : "text-ink-soft"
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
              >
                <p className="min-h-0 text-sm text-ink-soft">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <span className="font-serif text-2xl">
            SKB <span className="text-gold">Fashion</span>
          </span>
          <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-surface/60">
            Curated fashion for the modern wardrobe. Independent, thoughtful,
            proudly local.
          </p>
        </div>
        <FooterCol
          title="Explore"
          items={[
            { label: "Collections", href: "#collections" },
            { label: "About", href: "#about" },
            { label: "Gallery", href: "#gallery" },
            { label: "Contact", href: "#contact" },
          ]}
        />
        <FooterCol
          title="Contact"
          items={[
            { label: "hello@skbfashion.com", href: "mailto:hello@skbfashion.com" },
            { label: "+92 000 000 0000", href: "tel:+920000000000" },
            { label: "WhatsApp", href: "https://wa.me/920000000000" },
          ]}
        />
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
            Hours
          </h4>
          <p className="text-sm text-surface/60">Monday – Sunday</p>
          <p className="text-sm text-surface/60">10:00 AM – 09:00 PM</p>
          <div className="mt-4 flex gap-3">
            <SocialIcon href="https://instagram.com" label="Instagram">
              <Instagram className="size-4" />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <Facebook className="size-4" />
            </SocialIcon>
            <SocialIcon href="https://wa.me/920000000000" label="WhatsApp">
              <MessageCircle className="size-4" />
            </SocialIcon>
          </div>
        </div>
      </div>
      <div className="border-t border-surface/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-[10px] uppercase tracking-widest text-surface/40 sm:flex-row lg:px-12">
          <p>© {new Date().getFullYear()} SKB Fashion. All rights reserved.</p>
          <p>Designed with care.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
        {title}
      </h4>
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          className="text-sm text-surface/70 transition-colors hover:text-gold"
        >
          {i.label}
        </a>
      ))}
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center border border-surface/20 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
