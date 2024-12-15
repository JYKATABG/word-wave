import Footer from '@/components/Footer';
import LastPosts from '@/components/LastPosts';
import Image from 'next/image';

export default async function Home() {

  return (
    <>
      <div className='flex flex-col gap-10 items-center justify-center py-[3em] w-full m-auto'>
        <div className='flex items-center justify-between w-[80%] bg-white rounded-xl px-4 shadow-xl'>
          <div className=''>
            <h1 className='text-[35px] font-bold max-w-[15em] mb-4'>
              Join the Biggest Forum — Find Topics That Matter to You!
            </h1>
            <p className='text-xl max-w-[30em]'>
              Discover or Create themes you love, chat with others, share ideas, ask questions, and help build a supportive community!
            </p>
          </div>
          <Image
            src={"/home-image.png"}
            width={500}
            height={500}
            alt='home-image'
          />
        </div>
        <hr className='border border-white w-[80%]' />
        <LastPosts />
      </div>
      <Footer />
    </>
  );
}
