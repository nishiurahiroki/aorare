import Head from 'next/head'

import useSWR, {SWRResponse} from 'swr'



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

export default function Index() {
  const { data, error } : SWRResponse = useSWR('geolocation', geoLocateFetcher)

  if(!data) return 'Loading!'
  if(error) return 'Error'

  const [ local ] = data?.result?.local
  const { mname } = data?.result?.municipality
  const { pname } = data?.result?.prefecture

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"/>
        <title>煽られた時に見るページ</title>
      </Head>

      <div className="md:container md:mx-auto">
        <div className="text-2xl text-black-500 text-center font-semibold">ここは</div>
        <div className='text-4xl text-red-500 text-center font-semibold'>
          <span>{pname}</span>
          <span>{mname}</span>
          <span>{local.section}</span>
          <span>{local.homenumber}</span>
        </div>
        <div className="text-2xl text-black-500 text-center font-semibold">です</div>

        <br/>

        <div className='text-center'>
          <a className="bg-red-500 text-2xl hover:bg-red-700 text-white font-bold py-4 px-8 rounded" href="tel:110">
            110番する
          </a>
        </div>
      </div>
     </div>
  )
}
