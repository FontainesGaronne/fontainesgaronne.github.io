import * as React from 'react';
import MapLibre, { FullscreenControl, Layer, MapRef, NavigationControl, ScaleControl, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { districtGeojson, districtWithStCyprienGeojson, toulouseGeojson } from '@/components/map/style';
import { getBoundsFromCoordinates } from '@/components/map/utils';
import bbox from '@turf/bbox';

export default function Map() {
  const mapRef = React.useRef<MapRef>(null);

  const bounds = getBoundsFromCoordinates(bbox(districtGeojson.features[0]))
  const extendedBounds = getBoundsFromCoordinates(bbox(districtWithStCyprienGeojson.features[0]));
  const maxBounds = getBoundsFromCoordinates(bbox(toulouseGeojson.features[0]));

  const handleClick = () => {
    mapRef.current.fitBounds(bounds, {padding: 40, duration: 1000});
  };

  return (
    <MapLibre
      ref={mapRef}
      initialViewState={{
        bounds: extendedBounds,
      }}
      maxBounds={maxBounds}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      interactiveLayerIds={['CQFG-district-fill']}
      onClick={handleClick}
    >
      <Source id="CQFG-district" type="geojson" data={districtGeojson}>
      <Layer  
          id="CQFG-district-fill"
          type="fill"
          paint={{
            'fill-outline-color': 'rgb(234, 179, 8)',
            'fill-color': '#fff',
            'fill-opacity': 0
          }}
        />
        <Layer  
          id="CQFG-district-outline"
          type="line"
          paint={{
            'line-width': 20,
            'line-color': 'rgb(234, 179, 8)',
            "line-blur": 16
          }}
        />
      </Source>
      <NavigationControl />
      <FullscreenControl />
      <ScaleControl />
    </MapLibre>
  );
}
