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

import { useGetSchema } from "@/components/schemas/hooks";
import type { SchemaId } from "@/components/schemas/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import type { FunctionComponent } from "react";

interface SchemaAttributesCardProps {
  schemaId: SchemaId;
  className?: string;
}

export const SchemaAttributesCard: FunctionComponent<
  SchemaAttributesCardProps
> = ({ schemaId, className }) => {
  const { data: schema } = useGetSchema(schemaId);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Attributes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="flex items-center justify-between">
          <strong>Name:</strong> {schema?.name}
        </p>
        <p className="flex items-center justify-between flex-wrap">
          <strong>ID:</strong> {schema?.uniqueId}
        </p>
        <p className="flex items-center justify-between flex-wrap">
          <strong>Description:</strong> {schema?.description}
        </p>
        <p className="flex items-center justify-between flex-wrap">
          <strong>Format:</strong> {schema?.format}
        </p>
        <p className="flex items-center justify-between flex-wrap">
          <strong>Documentation:</strong>
          <a href={schema?.documentation ?? undefined} target="_blank">
            {schema?.documentation}
          </a>
        </p>
        <p className="flex items-center justify-between flex-wrap">
          <strong>Ancestor:</strong>
          {schema?.ancestor ? (
            <LinkButton
              to="/schemas/$schemaId"
              params={{ schemaId: schema?.ancestor ?? "" }}
            >
              {schema?.ancestor}
            </LinkButton>
          ) : null}
        </p>
      </CardContent>
    </Card>
  );
};
