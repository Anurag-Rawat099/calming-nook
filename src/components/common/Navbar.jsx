"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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

      {/* Navbar Background */}

      <div className="bg-[var(--paper)] border-b border-black/10 shadow-sm">

        <div className="container-custom h-[60px] flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="Calming Nook"
              width={45}
              height={45}
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

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-7">

            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="
                text-sm
                transition-all
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
              className="hidden md:block primary-btn text-sm px-5 py-2"
            >
              Book Stay
            </Link>

            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
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
          top-[70px]
          left-4
          right-4
          md:hidden
          theme-card
          p-5
          space-y-4
          "
        >

          {navItems.map((item) => (

            <Link
              key={item.title}
              href={item.link}
              onClick={() => setOpen(false)}
              className="
              block
              py-2
              border-b
              border-black/5
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
            w-full
            text-center
            block
            "
          >
            Book Stay
          </Link>

        </div>

      )}

    </nav>
  );
}