import Header from '@/components/shared/Layout/Header';
import Hero from '@/components/shared/BgHero';
import TabHero from '@/components/shared/TabHero';
import { CarouselTrustBy } from '@/components/shared/CarouselTrustBy';
import BannerSection from '@/components/shared/BannerSection';
import Discovery from '@/components/shared/Discovery';
import DiscoveryHotel from '@/components/shared/DiscoveryHotel';
import ContactEmail from '@/components/shared/ContactEmail';
import Footer from '@/components/shared/Layout/Footer';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
  <Hero>
          <Header />
          <h2 className='text-center text-4xl font-bold text-white  py-3'>
            Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn
          </h2>

          <TabHero />
          <CarouselTrustBy />

          <section className='bg-white rounded-t-2xl container flex flex-col gap-10'>
            <BannerSection />
            <Discovery />
            <DiscoveryHotel />
          </section>
          <ContactEmail />
        <Footer />

        </Hero>
    </main>
  );
}
