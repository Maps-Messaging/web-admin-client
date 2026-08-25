/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Button } from "@/components/ui/button";
import type { FileRouteTypes } from "@/routeTree.gen";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { FunctionComponent, PropsWithChildren } from "react";

interface LinkButtonProps extends PropsWithChildren {
  to: string;
  from?: FileRouteTypes["fullPaths"];
  params?: Record<string, string>;
}

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  children,
  to,
  from,
  params,
}) => (
  <Button
    variant="link"
    className="px-0 grow justify-start group"
    render={<Link to={to} from={from} params={params} />}
    nativeButton={false}
  >
    {children}
    <ChevronRight className="opacity-0 group-hover:opacity-80 transition-opacity inline-block size-4" />
  </Button>
);
