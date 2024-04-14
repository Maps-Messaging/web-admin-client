'use client'

import React from 'react';
import {useGetName} from "@/generated/server-status/server-status";

export function ServerDetails () :  React.JSX.Element {
  const { data, error, isLoading } = useGetName();

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <div>
      Name: {JSON.stringify(data?.data.data, null, 2)}
    </div>
  );
}

