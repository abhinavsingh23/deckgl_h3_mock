import React from 'react';
import DeckGL from '@deck.gl/react';
import {H3HexagonLayer} from '@deck.gl/geo-layers';
import type {PickingInfo} from '@deck.gl/core';
import {Map} from 'react-map-gl';
import { MapViewState } from '@deck.gl/core';

type DataType = {
  hex: string;
  count: number;
};

interface InitialViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

const INITIAL_VIEW_STATE = {
  latitude: 37.8,
  longitude: -122.4,
  zoom: 8,
  pitch: 0,
  bearing: 0
};


function App() {
  const [, setViewState] = React.useState(INITIAL_VIEW_STATE);

  const layer = new H3HexagonLayer<DataType>({
    id: 'H3HexagonLayer',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.h3cells.json',
    extruded: true,
    getHexagon: (d: DataType) => d.hex,
    getFillColor: (d: DataType) => [255, (1 - d.count / 500) * 255, 0],
    getElevation: (d: DataType) => d.count,
    elevationScale: 20,
    pickable: true
  });

  const onViewStateChange = ({ viewState }: { viewState: MapViewState }): void => {
    setViewState(viewState as InitialViewState);
    
    // Check if zoom has changed
    console.log(viewState.zoom)
    if (viewState.zoom !== INITIAL_VIEW_STATE.zoom) {
      if (viewState.zoom > INITIAL_VIEW_STATE.zoom) {
        console.log('Zoomed in');
        // Add your custom zoom in event logic here
      } else {
        console.log('Zoomed out');
        // Add your custom zoom out event logic here
      }
    }
  };

  return <DeckGL
    initialViewState={{
      longitude: -122.4,
      latitude: 37.74,
      zoom: 11
    }}
    controller
    // @ts-ignore
    onViewStateChange={onViewStateChange}
    // @ts-ignore
    getTooltip={({object}: PickingInfo<DataType>) => object && `${object.hex} count: ${object.count}`}
    layers={[layer]}
  >
    <Map
        reuseMaps
        // {...pageViewState}
        // mapStyle={"mapbox://styles/mapbox/light-v10"}
        mapStyle={"mapbox://styles/mapbox/light-v10"}

        mapboxAccessToken={"pk.eyJ1IjoiZGF2aWRjYWxob3VuIiwiYSI6ImNraXlxaW8wMTB4MXIyeG02aDZzbnBxcmkifQ.OOxFfzUTBphTe1wEZqhjnw"}
      />
  </DeckGL>
}

export default App;
