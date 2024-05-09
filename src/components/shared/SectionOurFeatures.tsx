import React, { FC } from "react";
import rightImgPng from "../../../public/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "./Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt={'rightImg'} width={750} height={650}/>
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          NHỮNG LỢI ÍCH
        </span>
        <h2 className="font-semibold text-4xl mt-5">Khám phá các thành phố</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Quảng cáo" />
            <span className="block text-xl font-semibold">
              Quảng cáo tiết kiệm chi phí
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
             Với danh sách miễn phí, bạn có thể quảng cáo cho thuê của mình mà không cần trả trước
               chi phí
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Phơi bày " />
            <span className="block text-xl font-semibold">
              Tiếp cận hàng triệu người với VietNam Venture
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
             Hàng triệu người đang tìm kiếm những địa điểm độc đáo để lưu trú xung quanh
               thế giới
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Chắc chắn" />
            <span className="block text-xl font-semibold">
              An toàn và đơn giản
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Danh sách Thư cho thuê Kỳ nghỉ cung cấp cho bạn một cách an toàn và dễ dàng để thực hiện
               đặt chỗ và thanh toán trực tuyến
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
