"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import BookingModal from "../home/BookingModel";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Rooms", link: "/rooms" },
    { title:"Experiences", link:"/experiences" },
    { title: "Gallery", link: "/gallery" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50">

        {/* Navbar Background */}
        <div className="bg-[var(--paper)] backdrop-blur-md border-b border-black/10 shadow-sm">

          <div className="container-custom h-[60px] flex items-center justify-between">

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
            >

              <Image
                src="/images/logo.png"
                alt="Calming Nook"
                width={50}
                height={50}
              
                priority
                className="object-contain rounded-sm"
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
                  className="text-sm transition duration-300 hover:text-[var(--primary)]"
                >
                  {item.title}
                </Link>

              ))}

            </div>



            {/* Right Side */}

            <div className="flex items-center gap-3">

              <button
                onClick={() => setOpenBooking(true)}
                className="hidden md:block primary-btn text-sm px-5 py-2"
              >
                Book Stay
              </button>

              <button
                className="md:hidden"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>

            </div>

          </div>

        </div>



        {/* Mobile Menu */}

        {open && (

          <div className="absolute top-[70px] left-4 right-4 md:hidden theme-card p-5 space-y-4">

            {navItems.map((item) => (

              <Link
                key={item.title}
                href={item.link}
                className="block py-2 border-b border-black/5"
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



      <BookingModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </>
  );
}