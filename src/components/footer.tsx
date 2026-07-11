import { Facebook, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <span className="font-serif text-2xl">
            SKB <span className="text-gold">Fashion</span>
          </span>
          <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-surface/60">
            A Karachi boutique for beautifully crafted ladies suits — embroidered,
            lawn, chiffon, bridal and unstitched.
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
          title="Visit & Contact"
          items={[
            {
              label: "Saima Pari Mall, Hyderi",
              href: "https://www.google.com/maps/search/?api=1&query=SKB+Fashion+Saima+Pari+Mall+Hyderi+Karachi",
            },
            { label: "+92 316 2723318", href: "tel:+923162723318" },
            { label: "WhatsApp", href: "https://wa.me/923162723318" },
          ]}
        />
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
            Hours
          </h4>
          <p className="text-sm text-surface/60">Open Daily</p>
          <p className="text-sm text-surface/60">11:00 AM – 10:00 PM</p>
          <div className="mt-4 flex gap-3">
            <SocialIcon href="https://instagram.com" label="Instagram">
              <Instagram className="h-5 w-5 text-gold" />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <Facebook className="h-5 w-5 text-gold" />
            </SocialIcon>
            <SocialIcon href="https://wa.me/923162723318" label="WhatsApp">
              <MessageCircle className="h-5 w-5 text-gold" />
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
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-sm text-surface/70 transition-colors hover:text-gold"
        >
          {item.label}
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
      className="group grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm transition duration-200 hover:scale-105 hover:bg-ink hover:text-surface"
    >
      {children}
    </a>
  );
}
