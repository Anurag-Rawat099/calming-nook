import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Images */}

        <div className="relative h-[400px] sm:h-[550px]">

          {/* Main Image */}

          <div className="theme-card absolute left-0 top-0 w-[80%] ">
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
          <p className="uppercase text-center tracking-[6px] text-(--primary) text-sm sm:text-left">
            About Calming Nook
          </p>

          <h2 className="heading-sm mt-5 text-center sm:text-left">
            A Heritage Stay Crafted For Peace
          </h2>

          <p
            className="
    text-muted
    mt-6
    leading-8
    "
          >
            Nestled amidst the serene hills of Uttarakhand,
            Calming Nook is more than just a place to stay—
            it is a destination where nature, comfort, and
            authentic mountain hospitality come together.
            Surrounded by lush forests, scenic valleys, and
            breathtaking Himalayan views, our homestay offers
            travelers an opportunity to slow down, unwind,
            and reconnect with what truly matters.
          </p>

          <p
            className=" text-muted mt-4 leading-8 " >Whether you're looking for a peaceful retreat,a family getaway, a romantic escape, or anadventure-filled vacation, Calming Nook providesthe perfect balance of relaxation and exploration.Wake up to birdsong, enjoy fresh mountain air,experience local culture, and create memoriesthat stay with you long after your journey ends. </p>




          {/* Stats */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="theme-card p-6 text-center">
              <h3 className="text-2xl font-bold text-(--primary)">
                10+
              </h3>

              <p className="mt-2 text-muted">
                Local Experiences
              </p>
            </div>

            <div className="theme-card p-6 text-center">
              <h3 className="text-2xl font-bold text-(--primary)">
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