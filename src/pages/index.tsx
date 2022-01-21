import { Suspense } from 'react'

import Head from 'next/head'

import useCurrentAddress from '../hooks/useCurrentAddress'


export default function Index() {
  return (
    <Suspense fallback={<>Loading..</>}>
      <App />
    </Suspense>
  )
}

function App() {
  const {
    pname,
    mname,
    section,
    homenumber,
    reload
  } = useCurrentAddress()


  const onClickTelButton = e => {
    const ok = window.confirm('!【注意】110番を発信します! 本当によろしいですか?')
    if(ok === false) {
      e.preventDefault()
    }
  }

  const onClickReloadButton = () => {
    reload()
  }

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
          <span>{section}</span>
          <span>{homenumber}</span>
        </div>
        <div className="text-2xl text-black-500 text-center font-semibold">です</div>

        <br/>
        <br/>

        <div className='text-center'>
          <button onClick={onClickReloadButton} className="bg-blue-500 text-2xl hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
          🔄現在地を再読み込み
          </button>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>


        <div className='text-center'>
          <a onClick={onClickTelButton} className="bg-red-500 text-2xl hover:bg-red-700 text-white font-bold py-4 px-8 rounded" href="tel:110">
            ⚠110番する
          </a>
        </div>
      </div>
     </div>
  )
}
