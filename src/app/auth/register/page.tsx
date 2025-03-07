import { IconDownload } from '@tabler/icons-react';

import ButtonLink from '@/components/commons/ButtonLink';
import RegisterForm from '@/components/forms/RegisterForm';

function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <div className="w-full p-5 px-5 md:px-16 lg:w-5/12">
        <div className="-mb-1.5 flex items-center justify-center">
          <span className="rounded-full bg-gray-100 p-3">
            <IconDownload size={32} className="inline" />
          </span>
        </div>
        <RegisterForm />
      </div>
      <div
        className="flex w-full items-center justify-center bg-cover bg-center lg:w-7/12"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80)',
        }}
      >
        <div className="flex flex-col items-center justify-center gap-5 px-10 py-5">
          <p className="text-center text-2xl font-normal">
            Finomic is a key feature of the [Radiant Ways] platform, designed to
            simplify financial management. It provides users with smart tools
            for tracking expenses, managing budgets, and making informed
            financial decisions. With an intuitive interface and insightful
            analytics, Finomic helps individuals and businesses optimize their
            finances effortlessly. 🚀
          </p>
          <ButtonLink label="Explore know" href="https://www.radiantways.in/" />
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
