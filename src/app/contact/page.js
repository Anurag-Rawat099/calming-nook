import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingForm from "@/components/contact/BookingForm";

export default function ContactPage() {
  return (
    <main>

      <Navbar />

      {/* Hero */}
      <section className="pt-22 pb-10">

        <div
          className="
          container
          mx-auto
          px-4
          text-center
        "
        >

          <p
            className="
            uppercase
            tracking-[6px]
            text-2xl
            sm:text-3xl
            text-[var(--primary)]
          "
          >
            Contact Us
          </p>

          <h1
            className="
            heading-lg
            
          "
          >
            Plan Your Stay
          </h1>

          <p
            className="
            text-gray-500
            max-w-3xl
            mx-auto
            leading-8
          "
          >
            Reach out for bookings, questions, experiences,
            or simply to know more about Calming Nook.
          </p>

        </div>

      </section>

      <BookingForm />

      <Footer />

    </main>
  );
}