import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import type { Applicant } from './api/lib/applicant'
import ApplicantList from '../components/ApplicantList';
import AddApplicant from '../components/AddApplicant';

const Home: NextPage = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([])

  useEffect(() => {
    (async () => {
      setApplicants(await (await fetch('/api/all')).json() as Applicant[]);
    })();
  }, []);

  const onAddApplicant = async (name: string, phone: string, screener?: string) => {
      let newApplicant: Applicant = {name: name, phone: phone};
      if (screener && screener.length > 0) {
          newApplicant = {...newApplicant, screener: screener};
      }

      // send new applicant to db
        const result = await
            (await fetch('/api/addapplicant', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: JSON.stringify(newApplicant),
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer'
        })).json();
        console.log(result);
      // update local list
      setApplicants(prevApplicants => [newApplicant, ...prevApplicants]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>FirstAidKit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          (First) AidKit Task
        </h1>
        <AddApplicant onAddApplicant={onAddApplicant} />
        <ApplicantList applicants={applicants} />
      </main>
    </div>
  )
}

export default Home
