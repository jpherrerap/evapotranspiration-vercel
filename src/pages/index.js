import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Dropdown from '@components/Dropdown';
import styles from '@styles/Home.module.scss';

const MapWithNoSSR = dynamic(() => import('@components/Map'), {
  ssr: false,
});

const BarChartWithNoSSR = dynamic(
  () => import('../components/MyChart'),
  { ssr: false }
);

export default function Home() {

  const [selectedOption, setSelectedOption] = useState('');

  const dropdownOptions = [
    { value: 'option1', label: 'Alfalfa' },
    { value: 'option2', label: 'Tomato' },
  ];

  const data = [
    { name: 'Ene', value: 78.25 },
    { name: 'Feb', value: 78.25 },
    { name: 'Mar', value: 174 },
    { name: 'Abr', value: 362.25 },
    { name: 'May', value: 362.25 },
    { name: 'Jun', value: 142 }
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Layout>
      <Head>
        <title>LABKENCE</title>
        <meta name="description" content="Create mapping apps with LABKENCE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container>
          <h2 className={styles.title}>
            ¡Good day, Juan!
          </h2>
          <div className={styles.content}>
            🌻 It's the beginning of spring
          </div>
          <div className="container-fluid vh-100 d-flex flex-column bg-neutral-1b">
            <div className="col-12 h-50">
              <MapWithNoSSR />
            </div>
            <div className="row h-100">
              <div className="col-12 p-3">
                <Dropdown className="h-30"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={dropdownOptions}
                />
                {selectedOption && (
                  <div className='h-70' >
                    <div className={styles.description}>
                    💧 Water lost (ET)  (mm/m^2)
                    </div>
                    <BarChartWithNoSSR data={data} />
                  </div>
                )}
              </div>
            </div>
          {/* <p className={styles.description}> */}
            {/* <code className={styles.code}>Mengineers Team</code> */}
          {/* </p> */}
          </div>
        </Container>
      </Section>
    </Layout>
  );
}