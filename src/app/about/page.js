import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>

      <Navbar />

      {/* Hero */}

      <section className="
      pt-32
      pb-20
      ">

        <div className="
        container-custom
        text-center
        ">

          <p className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          ">

            About Us

          </p>

          <h1 className="
          heading-xl
          mt-5
          ">

            More Than A Stay,
            A Feeling

          </h1>

          <p className="
          text-muted
          mt-8
          max-w-3xl
          mx-auto
          ">

            Calming Nook is a heritage-inspired
            homestay designed for travelers seeking
            peace, nature and meaningful experiences.

          </p>

        </div>

      </section>



      {/* Story */}

      <section className="section pt-0">

        <div className="
        container-custom
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-14
        items-center
        ">

          <div className="theme-card p-3">

            <Image
              src="/images/about/about1.jpg"
              width={700}
              height={700}
              alt="about"
              className="
              rounded-[24px]
              h-[350px]
              sm:h-[500px]
              object-cover
              w-full
              "
            />

          </div>


          <div>

            <h2 className="
            heading-lg
            ">

              Inspired By Slow Living

            </h2>

            <p className="
            text-muted
            mt-8
            ">

              We created Calming Nook with a simple idea:
              give people a place where they can disconnect
              from noise and reconnect with nature.

            </p>

            <p className="
            text-muted
            mt-6
            ">

              Every room, trail and experience is carefully
              designed to feel warm and memorable.

            </p>

          </div>

        </div>

      </section>



      {/* Stats */}

      <section className="section pt-0">

        <div className="
        container-custom
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-6
        ">

          <div className="
          theme-card
          p-8
          text-center
          ">

            <h2 className="
            text-4xl
            font-bold
            text-[var(--primary)]
            ">

              500+

            </h2>

            <p className="mt-3">

              Happy Guests

            </p>

          </div>



          <div className="
          theme-card
          p-8
          text-center
          ">

            <h2 className="
            text-4xl
            font-bold
            text-[var(--primary)]
            ">

              15+

            </h2>

            <p className="mt-3">

              Cozy Rooms

            </p>

          </div>



          <div className="
          theme-card
          p-8
          text-center
          ">

            <h2 className="
            text-4xl
            font-bold
            text-[var(--primary)]
            ">

              8+

            </h2>

            <p className="mt-3">

              Experiences

            </p>

          </div>



          <div className="
          theme-card
          p-8
          text-center
          ">

            <h2 className="
            text-4xl
            font-bold
            text-[var(--primary)]
            ">

              4.9★

            </h2>

            <p className="mt-3">

              Guest Rating

            </p>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}