import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';
import useUserLocation from '@hooks/useUserLocation'; // Adjust the path as necessary
import styles from '@styles/Home.module.scss';


const DEFAULT_CENTER = [-33.4723517,-70.9594839]


export default function Home() {
  const { userLocation } = useUserLocation();

  const center = userLocation || DEFAULT_CENTER;
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

          <Map className={styles.homeMap} width="800" height="400" center={center} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={center}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
          </Map>

          <p className={styles.description}>
            <code className={styles.code}>Mengineers Team</code>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}
