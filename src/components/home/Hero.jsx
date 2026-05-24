import Image from "next/image";

export default function Hero(){

return(

<section className="
min-h-screen
pt-28
lg:pt-15
flex
items-center
">

<div className="
container-custom
grid
grid-cols-1
lg:grid-cols-2
gap-10
items-center
">

<div>

<p className="
uppercase
tracking-[6px]
text-[var(--primary)]
">

Boutique Homestay

</p>


<h1 className="
heading-lg
mt-5
">

Escape Into Comfort & Slow Living

</h1>


<p className="
text-muted
mt-5
max-w-xl
">

Experience heritage warmth,
peaceful views and memorable stays.

</p>


<div className="
flex
flex-wrap
gap-4
mt-10
">

<button className="primary-btn">

Book Stay

</button>


<button className="secondary-btn">

Explore

</button>

</div>

</div>


<div className="
theme-card
p-3
">

<Image
src="/images/hero/hero.jpg"
width={800}
height={800}
alt="hero"
className="
w-full
h-[350px]
sm:h-[450px]
lg:h-[500px]
object-cover
rounded-[24px]
"
/>

</div>

</div>

</section>

)

}