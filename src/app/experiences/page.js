import Image from "next/image";
import experiences from "@/data/experiences";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function ExperiencesPage() {
  return (
    <main>
       <Navbar/>
      {/* Compact Hero */}

      <section className="relative h-[35vh] min-h-[260px] mt-10 overflow-hidden">

        <Image
          src="/uploads/experiences/hiking.jpg"
          alt="Experiences"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">

          <div>

            <p className="uppercase tracking-[4px] text-white/80 text-lg">
              Explore Beyond Stay
            </p>

            <h1 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Experiences
            </h1>
             <p className="text-white mt-4 leading-7">
            Hiking trails, mountain views, camping,
            riverside walks and peaceful local experiences.
          </p>

          </div>

        </div>

      </section>






      {/* Compact Cards */}

      <section className="pb-8 pt-8">

        <div className="container-custom">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            {experiences.map((item) => (

              <div
                key={item.id}
                className="theme-card overflow-hidden group"
              >

                <div className="relative h-[130px] sm:h-[160px] overflow-hidden">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 duration-500"
                  />

                </div>

                <div className="p-4">

                  <div className="flex gap-2 flex-wrap mb-3">

                    <span className="px-2 py-1 rounded-full bg-[var(--paper-dark)] text-[11px]">
                      {item.duration}
                    </span>

                    <span className="px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[11px]">
                      {item.level}
                    </span>

                  </div>

                  <h3 className="font-bold text-sm sm:text-base">
                    {item.title}
                  </h3>

                  <p className="text-muted text-xs mt-2 line-clamp-2">
                    {item.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
      <Footer/>

    </main>
    
  );
}