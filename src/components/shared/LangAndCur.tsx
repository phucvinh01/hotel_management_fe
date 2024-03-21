"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

type LangProps = {
    scroll : boolean
}

const LangAndCur = ({scroll}: LangProps) => {
  return (
    <NavigationMenu >
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuTrigger className={`${ scroll ? 'text-black' :'text-white'} bg-transparent hover:bg-[rgba(0,0,0,0.25)]  hover:text-white`} >VN | VND</NavigationMenuTrigger>
          <NavigationMenuContent >
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LangAndCur;
