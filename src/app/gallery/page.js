import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import gallery from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main>

      <Navbar />

      {/* Hero */}

      <section className="pt-26 ">

        <div
          className="
          container-custom
          text-center
          "
        >

          <p
            className="
            uppercase
            tracking-[6px]
            text-3xl
            text-[var(--primary)]
            "
          >
            Gallery
          </p>

          <h1
            className="
            heading-lg
            mt-4
            "
          >
            Moments At Calming Nook
          </h1>

          <p
            className="
            text-muted
            mt-6
            max-w-2xl
            mx-auto
            "
          >
            Explore peaceful stays,
            scenic experiences and memorable moments.
          </p>

        </div>

      </section>



      {/* Gallery */}

      <section className="section pt-0 ">

        <div className="container-custom ">

          <div
            className="
            columns-1
            sm:columns-2
            lg:columns-3
            xl:columns-4

            gap-4
            space-y-4
           
            "
          >

            {gallery.map((item) => (

              <div
                key={item.id}
                className="
                theme-card
                overflow-hidden
                break-inside-avoid

                mb-4
                max-w-[300px]
                max-h-[330px]
                mx-auto

                hover:-translate-y-2
                transition-all
                duration-300
                "
              >

                <div className="relative">

                  <Image
                    src={item.image}
                    width={300}
                    height={280}
                    alt={item.title}
                    className="
                    w-full
                    h-auto
                    object-cover
                    "
                  />

                </div>


                <div className="p-4">

                  <h3
                    className="
                    text-center
                    font-semibold
                    "
                  >
                    {item.title}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}