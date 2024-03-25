import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const listContryImg = [
    {
        "id": 1,
        "url":"/country/cannang.webp"
    },
    {
        "id": 2,
        "url":"/country/seoul.webp"
    },
    {
        "id": 3,
        "url":"/country/busan.webp"
    },
    {
        "id": 4,
        "url":"/country/Tokyo.webp"
    },
    {
        "id": 5,
        "url":"/country/osaka.webp"
    },
    {
        "id": 6,
        "url":"/country/taipie.webp"
    },
    {
        "id": 7,
        "url":"/country/shanghai.webp"
    },
    {
        "id": 8,
        "url":"/country/hongkong.webp"
    },
    {
        "id": 9,
        "url":"/country/khaohsung.webp"
    },
     {
        "id": 10,
        "url":"/country/bengji.webp"
    },
]

export function CarouselCountry() {
  return (
    <Carousel className="w-full px-3">
      <CarouselContent className="">
        {listContryImg.map((item) => (
          <CarouselItem key={item.id} className="basis-1/4">
              <Image src={item.url} alt={item.url} width={300} height={120}objectFit="cover" className="rounded-xl"/>
          </CarouselItem>
        ))}
      </CarouselContent >
      <CarouselPrevious className="ml-10"/>
      <CarouselNext className="mr-10"/>
    </Carousel>
  )
}
