"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BookingModal from "../home/BookingModel";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [openBooking, setOpenBooking] =
    useState(false);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Rooms", link: "/rooms" },
    { title: "Gallery", link: "/gallery" },
    { title: "Contact", link: "/contact" },
  ];

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
            <Link href="/">
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
                  href={item.link}
                  key={item.title}
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
                onClick={() =>
                  setOpenBooking(true)
                }
                className="hidden md:block primary-btn"
              >
                Book Stay
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() =>
                  setOpen(!open)
                }
              >
                {open ? <X /> : <Menu />}
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
                href={item.link}
                key={item.title}
                className="block"
                onClick={() =>
                  setOpen(false)
                }
              >
                {item.title}
              </Link>
            ))}

            {/* Mobile Button */}
            <button
              onClick={() => {
                setOpenBooking(true);
                setOpen(false);
              }}
              className="
              primary-btn
              w-full
            "
            >
              Book Stay
            </button>
          </div>
        )}
      </nav>

      {/* Booking Modal */}
      <BookingModal
        open={openBooking}
        onClose={() =>
          setOpenBooking(false)
        }
      />
    </>
  );
}