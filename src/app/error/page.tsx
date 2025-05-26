'use client';

import React from 'react';

import ButtonLink from '@/components/commons/ButtonLink';

function ErrorPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-primary-dark">
        Oops! Something went wrong.
      </h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        We&apos;re sorry, but something went wrong. Please try again later.
      </p>
      <ButtonLink
        href="/"
        label="Take me back to home page"
        size="md"
        variant="primary"
        customClasses="mt-5"
      />
    </div>
  );
}

export default ErrorPage;
