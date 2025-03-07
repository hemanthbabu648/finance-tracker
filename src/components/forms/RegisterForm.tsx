'use client';

import { Group, Progress } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { showErrorToast, showSuccessToast } from '@/lib/reactToasts';
import { signup } from '@/serverActions/auth';

import Button from '../commons/Button';
import Checkbox from '../commons/Checkbox';
import Modal from '../commons/Modal';
import PasswordInput from '../commons/PasswordInput';
import TextInput from '../commons/TextInput';

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  if (password.length < 5) {
    return 10;
  }

  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function getStrengthColor(strength: number) {
  switch (true) {
    case strength < 30:
      return 'red';
    case strength < 50:
      return 'orange';
    case strength < 70:
      return 'yellow';
    default:
      return 'teal';
  }
}

export const validatePassword = (value: string) => {
  if (!value || value.length < 1) {
    return 'Password is required.';
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (value.length > 16) {
    return 'Password must not exceed 16 characters.';
  }

  const errors = requirements
    .filter((req) => !req.re.test(value))
    .map((req) => req.label);

  return errors.length > 0 ? `Password must: ${errors.join(', ')}.` : null;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [watchPassword, setWatchPassword] = React.useState<string>('');
  const strength = getStrength(watchPassword);
  const color = getStrengthColor(strength);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      agreement: false,
    },
    validate: {
      firstName: (value) =>
        value.length >= 1 ? null : 'First name is required.',
      lastName: (value) =>
        value.length >= 1 ? null : 'Last name is required.',
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email.'),
      password: (value) => validatePassword(value),
      confirmPassword: (value, values) =>
        !value
          ? 'Confirm Password is required.'
          : value === values.password
            ? null
            : 'Passwords not matched.',
      terms: (value) =>
        value ? null : 'You must agree to the terms and privacy policy.',
      agreement: (value) => (value ? null : 'You must agree to the agreement.'),
    },
  });

  form.watch('password', (value) => {
    setWatchPassword(value.value);
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const res = await signup({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      terms: values.terms,
      agreement: values.agreement,
    });

    if (res.status === 'success') {
      showSuccessToast('Account created successfully');
      form.reset();
      open();
    } else {
      showErrorToast("Can't signup. Something went wrong on signup");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col gap-3 rounded-md border-[5px] border-black bg-white px-5 pb-10 pt-3 md:px-8"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <p className="text-lg font-semibold text-primary-dark">
          Please fill out the form to get started.
        </p>
        <div className="flex flex-col justify-start gap-2 sm:flex-row">
          <TextInput
            label="First Name"
            placeholder="First Name"
            variant="filled"
            withAsterisk
            size="md"
            className="md:w-1/2"
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            variant="filled"
            withAsterisk
            size="md"
            className="md:w-1/2"
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
          />
        </div>

        <TextInput
          label="Email"
          placeholder="your@gmail.com"
          variant="filled"
          withAsterisk
          size="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="YourPassword@123"
          variant="filled"
          withAsterisk
          size="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <Group grow gap={5} mt="xs">
          <Progress
            size="xs"
            color={color}
            value={watchPassword.length > 0 ? 100 : 0}
            transitionDuration={0}
          />
          <Progress
            size="xs"
            color={color}
            transitionDuration={0}
            value={strength < 30 ? 0 : 100}
          />
          <Progress
            size="xs"
            color={color}
            transitionDuration={0}
            value={strength < 50 ? 0 : 100}
          />
          <Progress
            size="xs"
            color={color}
            transitionDuration={0}
            value={strength < 70 ? 0 : 100}
          />
        </Group>

        <PasswordInput
          label="Confirm Password"
          placeholder="Please re-enter your password"
          variant="filled"
          withAsterisk
          size="md"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        <div className="flex gap-2">
          <Checkbox
            label="Terms & Privacy Policy"
            description={
              <span className="!text-gray">
                By checking this box, I agree to the{' '}
                <Link href="/privary" className="text-navy-blue-300 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privary" className="text-navy-blue-300 underline">
                  Privacy Policy
                </Link>
                .
              </span>
            }
            variant="filled"
            key={form.key('terms')}
            {...form.getInputProps('terms')}
          />
        </div>
        <div className="flex gap-2">
          <Checkbox
            label="Agreement"
            description={
              <span className="!text-gray">
                By checking this box, I consent by electronic signature to
                receive emails from Finomic [Radiant Ways], LLC and its
                affiliates made by any means or technology for informational, at
                the email I provided above. I understand that my consent to such
                emails is not required to use the services of Finomic [Radiant
                Ways], LLC.
              </span>
            }
            variant="filled"
            key={form.key('agreement')}
            {...form.getInputProps('agreement')}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-sm text-primary-light hover:underline sm:text-base"
          >
            Login
          </Link>
        </p>
        <div className="mt-5">
          <Button
            size="md"
            fullWidth
            variant="gradient"
            gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
            type="submit"
            loading={loading}
          >
            Register
          </Button>
        </div>
      </form>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="auto"
      >
        <div className="flex flex-col items-center justify-center space-y-2 p-6">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-primary-blue-light">Finomic</span>!
            🎉
          </h1>

          <p className="max-w-lg text-center text-lg text-slate-500">
            You&apos;ve successfully registered. We&apos;re excited to have you
            on board! Explore all the features we offer and start your journey
            with us. If you have any questions, feel free to check out our help
            center or reach out to our support team.
          </p>

          <p className="py-1 text-xl font-semibold text-primary">
            [Radiant Ways].
          </p>

          <p className="py-2">Check your email for the verification link.</p>

          <Button
            size="md"
            fullWidth
            variant="gradient"
            gradient={{ from: 'cyan', to: 'blue', deg: 90 }}
            onClick={() => {
              router.push('/auth/login');
              close();
            }}
          >
            Go to Login
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
