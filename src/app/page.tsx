/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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

'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../hostname-lookup';

axios.defaults.baseURL = process.env.API_BASE_URL;

export default function Page(): React.JSX.Element {
  const router = useRouter();

  // Immediately attempt to navigate, note: this isn't typically recommended
  if (typeof window !== "undefined") {
    router.push('/dashboard');
  }

  return (
    <div>Loading or redirecting...</div>
  );
}
