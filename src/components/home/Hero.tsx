import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';

import ButtonLink from '../commons/ButtonLink';

function Hero() {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="text-center text-2xl font-normal md:text-start md:text-4xl md:leading-[50px]">
          Take Control of Your Financial Future
        </h1>
        <p className="mt-10 text-center text-lg leading-9 md:text-start">
          Track your spending, set savings goals, and plan for the future—all in
          one place. Our intuitive personal finance tracker helps you manage
          your money with ease, so you can make smarter financial decisions and
          achieve your goals faster.
        </p>
        <div className="mt-5 flex justify-center sm:justify-start">
          <ButtonLink
            label="Login"
            href="/auth/login"
            size="md"
            variant="primaryBlue"
            customClasses="w-36 text-center text-base font-medium tracking-wider"
            rightIcon={<IconChevronRight className="inline" size={20} />}
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image
          src="/hero.svg"
          width={750}
          height={45}
          alt="radiantways_logo"
          style={{ width: 'full', height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}

export default Hero;
