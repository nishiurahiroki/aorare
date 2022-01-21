import useSWR, { SWRResponse } from 'swr'


const FETCH_CURRENT_ADDRESS : string = 'geolocation'

const geoLocateFetcher = () => {
  return new Promise((resolve, reject) => {
    async function onSuccess({ coords }) {
      const response = await fetch(`https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json&lat=${coords.latitude}&lon=${coords.longitude}`)
      const json = await response.json()
      resolve(json)
    }
    navigator.geolocation.getCurrentPosition(onSuccess, reject);
  })
}

const useCurrentAddress = () => {
  const { data, mutate } : SWRResponse = useSWR(FETCH_CURRENT_ADDRESS, geoLocateFetcher, { 
    suspense : true
  })

  const reload : () => Promise<any> = () => mutate()

  const [ local ] = data?.result?.local
  const { mname } = data?.result?.municipality
  const { pname } = data?.result?.prefecture

  return {
    pname,
    mname,
    section : local.section,
    homenumber : local.homenumber,
    reload
  }
}
export default useCurrentAddress