import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon, useMapEvents, ImageOverlay } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import proj4 from 'proj4';

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return null;
}

function NASAOverlay({ polygon }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageBounds, setImageBounds] = useState(null);

  useEffect(() => {
    if (polygon.length > 0) {
      const bounds = L.latLngBounds(polygon);
      const [west, south, east, north] = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ];

      // Define projections
      proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
      proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs');

      // Convert coordinates
      const [westMerc, southMerc] = proj4('EPSG:4326', 'EPSG:3857', [west, south]);
      const [eastMerc, northMerc] = proj4('EPSG:4326', 'EPSG:3857', [east, north]);

      // Construct WMTS URL
      const baseUrl = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-01-01/GoogleMapsCompatible_Level9';
      const url = `${baseUrl}/{z}/{y}/{x}.jpg`;

      setImageUrl(url);
      setImageBounds([[south, west], [north, east]]);
    }
  }, [polygon]);

  if (!imageUrl || !imageBounds) return null;

  return (
    <ImageOverlay
      url={imageUrl}
      bounds={imageBounds}
      opacity={0.5}
      zIndex={10}
    />
  );
}

export default function Map() {
  const [polygon, setPolygon] = useState([]);

  useEffect(() => {
    import('leaflet').then((L) => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
      });
    });
  }, []);

  const handleCreated = (e) => {
    const { layer } = e;
    if (layer instanceof L.Polygon) {
      setPolygon(layer.getLatLngs()[0]);
    }
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
        {polygon.length > 0 && <Polygon positions={polygon} />}
      </FeatureGroup>
      <LocationMarker />
      <NASAOverlay polygon={polygon} />
    </MapContainer>
  );
}