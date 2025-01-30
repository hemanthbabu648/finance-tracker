import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header/>
      <main className="max-w-7xl mx-auto my-5 px-4">
        <Hero/>
      </main>
      <Footer/>
    </div>
  );
}
