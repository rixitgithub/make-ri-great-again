import Image from 'next/image';

import { RiCard } from '@/components/shared/RiCard/RiCard';
import { CircleCheck } from 'lucide-react';
import { RiAvatar } from '../../shared';

export const SideCard = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='relative flex flex-col gap-5'>
        <Image
          className='dark:block hidden position absolute -top-32 left-10 -z-40'
          src={'/assets/icons/auth/frame.svg'}
          alt='logo'
          width={535}
          height={535}
        />
        <Image
          className='dark:block hidden position absolute -top-10 -left-10 -z-50'
          src={'/assets/icons/auth/gradient.svg'}
          alt='logo'
          width={1200}
          height={1200}
        />
        <div className='flex items-center gap-2'>
          <CircleCheck className='text-green-500' />
          <p className='text-sm'>Land Emails in Inboxes, Not Spam!</p>
        </div>
        <h1 className='text-4xl font-bold'>
          10x your leads, meetings and deals.
        </h1>
      </div>
      <RiCard
        className={'dark:bg-linear-to-b from-neutral-700 to-neutral-900'}
        contentClassName={'pt-0'}
        header={
          <div>
            <div className='flex gap-2'>
              <RiAvatar
                src={'/assets/img/auth/card-img.png'}
                fallbackText={'RI'}
              />
              <div className='flex flex-col gap-1 text-sm'>
                <h1>Samantha Lee</h1>
                <p className='text-muted-foreground'>Product Manager</p>
              </div>
            </div>
          </div>
        }
      >
        <p className='text-xs mt-5'>
          {`"ReachInbox has revolutionized the way we do email outreach. Since we
          started using it, our response rates have doubled, and our team has
          been able to focus on creating meaningful conversations instead of
          managing multiple inboxes."`}
        </p>
      </RiCard>
    </div>
  );
};
