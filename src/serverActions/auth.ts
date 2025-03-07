'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
  agreement: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export async function signup(signupData: SignupData) {
  const { firstName, lastName, email, password, terms, agreement } = signupData;
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
        terms: terms,
        agreement: agreement,
      },
    },
  });

  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: 'EMAIL_NOT_VERIFIED',
      user: null,
    };
  }

  revalidatePath('/', 'layout');
  return {
    status: 'success',
    user: data?.user,
  };
}

export async function login(loginData: LoginData) {
  const { email, password } = loginData;
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: error?.status,
      message: error?.message,
      user: null,
    };
  }

  const { data: existingUser } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .limit(1)
    .single();

  if (!existingUser) {
    const fullName =
      data?.user?.user_metadata?.firstName +
      ' ' +
      data?.user?.user_metadata?.lastName;
    await supabase.from('user_profiles').insert({
      username: data?.user?.email,
      email: data?.user?.email,
      fullName: fullName,
    });
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function forgotPassword(email: string) {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-password`,
  });

  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  }

  return {
    status: 'success',
  };
}

export async function resetPassword(password: string, code: string) {
  const supabase = await createClient();
  const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);

  if (CodeError) {
    return {
      status: CodeError?.message,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      status: error?.message,
    };
  }

  return {
    status: 'success',
  };
}
