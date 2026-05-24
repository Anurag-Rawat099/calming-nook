import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="section">

      <div className="
     
      container-custom
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-16
      items-center
      ">

        {/* Images */}

        <div className="
        relative
        h-[500px]
        sm:h-[600px]
        ">

<div className="
theme-card
absolute
left-0
top-0
w-[75%]
p-3
">

  <Image
    src="/images/about/about1.jpg"
    width={500}
    height={600}
    alt="about"
    className="
    rounded-[24px]
    h-[350px]
    sm:h-[450px]
    object-cover
    "
  />

</div>


<div className="
theme-card
absolute
bottom-0
right-0
w-[55%]
p-3
">

  <Image
    src="/images/about/about2.jpg"
    width={400}
    height={400}
    alt="room"
    className="
    rounded-[24px]
    h-[200px]
    sm:h-[260px]
    object-cover
    "
  />

</div>

        </div>


        {/* Content */}

        <div>

<p className="
uppercase
tracking-[6px]
text-[var(--primary)]
">

  About Calming Nook

</p>


<h2 className="
heading-lg
mt-5
">

  A Heritage Stay Crafted For Peace

</h2>


<p className="
text-muted
mt-8
">

  Hidden away from city life,
  Calming Nook combines warmth,
  heritage interiors and slow living.

</p>


<div className="
grid
grid-cols-2
gap-5
mt-10
">

  <div className="
  theme-card
  p-6
  text-center
  ">

    <h3 className="
    text-3xl
    font-bold
    text-[var(--primary)]
    ">

      15+

    </h3>

    <p className="mt-2 text-muted">

      Rooms

    </p>

  </div>


  <div className="
  theme-card
  p-6
  text-center
  ">

    <h3 className=" text-3xl font-bold text-[var(--primary)] ">

      500+

    </h3>

    <p className="mt-2 text-muted">

      Guests

    </p>

  </div>

</div>

        </div>

      </div>

    </section>
  );
}