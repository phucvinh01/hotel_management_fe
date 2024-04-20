//'use client'
import TabHero from '@/components/shared/TabHero';
import { CarouselTrustBy } from '@/components/shared/CarouselTrustBy';
import BannerSection from '@/components/shared/BannerSection';
import Discovery from '@/components/shared/Discovery';
import DiscoveryHotel from '@/components/shared/DiscoveryHotel';
import ContactEmail from '@/components/shared/ContactEmail';
import Footer from '@/components/shared/Layout/Footer';
import CarouselVoucher from '@/components/shared/CarouselVoucher';
import CarouselHotelVietNam from '@/components/shared/CarouselHotelVietNam';
import TabsCarouselHotel from '@/components/shared/TabsCarouselHotel';

export default async function Home() {
  const dataLocationList = [
    {
      id: 1,
      name: 'Hồ Chí Minh',
    },
    {
      id: 2,
      name: 'Hà Nội',
    },
    {
      id: 3,
      name: 'Vũng Tàu',
    },
    {
      id: 4,
      name: 'Đà Lạt',
    },
    {
      id: 5,
      name: 'Nha Tran',
    },
    {
      id: 6,
      name: 'Phú Quốc',
    },
  ];

  const dataLocationListInternal = [
    {
      id: 1,
      name: 'Bangkok',
    },
    {
      id: 2,
      name: 'Seoul',
    },
    {
      id: 3,
      name: 'Tokyo',
    },
    {
      id: 4,
      name: 'Busan',
    },
    {
      id: 5,
      name: 'Bejing',
    },
    {
      id: 6,
      name: 'Bali',
    },
  ];
  return (
    <main className='flex flex-col'>
      <h2 className='text-center text-4xl font-bold text-white  py-3'>
        Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn
      </h2>
      <TabHero />
      <CarouselTrustBy />

      <section className='bg-white rounded-t-2xl container flex flex-col gap-10 pb-10'>
        <BannerSection />
        <Discovery />
        <DiscoveryHotel />
        <CarouselVoucher />
        <TabsCarouselHotel
          title='Vi Vu Gần Nhà'
          data={dataLocationList}
        />
        <TabsCarouselHotel
          title='Top khách sạn quốc tế'
          data={dataLocationListInternal}
        />
      </section>
      <ContactEmail />
    </main>
  );
}
