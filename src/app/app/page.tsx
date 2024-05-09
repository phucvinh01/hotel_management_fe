
//'use client'
import TabHero from '@/components/shared/TabHero';
import { CarouselTrustBy } from '@/components/shared/CarouselTrustBy';
import BannerSection from '@/components/shared/BannerSection';
import Discovery from '@/components/shared/Discovery';
import DiscoveryHotel from '@/components/shared/DiscoveryHotel';
import ContactEmail from '@/components/shared/ContactEmail';
import CarouselVoucher from '@/components/shared/CarouselVoucher';
import TabsCarouselHotel from '@/components/shared/TabsCarouselHotel';

import { getHotelPage } from '@/service/hotel.service';
import SectionHero from '@/components/shared/sectionHero';
import BgGlassmorphism from '@/components/shared/BgGlassmorphism';
import SectionSliderNewCategories from '@/components/shared/SectionSliderNewCategories';
import { TaxonomyType } from '@/types';
import SectionOurFeatures from '@/components/shared/SectionOurFeatures';
import { CarouselCountry } from '@/components/shared/CarouselCountry';
import SectionBecomeAnAuthor from '@/components/shared/SectionBecomeAnAuthor';
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
      name: 'Nha Trang',
    },
    {
      id: 6,
      name: 'Phú Quốc',
    },
    {
      id: 7,
      name: 'Đà Nẵng',
    },
  ];
export default async function Home() {

  return (
   <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />

        {/* SECTION 1 */}

        <CarouselCountry/>

        <SectionOurFeatures />

        <TabsCarouselHotel title='Popular places to stay that Chisfis recommends for you'
          data={dataLocationList}
        />

        <SectionBecomeAnAuthor/>

        {/* <TabsCarouselHotel title='Popular places to stay that Chisfis recommends for you'  data={[]} /> */}

        {/* 


       
        <SectionHowItWork />

        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black/20" />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Đề xuất khám phá"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
          />
        </div> */}

        {/* <SectionSubscribe2 />

        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        <SectionGridCategoryBox />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
        />

        <SectionVideos />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> */}
      </div>
    </div>
  );
}
