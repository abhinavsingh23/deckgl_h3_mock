import React from 'react';
import DeckGL from '@deck.gl/react';
import {H3HexagonLayer} from '@deck.gl/geo-layers';
import type {PickingInfo} from '@deck.gl/core';
import {Map} from 'react-map-gl';
import { MapViewState } from '@deck.gl/core';
import {getH3IndexesForArea} from './h3_index_generator';

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
  zoom: 11,
  pitch: 0,
  bearing: 0
};

const processData = (allIndexes: Array<string>) => {
  return allIndexes.map((h3Index)=>{
    return {
      "hex": h3Index,
    }
  })
}

function App() {
  const [, setViewState] = React.useState(INITIAL_VIEW_STATE);
  const [currentRes, setCurrentRes] = React.useState(7);
  const [layer, setLayer] = React.useState(new H3HexagonLayer<DataType>({
    id: 'H3HexagonLayer',
    data: processData(getH3IndexesForArea([6,7,8,9])[7]),
    getHexagon: (d: DataType) => d.hex,
    elevationScale: 0,
    pickable: true,
    stroked: true,
    filled: false,
    wireframe: true,
    lineWidthMinPixels: 2,
    getLineColor: [0, 0, 0],  // Black outline color
    getLineWidth: 1,
  }))

  React.useEffect(()=>{
    const layer = new H3HexagonLayer<DataType>({
      id: 'H3HexagonLayer',
      data: processData(getH3IndexesForArea([6,7,8,9])[currentRes]),
      getHexagon: (d: DataType) => d.hex,
      elevationScale: 0,
      pickable: true,
      stroked: true,
      filled: false,
      wireframe: true,
      lineWidthMinPixels: 2,
      getLineColor: [0, 0, 0],  // Black outline color
      getLineWidth: 1,
    });
    setLayer(layer)
  },[currentRes])


  const onViewStateChange = ({ viewState }: { viewState: MapViewState }): void => {
    setViewState(viewState as InitialViewState);
    if (viewState.zoom !== INITIAL_VIEW_STATE.zoom) {
      if (viewState.zoom > INITIAL_VIEW_STATE.zoom) {
        if(viewState.zoom > 14){
          setCurrentRes(9);
        }else{
          setCurrentRes(8);
        }
      } else {
        setCurrentRes(7);

      }
    }
  };

  return (
    <div style={{margin: 'auto' ,height: '100vh', width: '100vw', backgroundColor: 'white'}}> 
      <DeckGL
        initialViewState={{
          longitude: -122.4,
          latitude: 37.74,
          zoom: 11
        }}
        controller
        style={{margin: 'auto', height: '600px', width: '600px'}}

        
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
    </div>
  )
}

export default App;
