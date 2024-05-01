'use client'

import {useSearchParams} from "next/navigation";

const NetworkEndPointPage = () => {

  const searchParams = useSearchParams()
  const name = searchParams.get('networkName')

  return (
    <div>
      <h1>Network Endpoint</h1>
      <p>Network Name: {name}</p>
    </div>
  );
};

export default NetworkEndPointPage;
