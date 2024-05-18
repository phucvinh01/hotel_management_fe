import React, { FC } from "react";
import rightImgDemo from "../../../public/hotel/saigon19052024_01.jpg";
import Image from "next/image";
import Logo from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo />
        <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
          Tại sao bạn chọn chúng tôi?
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Đồng hành cùng chúng tôi, bạn sẽ có một chuyến đi đầy trải nghiệm. Với VietNam Hotel Finder,
          đặt chỗ ở, biệt thự nghỉ dưỡng, khách sạn, nhà riêng,
          căn hộ...trở nên nhanh chóng, thuận tiện và dễ dàng.
        </span>
        <Button asChild className="bg-cyan-500 px-4 py-3 font-semibold rounded-3xl mt-6 sm:mt-11">
          <Link href={'/app/partner'} >
            Hợp tác với chúng tôi
          </Link>
        </Button>
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} className="rounded-md shadow-lg shadow-cyan-500" />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
