import { ActionIcon } from '@mantine/core'
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'



const Footer = () => {
    return (
        <footer className='w-full'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto border-t border-gray-300 py-2 px-4'>
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        width={50}
                        height={40}
                        alt="radiantways logo"
                        style={{ width: "auto", height: "40px" }}
                    />
                    <span className="text-lg sm:text-xl whitespace-nowrap">Radiant Ways</span>
                </div>
                <p className='text-sm sm:text-base text-center font-normal'>
                    &copy; 2025 Radiant Ways. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    <ActionIcon size="lg" variant="default" radius="xl" className='hover:bg-primary-blue-light hover:text-white'>
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl" className='hover:bg-primary-blue-light hover:text-white'>
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl" className='hover:bg-primary-blue-light hover:text-white'>
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </div>
            </div>
        </footer>
    )
}

export default Footer