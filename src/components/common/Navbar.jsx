"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import BookingModal from "../home/BookingModel";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  // Prevent SSR/client mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Rooms", link: "/rooms" },
    { title: "Gallery", link: "/gallery" },
    { title: "Contact", link: "/contact" },
  ];

  if (!mounted) return null;

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        <div className="bg-white border-b border-black/10">
          <div
            className="
              container
              mx-auto
              px-4
              h-16
              flex
              items-center
              justify-between
            "
          >
            {/* Logo */}
           <Link
  href="/"
  className="
    flex
    items-center
    gap-3
  "
>
  <Image
    src="/images/logo.png"
    alt="Calming Nook Logo"
    width={45}
    height={45}
    className="object-contain"
  />

  <h1
    className="
      text-xl
      sm:text-2xl
      font-bold
      tracking-[4px]
      text-[var(--primary)]
    "
  >
    CALMING NOOK
  </h1>
</Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="
                    duration-300
                    hover:text-[var(--primary)]
                    hover:font-bold
                  "
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              {/* Desktop Button */}
              <button
                onClick={() => setOpenBooking(true)}
                className="hidden md:block primary-btn"
              >
                Book Stay
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setOpen((prev) => !prev)}
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="
              md:hidden
              theme-card
              m-4
              p-5
              space-y-5
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="block"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <button
              onClick={() => {
                setOpenBooking(true);
                setOpen(false);
              }}
              className="primary-btn w-full"
            >
              Book Stay
            </button>
          </div>
        )}
      </nav>

      {/* Modal only after client mounted */}
      {mounted && (
        <BookingModal
          open={openBooking}
          onClose={() => setOpenBooking(false)}
        />
      )}
    </>
  );
}