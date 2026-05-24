import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import gallery from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main>

      <Navbar />

      {/* Hero */}

      <section className="pt-32 pb-20">

        <div className="
        container-custom
        text-center
        ">

          <p className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          ">

            Gallery

          </p>

          <h1 className="
          heading-xl
          mt-5
          ">

            Moments At Calming Nook

          </h1>

          <p className="
          text-muted
          mt-8
          max-w-3xl
          mx-auto
          ">

            Explore peaceful stays,
            scenic experiences and memorable moments.

          </p>

        </div>

      </section>


      {/* Masonry Grid */}

      <section className="section pt-0">

        <div className="container-custom">

          <div className="
          columns-1
          sm:columns-2
          lg:columns-3
          gap-6
          space-y-6
          ">

            {gallery.map((item)=>(

              <div
                key={item.id}
                className="
                theme-card
                overflow-hidden
                break-inside-avoid
                mb-6
                "
              >

                <div className="relative">

                  <Image
                    src={item.image}
                    width={300}
                    height={450}
                    alt={item.title}
                    className="
                    w-full
                    h-auto
                    object-cover
                    "
                  />

                </div>

                <div className="p-5">

                  <h3 className="
                  text-xl
                  font-bold
                  ">

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