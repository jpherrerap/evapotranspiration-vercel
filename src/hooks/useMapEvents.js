import { useMapEvents } from 'react-leaflet/hooks';

function MyComponent() {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }
  
  function MyMapComponent() {
    return (
      <MapContainer center={[50.5, 30.5]} zoom={13}>
        <MyComponent />
      </MapContainer>
    )
  }