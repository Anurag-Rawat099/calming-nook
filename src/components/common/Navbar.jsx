"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Experiences", link: "/experiences" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      {/* Background */}

      <div className="bg-[var(--paper)] border-b border-black/10 shadow-sm">

        <div className="container-custom h-[60px] flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="Calming Nook"
              width={44}
              height={44}
              priority
              className="rounded-md object-cover"
            />

            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-[2px] text-[var(--primary)]">
                CALMING NOOK
              </h1>

              <p className="text-[10px] text-muted leading-none">
                Boutique Homestay
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center gap-8">

            {navItems.map((item) => (

              <Link
                key={item.title}
                href={item.link}
                className="
                text-sm
                font-medium
                transition-colors
                duration-300
                hover:text-[var(--primary)]
                "
              >
                {item.title}
              </Link>

            ))}

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            <Link
              href="/contact"
              className="hidden md:inline-flex primary-btn text-sm px-5 py-2"
            >
              Book Stay
            </Link>

            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setOpen((prev) => !prev)}
              className="
              md:hidden
              p-2
              rounded-md
              active:scale-95
              transition
              "
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div
          className="
          absolute
          top-[60px]
          left-4
          right-4
          z-50
          md:hidden
          theme-card
          rounded-2xl
          p-5
          shadow-xl
          "
        >

          <div className="flex flex-col">

            {navItems.map((item) => (

              <Link
                key={item.title}
                href={item.link}
                onClick={() => setOpen(false)}
                className="
                py-3
                border-b
                border-black/5
                text-sm
                font-medium
                transition-colors
                hover:text-[var(--primary)]
                "
              >
                {item.title}
              </Link>

            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="
              primary-btn
              mt-5
              text-center
              w-full
              "
            >
              Book Stay
            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}