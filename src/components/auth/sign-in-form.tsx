/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import {Eye as EyeIcon} from '@phosphor-icons/react/dist/ssr/Eye';
import {EyeSlash as EyeSlashIcon} from '@phosphor-icons/react/dist/ssr/EyeSlash';
import {Controller, useForm} from 'react-hook-form';
import {z as zod} from 'zod';

import {authClient} from '@/lib/auth/client';
import {useUser} from '@/hooks/use-user';

const schema = zod.object({
  username: zod.string().min(1, { message: 'Username is required' }),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <FormControl error={Boolean(errors.username)}>
              <InputLabel>Username</InputLabel>
              <OutlinedInput {...field} label="Username" type="username" />
              {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <FormControl error={Boolean(errors.password)}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...field}
                endAdornment={
                  showPassword ? (
                    <EyeIcon
                      cursor="pointer"
                      fontSize="var(--icon-fontSize-md)"
                      onClick={(): void => {
                        setShowPassword(false);
                      }}
                    />
                  ) : (
                    <EyeSlashIcon
                      cursor="pointer"
                      fontSize="var(--icon-fontSize-md)"
                      onClick={(): void => {
                        setShowPassword(true);
                      }}
                    />
                  )
                }
                label="Password"
                type={showPassword ? 'text' : 'password'}
              />
              {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
            </FormControl>
          )}
        />
        {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
        <Button disabled={isPending} type="submit" variant="contained">
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
