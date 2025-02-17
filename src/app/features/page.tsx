import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { features } from "@/constants/data";
import { SimpleGrid, ThemeIcon } from "@mantine/core";

const renderFeatures = features.map((feature) => (
    <div key={feature.title}>
        <ThemeIcon variant="light" size={40} radius={40}>
            <feature.icon size={18} stroke={1.5} />
        </ThemeIcon>
        <p>
            {feature.title}
        </p>
        <p>
            {feature.description}
        </p>
    </div>
))

export default function FeaturesPage() {

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Header />
            <main className="max-w-7xl mx-auto my-5 px-4 text-center">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">Explore Powerful Features for Smarter Financial Management</h1>
                <p className="text-base md:text-lg lg:text-xl">
                    Discover how our intuitive tools help you track spending, set goals, and make confident financial decisions—all in one place.
                </p>
                <p className="hidden lg:block py-10 lg:mt-5">
                    Track your spending, set savings goals, and plan for the future—all in one place. Our intuitive personal finance tracker helps you manage your money with ease, so you can make smarter financial decisions and achieve your goals faster.
                </p>
                <div className="mt-10 sm:mt-20 lg:mt-30">
                    <SimpleGrid

                        cols={{ base: 1, sm: 2, md: 3 }}
                        spacing={{ base: 'xl', md: 50 }}
                        verticalSpacing={{ base: 'xl', md: 50 }}
                    >
                        {renderFeatures}
                    </SimpleGrid>
                </div>

            </main>
            <Footer />
        </div>
    )
}