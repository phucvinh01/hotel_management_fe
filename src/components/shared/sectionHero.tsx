import React, { FC } from "react";
import Image from "next/image";
import HeroSearchForm from "./form/Search/HeroSearchForm";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          {/* <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            Hotel
          </h2> */}
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            [VietNam Hotel Finder] - Khám phá Việt Nam một cách trọn vẹn!
          </span>
          <span>Xin chào! Chào mừng đến với VietNam Hotel Finder - trang web đặt phòng khách
            sạn uy tín và tiện lợi nhất ở Việt Nam.</span>

          <span>VietNam Hotel Finder là nền tảng đặt phòng trực tuyến cung cấp hàng ngàn lựa chọn khách
            sạn, resort và nhà nghỉ tại các điểm đến nổi tiếng khắp Việt Nam. Với giao diện dễ
            sử dụng và công cụ tìm kiếm thông minh, bạn có thể nhanh chóng tìm và đặt phòng ở
            những địa điểm yêu thích, từ Hà Nội, Hạ Long đến Đà Nẵng, Nha Trang hay Phú Quốc.
          </span>

          {/* <span>Đội ngũ chuyên gia của chúng tôi luôn cập nhật thông tin về các khách sạn,
            dịch vụ, giá cả và các chương trình ưu đãi mới nhất để mang đến cho bạn những trải
            nghiệm nghỉ dưỡng tuyệt vời nhất.</span> */}
          <span>Hãy khám phá những điểm đến tuyệt vời và tận hưởng
            kỳ nghỉ đáng nhớ tại Việt Nam cùng VietNam Hotel Finder!</span>
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={'/images/hero-right.png'} alt="hero" priority width={600} height={600} />
        </div>
      </div>

      {/* <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <HeroSearchForm />
      </div> */}
    </div>
  );
};

export default SectionHero;
