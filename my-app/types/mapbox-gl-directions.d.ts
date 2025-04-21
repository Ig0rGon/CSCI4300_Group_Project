// filepath: c:\programming\gitReposits\CSCI4300_Group_Project\my-app\types\mapbox-gl-directions.d.ts
declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { IControl } from 'mapbox-gl';
  
    interface MapboxDirectionsOptions {
      accessToken: string;
      unit?: 'metric' | 'imperial';
      profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
      controls?: {
        inputs?: boolean;
        instructions?: boolean;
        profileSwitcher?: boolean;
      };
    }
  
    export default class MapboxDirections implements IControl {
      constructor(options?: MapboxDirectionsOptions);
      onAdd(map: mapboxgl.Map): HTMLElement;
      onRemove(map: mapboxgl.Map): void;
      setOrigin(origin: [number, number] | string): void;
      setDestination(destination: [number, number] | string): void;
      removeRoutes(): void;
    }
  }