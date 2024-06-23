'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabAnaLysis from '../_components/tab-analysis';
import { MainNav } from '../_components/main-nav';
import { UserNav } from '../_components/user-nav';

const AnalysisPage = () => {
  return (
    <div className='hidden flex-col md:flex'>
       <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Tabs
          defaultValue='overview'
          className='space-y-4'>
          <TabsList>
            <TabsTrigger
              className='data-[state=active]:border-white data-[state=active]:bg-black data-[state=active]:text-white'
              value='overview'>
              Phân tích
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='overview'
            className='space-y-4'>
            <TabAnaLysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisPage;
