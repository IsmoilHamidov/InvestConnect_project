import { BedIcon, RectangleHorizontalIcon, WashingMachine } from 'lucide-react';

const UnitCard = () => {
  return (
    <div className='p-2 pb-10 border-2 border-muted-foreground grid justify-items-center gap-4'>
      <img src="https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg" alt="" />
      <h3 className='text-xl text-center'>Prachtig en lichtrijk gelijkvloers appartement!</h3>
      <span>Leiestraat 10, 8930 Menen Lauwe</span>
      <div className='flex justify-around gap-14'>
        <div className='grid justify-items-center'>
          <RectangleHorizontalIcon className='text-primary scale-110'/>
          <span className='text-xl'>2</span>
          <span className='text-muted-foreground'>m2</span>
        </div>
        <div className='grid justify-items-center'>
          <BedIcon  className='text-primary scale-110'/>
          <span className='text-xl'>2</span>
          <span className='text-muted-foreground'>Slaapkamers</span>
        </div>
        <div className='grid justify-items-center'>
          <WashingMachine className='text-primary  scale-110' />
          <span className='text-xl'>2</span>
          <span className='text-muted-foreground'>Badkamers</span>
        </div>

      </div>
    </div>
  );
};

export default UnitCard;