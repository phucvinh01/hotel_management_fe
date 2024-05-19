
import TabsCarouselHotel from '@/components/shared/TabsCarouselHotel';

import SectionHero from '@/components/shared/sectionHero';
import BgGlassmorphism from '@/components/shared/BgGlassmorphism';
import SectionOurFeatures from '@/components/shared/SectionOurFeatures';
import { CarouselCountry } from '@/components/shared/CarouselCountry';
import SectionBecomeAnAuthor from '@/components/shared/SectionBecomeAnAuthor';
import { dataLocationList } from '@/constant';

export default async function About() {

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />


        <CarouselCountry />

        <SectionOurFeatures />

        <TabsCarouselHotel title='Nơi lưu trú nổi bật'
          data={dataLocationList}
        />

        <div className="relative py-16">
          <SectionBecomeAnAuthor />
        </div>


      </div>
    </div>
  );
}
