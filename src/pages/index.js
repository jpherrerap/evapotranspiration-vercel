import dynamic from 'next/dynamic';
import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import styles from '@styles/Home.module.scss';

const MapWithNoSSR = dynamic(() => import('@components/Map'), {
  ssr: false,
});

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>AgroSmart</title>
        <meta name="description" content="Create mapping apps with AgroSmart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container>
          <h1 className={styles.title}>
            AgroSmart
          </h1>
          <div style={{ height: '100vh', width: '100%', margin:"0 auto"}}>
            <MapWithNoSSR />
          </div>
          <p className={styles.description}>
            <code className={styles.code}>Mengineers Team</code>
          </p>
        </Container>
      </Section>
    </Layout>
  );
}