import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />
      <main className="mx-auto my-5 max-w-7xl px-4">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
