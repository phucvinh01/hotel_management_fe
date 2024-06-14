import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { IListComment } from '@/service/_comment.service';
import Image from 'next/image';

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`}>⭐</span>
      ))}
    </>
  );
};

function splitImageUrls(imageUrls: string | null): string[] {
  if (!imageUrls) {
    return [];
  }
  return imageUrls.split(';').filter(url => url.trim() !== '');
}


interface MailDisplayProps {
  comment: IListComment | null;
}

export function CommentDisplay({ comment }: MailDisplayProps) {
  const defaultImage = 'public/images/default_image.jpg'; 

  return (
    <div className='flex h-full flex-col w-full'>
      {comment ? (
        <div className='flex flex-1 flex-col p-5 border rounded-3xl w-full'>
          <div className='flex items-start p-4'>
            <div className='flex items-start gap-4 text-base'>
              <div className='grid gap-1'>
                <div className='font-semibold'>{comment.customer_name}</div>
                <div className='line-clamp-1 text-xs'>
                  {comment.customer_email}
                </div>
              </div>
            </div>
            {comment.created_at && (
              <div className='ml-auto text-xs text-muted-foreground'>
                {format(new Date(comment.created_at), 'PPpp')}
              </div>
            )}
          </div>
          <Separator />
          <div className='whitespace-pre-wrap p-4 text-base'>
            {comment.description}
          </div>
          <div className='whitespace-pre-wrap p-4 text-base'>
            {splitImageUrls(comment.images).map((item,index) => <div key={index}>
          <Image
            src={item}
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImage;
            }}
            alt={`Image ${index + 1}`}
            width={100}
            height={100}
            style={{ width: '100px', height: '100px' }} 
          />
        </div>)}
          </div>
          <div className='flex gap-10 flex-col whitespace-pre-wrap p-4 text-base '>
            <div className='grid grid-cols-12 gap-5'>
              <span className='font-bold col-span-6'>🛋️ Độ sạch sẽ </span>{' '}
              <span className=' col-span-6'>
                {renderStars(comment.rate_clean)}
              </span>
            </div>
            <div className='grid grid-cols-12 gap-5'>
              <span className='font-bold col-span-6'>🥰 Độ thoải mái </span>{' '}
              <span className=' col-span-6'>
                {renderStars(comment.rate_comfortable)}
              </span>
            </div>
            <div className='grid grid-cols-12 gap-5'>
              <span className='font-bold col-span-6'>🛎️ Sự phục vụ </span>{' '}
              <span className=' col-span-6'>
                {renderStars(comment.rate_service)}
              </span>
            </div>
          </div>
          <Separator className='mt-auto' />
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground'>
          No message selected
        </div>
      )}
    </div>
  );
}
