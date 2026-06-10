import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>

      <Navbar />

      {/* HERO */}

      <section className="pt-24 pb-14">

        <div className="container-custom">

          <div className="text-center max-w-3xl mx-auto">

            <p
              className="
              uppercase
              tracking-[6px]
              text-[var(--primary)]
              text-md
              "
            >
              About Calming Nook
            </p>

            <h1
              className="
              text-3xl
              md:text-3xl
              font-bold
              mt-4
              "
            >
              More Than A Stay,
              A Mountain Experience
            </h1>

            <p
              className="
              text-muted
              mt-5
              leading-8
              "
            >
              Nestled in the peaceful hills of Uttarakhand,
              Calming Nook offers guests a perfect blend of
              comfort, nature and authentic mountain hospitality.
            </p>

          </div>

        </div>

      </section>



      {/* STORY */}

      <section className="pb-20">

        <div
          className="
          container-custom
          grid
          lg:grid-cols-2
          gap-12
          items-center
          "
        >

          <div className="theme-card overflow-hidden">

            <Image
              src="/images/about/aboutpreview.png"
              alt="Calming Nook"
              width={800}
              height={600}
              className="
              w-full
              h-[350px]
              md:h-[450px]
              object-cover
              "
            />

          </div>

          <div>

            <p
              className="
              uppercase
              tracking-[4px]
              text-[var(--primary)]
              text-sm
              "
            >
              Our Story
            </p>

            <h2
              className="
              text-3xl
              md:text-4xl
              
              mt-3
              "
            >
              Inspired By Slow Living
            </h2>

           <p
  className="
  text-muted
  mt-6
  leading-8
  "
>
  Calming Nook was born from a simple vision—to create
  a peaceful retreat where travelers can escape the
  noise of everyday life and reconnect with nature.
  Surrounded by the breathtaking beauty of Uttarakhand,
  our homestay offers an environment where guests can
  slow down, breathe fresh mountain air, and experience
  the calmness that only the hills can provide.

  <br />
  <br />

 
</p>

<p
  className="
  text-muted
  mt-4
  leading-8
  "
>
  

  

  We believe that true hospitality goes beyond providing
  accommodation—it is about creating meaningful connections,
  sharing local culture, and making every guest feel at
  home. Our goal is for every visitor to leave with
  beautiful memories, a refreshed mind, and a desire to
  return to the peaceful charm of Calming Nook.
</p>

          </div>

        </div>

      </section>



      {/* FOUNDER */}

      <section className="pb-20">

        <div
          className="
          container-custom
          grid
          lg:grid-cols-[320px_1fr]
          gap-10
          items-center
          "
        >

          <div className="theme-card overflow-hidden">

            <Image
              src="/images/about/Founder.jpg"
              alt="Founder"
              width={400}
              height={500}
              className="
              w-full
              h-[380px]
              object-cover
              "
            />

          </div>

          <div>

            <p
              className="
              uppercase
              tracking-[4px]
              text-[var(--primary)]
              text-sm
              "
            >
              Meet Your Host
            </p>

            <h2
              className="
              text-3xl
            
              mt-3
              "
            >
              Hospitality From The Heart
            </h2>

            <p
              className="
              text-muted
              mt-5
              leading-8
              "
            >
              Calming Nook is more than a business—
              it is a dream built with passion for
              hosting travelers and sharing the beauty
              of Uttarakhand.
            </p>

            <p
              className="
              text-muted
              mt-4
              leading-8
              "
            >
              We believe every guest deserves genuine
              hospitality, local experiences and a stay
              that creates unforgettable memories.
            </p>

            <div
              className="
              mt-6
              border-l-4
              border-[var(--primary)]
              pl-4
              "
            >

              <h3 className="font-bold text-xl">
                Mr. Panwar
              </h3>

              <p className="text-muted">
                Founder & Host
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* WHY CHOOSE US */}

      <section className="pb-20">

        <div className="container-custom">

          <div className="text-center">

            <p
              className="
              uppercase
              tracking-[4px]
              text-[var(--primary)]
              text-sm
              "
            >
              Why Choose Us
            </p>

            <h2
              className="
              text-3xl
              md:text-4xl
          
              mt-3
              "
            >
              Designed For Relaxation
            </h2>

          </div>

          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            mt-12
            "
          >

            <FeatureCard
              title="Mountain Views"
              desc="Wake up to breathtaking Himalayan landscapes."
            />

            <FeatureCard
              title="Cozy Rooms"
              desc="Comfortable rooms designed for peaceful stays."
            />

            <FeatureCard
              title="Local Experiences"
              desc="Trekking, camping, sightseeing and more."
            />

            <FeatureCard
              title="Warm Hospitality"
              desc="Feel at home with personalized care."
            />

          </div>

        </div>

      </section>



      {/* STATS */}


      <Footer />

    </main>
  );
}



function FeatureCard({
  title,
  desc
}) {
  return (
    <div
      className="
      theme-card
      p-6
      text-center
      "
    >

      <h3
        className="
        font-bold
        text-lg
        "
      >
        {title}
      </h3>

      <p
        className="
        text-muted
        text-sm
        mt-3
        "
      >
        {desc}
      </p>

    </div>
  );
}



