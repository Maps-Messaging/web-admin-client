'use client'

import * as React from 'react';

import {
  pauseInterface, resumeInterface,
  startInterface, stopInterface,
  useGetInterface,
} from "@/generated/server-interface-management/server-interface-management";
import ActionController from "@/components/general/action-controller";
import toast from "react-hot-toast";

interface EndPointActionControllerProps {
  name: string;
}

export default function EndPointActionController({
                                          name=''
                                        }: EndPointActionControllerProps): React.JSX.Element {

  const { data, error, isLoading } = useGetInterface(name ||'',{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  const onStart = async (): Promise<void> => {
    if (name) {
      try {
        await startInterface(name);
      } catch (error1) {
        toast.success('Failed to start interface');
      }
    }
  };

  const onStop = async (): Promise<void> => {
    if (name) {
      try {
        await stopInterface(name);
      } catch (error1) {
        toast.success('Failed to stop interface');

      }
    }
  };

  const onPause = async (): Promise<void> => {
    if (name) {
      try {
        await pauseInterface(name);
      } catch (error1) {
        toast.success('Failed to pause interface');
      }
    }
  };

  const onResume = async (): Promise<void> => {
    if (name) {
      try {
        await resumeInterface(name);
      } catch (error1) {
        toast.success('Failed to resume interface');
      }
    }
  };

  return (
    <ActionController
      currentState={data?.data.state||''}
      onPause={onPause}
      onStart={onStart}
      onStop={onStop}
      onResume={onResume}
    />
  );
}

