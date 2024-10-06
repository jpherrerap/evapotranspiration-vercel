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
    { value: 'option2', label: 'Tomate' },
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
        <title>AgroSmart</title>
        <meta name="description" content="Create mapping apps with AgroSmart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container>
          <h2 className={styles.title}>
            ¡Buenas tardes, Juan!
          </h2>
          <div className={styles.content}>
            🌻 Estamos a inicios de primavera
          </div>
          <div className="container-fluid vh-100 d-flex flex-column bg-neutral-1b">
            <div className="col-12 h-50">
              <MapWithNoSSR />
            </div>
            <div className="row h-100">
              <div className="col-12 p-3">
                <Dropdown 
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={dropdownOptions}
                />
                {selectedOption && (
                  <div style={{height: "80%"}}>
                    <div className={styles.description}>
                    💧 Agua perdida por ET (mm/m^2)
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