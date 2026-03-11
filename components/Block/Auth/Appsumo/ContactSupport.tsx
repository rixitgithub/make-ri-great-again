import { ModalWrapper } from '@/components/shared/Modal/ModalWrapper';
import { RiCard } from '@/components/shared/RiCard/RiCard';
import { Button } from '@/components/ui/button';
import { PATH } from '@/utils/constants/others/paths';
import Link from 'next/link';

export const ContactSupport = () => {
  return (
    <ModalWrapper>
      <RiCard
        header={
          <div className='text-xl font-semibold'>
            <h1>Account already exists</h1>
          </div>
        }
        className={'max-w-lg'}
      >
        <div className='flex w-full flex-col gap-5 mt-5'>
          <p className='text-sm'>
            Account you are trying to create already exists. Please contact
            support or sign in.
          </p>
          <div className='flex w-full justify-end gap-5'>
            <Button asChild variant='outline'>
              <Link href={PATH.SIGNIN}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href={PATH.HELP_CENTER}>Contact Support</Link>
            </Button>
          </div>
        </div>
      </RiCard>
    </ModalWrapper>
  );
};
