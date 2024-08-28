import React, { useEffect, useState } from 'react'
import { getDoctorInfo, IDoctorInfoWithId } from '@/app/lib/DoctorInfo'

const MyInfo = (): React.JSX.Element => {
  const [myInfo, setMyInfo] = useState<Partial<IDoctorInfoWithId> | undefined>()

  useEffect(() => {
    (async () => {
      const { data } = await getDoctorInfo()

      setMyInfo(data)
    })()
  }, [])

  return (
    <p className="text-sm md:text-base">{myInfo?.name} - Dermatologista - CRM: {myInfo?.CRM}, RQE: {myInfo?.RQE}</p>
  )
}

export default MyInfo
