'use client'

import ButtonLink from '@/components/commons/ButtonLink';
import React from 'react'


function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto min-h-screen">
      <h1 className="text-2xl font-semibold text-primary-dark">
        Oops! Something went wrong.
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mt-2">
        We&apos;re sorry, but something went wrong. Please try again
        later.
      </p>
      <ButtonLink
        href='/'
        label='Take me back to home page'
        size='md'
        variant='primary'
        customClasses='mt-5'
      />
    </div>
  );
}

export default ErrorPage