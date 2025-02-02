import ButtonLink from '@/components/commons/ButtonLink'
import RegisterForm from '@/components/forms/RegisterForm'
import { IconDownload } from '@tabler/icons-react'

function RegisterPage() {
    return (
        <main className="min-h-screen flex flex-col lg:flex-row">
            <div className="w-full lg:w-5/12 p-5 px-5 md:px-16">
                <div className="flex justify-center items-center -mb-1.5">
                    <span className="bg-gray-100 p-3 rounded-full">
                        <IconDownload size={32} className='inline' />
                    </span>
                </div>
                <RegisterForm />
            </div>
            <div
                className="bg-cover bg-center w-full lg:w-7/12 flex  justify-center items-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80)",
                }}
            >
                <div className="flex flex-col justify-center items-center gap-5 px-10 py-5">
                    <p className="text-2xl font-normal text-center">
                        It&apos;s a unified platform that combines all Radiant Ways
                        features, offering a seamless experience across various domains like
                        IT, finance, education, and lifestyle.
                    </p>
                    <ButtonLink
                        label='Explore know'
                        href="https://www.radiantways.in/"
                    />
                </div>
            </div>
        </main>
    )
}

export default RegisterPage