import Link from "next/link";

export default function Footer() {
  return (
    <footer className="
    mt-10
    border-t
    border-black/10
    ">

      <div className="
      container-custom
      py-16
      ">

        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-10
        ">

          {/* brand */}

          <div>

            <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            tracking-[4px]
            text-[var(--primary)]
            ">

              CALMING NOOK

            </h2>

            <p className="
            text-muted
            mt-6
            ">

              A boutique homestay crafted
              for comfort, warmth and nature.

            </p>

          </div>


          {/* links */}

          <div>

            <h3 className="
            font-bold
            text-xl
            mb-6
            ">

              Explore

            </h3>

            <div className="
            flex
            flex-col
            gap-3
            ">

              <Link href="/">Home</Link>

              <Link href="/about">About</Link>

              <Link href="/rooms">Rooms</Link>

              <Link href="/gallery">Gallery</Link>

            </div>

          </div>


          {/* experiences */}

          <div>

            <h3 className="
            font-bold
            text-xl
            mb-6
            ">

              Experiences

            </h3>

            <div className="
            flex
            flex-col
            gap-3
            text-muted
            ">

              <p>Mountain Hike</p>
              <p>Camping</p>
              <p>Riverside Walk</p>
              <p>Temple Trail</p>

            </div>

          </div>


          {/* contact */}

          <div>

            <h3 className="
            font-bold
            text-xl
            mb-6
            ">

              Contact

            </h3>

            <div className="
            flex
            flex-col
            gap-3
            text-muted
            ">

              <p>+91 XXXXX XXXXX</p>

              <p>hello@calmingnook.com</p>

              <p>Uttarakhand, India</p>

            </div>

          </div>

        </div>


        <div className="
        border-t
        border-black/10
        mt-12
        pt-8
        text-center
        text-muted
        ">

          © 2026 Calming Nook · Crafted with care

        </div>

      </div>

    </footer>
  );
}