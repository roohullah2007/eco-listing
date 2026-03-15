import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
    var google: any;
}

declare module 'leaflet.gridlayer.googlemutant' {
    import { GridLayer, GridLayerOptions } from 'leaflet';
    interface GoogleMutantOptions extends GridLayerOptions {
        type?: 'roadmap' | 'satellite' | 'terrain' | 'hybrid';
        maxZoom?: number;
    }
    export default class GoogleMutant extends GridLayer {
        constructor(options?: GoogleMutantOptions);
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
