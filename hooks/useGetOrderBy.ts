import React, { useState } from 'react'


type Orders = 'Metacritic' | 'Name' | 'Released';
export const useGetOrderBy = () => {
  const [orderBy,setOrderBy] = useState<Orders>("Released");

  return {
    orderBy,
    setOrderBy,
  }
}

