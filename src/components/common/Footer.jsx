import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-6 border-t border-black/10">
      <div className="container-custom pt-2 pb-2">

        <div className="grid lg:grid-cols-4 gap-4">

          {/* LEFT : Branding (1 col) */}
          <div className="lg:col-span-1">

            <h2
              className="
              text-2xl
              sm:text-3xl
              font-bold
              tracking-[4px]
              text-[var(--primary)]
            "
            >
              CALMING NOOK
            </h2>

            <p className="text-muted mt-6 leading-7">
              A boutique homestay crafted
              for comfort, warmth, and nature.
            </p>

          </div>

          {/* Empty Spacer (1 col) */}
          <div className="hidden lg:block"></div>

          {/* RIGHT : Links Area (2 cols) */}
          <div className="lg:col-span-2">

            <div className="grid sm:grid-cols-3 gap-3">

              {/* Explore */}
              <div>

                <h3
                  className="
                  font-bold
                  text-xl
                  mb-2
                "
                >
                  Explore
                </h3>

                <div className="flex flex-col gap-1 text-muted">

                  <Link href="/">Home</Link>

                  <Link href="/about">About</Link>

                  <Link href="/rooms">Rooms</Link>

                  <Link href="/gallery">Gallery</Link>

                </div>

              </div>

              {/* Experiences */}
              <div>

                <h3
                  className="
                  font-bold
                  text-xl
                  mb-2
                "
                >
                  Experiences
                </h3>

                <div className="flex flex-col gap-1 text-muted">

                  <p>Mountain Hike</p>

                  <p>Camping</p>

                  <p>Riverside Walk</p>

                  <p>Temple Trail</p>

                </div>

              </div>

              {/* Contact */}
              <div>

                <h3
                  className="
                  font-bold
                  text-xl
                  mb-2
                "
                >
                  Contact
                </h3>

                <div className="flex flex-col gap-1 text-muted">

                  <p>+91 XXXXX XXXXX</p>

                  <p>hello@calmingnook.com</p>

                  <p>Uttarakhand, India</p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div
          className="
          border-t
          border-black/10
          mt-2
          pt-2
          text-center
          text-muted
        "
        >
          © 2026 Calming Nook · Crafted with care
        </div>

      </div>
    </footer>
  );
}