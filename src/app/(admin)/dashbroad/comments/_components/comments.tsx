'use client';
import * as React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { IListComment } from '@/service/_comment.service';
import { useComment } from '../useComment';
import { CommentList } from './comment-list';
import { CommentDisplay } from './comment-display';
import Loader from '@/components/admin/common/Loader';
import { useAuth } from '@/hooks/useAuthContext';
import { useGetListComment } from '@/service/query.service';

interface CommentProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Comments({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: CommentProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useComment();
  const { admin } = useAuth();
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetListComment(admin?.id_hotel as string);
  if (isLoading) return <Loader />;
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className='h-full max-h-[800px] items-stretch'>
        <ResizablePanel
          defaultSize={440}
          minSize={30}>
          <Tabs defaultValue='all'>
            <div className='flex items-center px-4 py-2'>
              <TabsList className='ml-auto'>
                <TabsTrigger
                  value='all'
                  className='text-zinc-600 dark:text-zinc-200'>
                  Tất cả ⭐
                </TabsTrigger>
                <TabsTrigger
                  value='five'
                  className='text-zinc-600 dark:text-zinc-200'>
                  5 ⭐
                </TabsTrigger>
                <TabsTrigger
                  value='four'
                  className='text-zinc-600 dark:text-zinc-200'>
                  4 ⭐
                </TabsTrigger>
                <TabsTrigger
                  value='three'
                  className='text-zinc-600 dark:text-zinc-200'>
                  3 ⭐
                </TabsTrigger>
                <TabsTrigger
                  value='two'
                  className='text-zinc-600 dark:text-zinc-200'>
                  2 ⭐
                </TabsTrigger>
                <TabsTrigger
                  value='one'
                  className='text-zinc-600 dark:text-zinc-200'>
                  1 ⭐
                </TabsTrigger>
              </TabsList>
            </div>
            {comments && comments.length > 0 && (
              <>
                <TabsContent
                  value='all'
                  className='m-0'>
                  <CommentList items={comments} />
                </TabsContent>
                <TabsContent
                  value='five'
                  className='m-0'>
                  <CommentList
                    items={comments.filter((item) => item.rate === 5)}
                  />
                </TabsContent>
                <TabsContent
                  value='four'
                  className='m-0'>
                  <CommentList
                    items={comments.filter((item) => item.rate === 4)}
                  />
                </TabsContent>
                <TabsContent
                  value='three'
                  className='m-0'>
                  <CommentList
                    items={comments.filter((item) => item.rate === 3)}
                  />
                </TabsContent>
                <TabsContent
                  value='two'
                  className='m-0'>
                  <CommentList
                    items={comments.filter((item) => item.rate === 2)}
                  />
                </TabsContent>
                <TabsContent
                  value='one'
                  className='m-0'>
                  <CommentList
                    items={comments.filter((item) => item.rate === 1)}
                  />
                </TabsContent>
              </>
            )}
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={440}>
          {comments && comments.length > 0 && (
            <CommentDisplay
              comment={
                comments.find((item) => item.id === mail.selected) || null
              }
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
