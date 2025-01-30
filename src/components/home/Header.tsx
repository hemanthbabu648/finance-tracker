'use client'

import { features } from '@/constants/home'
import {
	Burger,
	Divider,
	SimpleGrid,
	ThemeIcon,
	UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import ButtonLink from '../commons/ButtonLink'
import HoverCard from '../commons/HoverCard'

const links = features.map((item) => (
	<UnstyledButton key={item.title}>
		<div className="flex-start flex flex-nowrap gap-x-2">
			<ThemeIcon size={34} variant="default" radius="md">
				<item.icon size={22} />
			</ThemeIcon>
			<div>
				<p className="font-medium">{item.title}</p>
				<p className="text-sm">{item.description}</p>
			</div>
		</div>
	</UnstyledButton>
))

const featuresCard = (colSpan: number = 2) => (
	<div>
		<div className="flex justify-between px-2">
			<p>Features</p>
			<Link href="/features" className="underline">
				View all
			</Link>
		</div>
		<Divider my="sm" />
		<SimpleGrid cols={colSpan} verticalSpacing={10}>
			{links}
		</SimpleGrid>
	</div>
)

const Header = () => {
	const [opened, { toggle }] = useDisclosure()
	return (
		<header className="h-16 py-2 shadow-sm">
			<nav className="mx-auto flex w-full items-center justify-between px-4 sm:max-w-7xl">
				{/* Brand Logo */}
				<div className="flex items-center gap-4 md:gap-20">
					<div className="flex items-center gap-2">
						<Image
							src="/logo.png"
							width={50}
							height={45}
							alt="radiantways logo"
							style={{ width: 'auto', height: '50px' }}
						/>
						<span className="whitespace-nowrap text-xl lg:text-2xl">
							Radiant Ways
						</span>
					</div>
				</div>
				{/* Navigation Links: from sm device onwards */}
				<div className="hidden sm:block">
					<ul className="flex list-none gap-x-2 text-base font-normal lg:gap-x-5">
						<li className="cursor-pointer rounded-md px-2 py-2 hover:bg-gray-100 lg:px-4">
							<Link href="/">Home</Link>
						</li>
						<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100">
							<HoverCard
								dropdownComponent={<div>{featuresCard()}</div>}
								position="bottom"
								radius="md"
								shadow="md"
								withinPortal
								width={600}
							>
								<p>
									Features <IconChevronDown size={16} className="inline" />
								</p>
							</HoverCard>
						</li>
						<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100">
							<Link href="/about">About</Link>
						</li>
						<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100">
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</div>
				{/* Menu: for mobile*/}
				<div className="sm:hidden">
					<Burger
						opened={opened}
						onClick={toggle}
						aria-label="Toggle navigation"
					/>
				</div>
				{/* Auth Buttons: from sm device onwards */}
				<div className="hidden sm:block">
					<ButtonLink
						label="Sign up"
						href="/auth/signup"
						size="md"
						variant="outline-primary"
					/>
				</div>
			</nav>
			{/* Navigation Links: for mobile*/}
			{opened && (
				<div className="absolute left-0 top-16 z-10 h-screen w-full bg-white md:hidden">
					<div className="flex flex-col items-center">
						<ul className="flex list-none flex-col items-center gap-y-4 text-base font-normal">
							<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100">
								<Link href="/">Home</Link>
							</li>
							<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100 ml-5">
								<HoverCard
									dropdownComponent={<div>{featuresCard(1)}</div>}
									position="bottom"
									radius="md"
									shadow="md"
									withinPortal
									width={300}
								>
									<p>
										Features <IconChevronDown size={16} className="inline" />
									</p>
								</HoverCard>
							</li>
							<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100">
								<Link href="/about">About</Link>
							</li>
							<li className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100">
								<Link href="/contact">Contact</Link>
							</li>
						</ul>
						<div className="mt-5">
							<ButtonLink
								label="Sign up"
								href="/auth/signup"
								size="md"
								variant="secondary"
							/>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
