import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Images */}

        <div className="relative h-[450px] sm:h-[550px]">
          
          {/* Main Image */}

          <div className="theme-card absolute left-0 top-0 w-[65%] ">
            <Image
              src="/images/about/aboutpreview.png"
              width={500}
              height={500}
              alt="About Calming Nook"
              className="w-full h-[320px] sm:h-[450px] object-cover"
              priority
            />
          </div>

          {/* Small Image */}

          <div className="theme-card absolute bottom-0 right-0 w-[45%]">
            <Image
              src="/images/about/aboutpreview2.png"
              width={400}
              height={400}
              alt="Room Interior"
              className="w-full h-[180px] sm:h-[250px] object-cover"
            />
          </div>
        </div>

        {/* Content */}

        <div>
          <p className="uppercase tracking-[6px] text-(--primary) text-sm">
            About Calming Nook
          </p>

          <h2 className="heading-lg mt-5">
            A Heritage Stay Crafted For Peace
          </h2>

          <p className="text-muted mt-8 leading-relaxed">
            Hidden away from the noise of city life,
            Calming Nook blends peaceful living,
            warm hospitality, and heritage-inspired
            interiors to create a slow and soulful
            mountain stay experience.
          </p>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-5 mt-10">
            
            <div className="theme-card p-6 text-center">
              <h3 className="text-3xl font-bold text-(--primary)">
                15+
              </h3>

              <p className="mt-2 text-muted">
                Luxury Rooms
              </p>
            </div>

            <div className="theme-card p-6 text-center">
              <h3 className="text-3xl font-bold text-(--primary)">
                500+
              </h3>

              <p className="mt-2 text-muted">
                Happy Guests
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}