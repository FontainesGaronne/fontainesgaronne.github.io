"use client";
import * as React from 'react';
import { createPortal } from 'react-dom';
import MapLibre, { FullscreenControl, Layer, type MapLayerMouseEvent, NavigationControl, ScaleControl, Source } from 'react-map-gl/maplibre';
import { districtGeojson, districtWithStCyprienGeojson, toulouseGeojson } from './style';
import { getBoundsFromCoordinates } from './utils';
import bbox from '@turf/bbox';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapContent() {
  const bounds = getBoundsFromCoordinates(bbox(districtGeojson.features[0]))
  const extendedBounds = getBoundsFromCoordinates(bbox(districtWithStCyprienGeojson.features[0]));
  const maxBounds = getBoundsFromCoordinates(bbox(toulouseGeojson.features[0]));

  return (
    <MapLibre
      initialViewState={{
        bounds: extendedBounds,
      }}
      maxBounds={maxBounds}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      interactiveLayerIds={['CQFG-district-fill']}
      onClick={(event: MapLayerMouseEvent) => {
        event.target.fitBounds(bounds, {padding: 40, duration: 1000});
      }}
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
};

export default function Map() {
  const [domLoaded, setDomLoaded] = React.useState(false);

  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

  
  if (!domLoaded) return null;
  
  const mapElement = document.getElementById('map')!;
  if (!mapElement) {
    return null;
  }
  return createPortal(<MapContent />, mapElement);
}
