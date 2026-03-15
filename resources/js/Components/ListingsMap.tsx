import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';

interface Listing {
    mlsNumber: string;
    listPrice: string;
    type: string;
    class: string;
    map: {
        latitude: number | null;
        longitude: number | null;
    };
    address: {
        area: string;
        city: string;
        neighborhood: string;
        streetNumber: string;
        streetName: string;
        streetSuffix: string;
        unitNumber: string | null;
        zip: string;
        state: string;
    };
    details: {
        numBedrooms: number | null;
        numBathrooms: number | null;
        sqft: string;
        propertyType: string;
        style: string;
    };
    images: string[];
    photoCount: number;
    daysOnMarket: number;
}

interface MapBounds {
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
}

interface ListingsMapProps {
    listings: Listing[];
    onPolygonSearch?: (coordinates: { lat: number; lng: number }[]) => void;
    onPolygonReset?: () => void;
    onBoundsChange?: (bounds: MapBounds) => void;
    hasPolygonFilter?: boolean;
}

const BLUE = '#2563eb';

function formatPriceShort(price: string | number): string {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '$0';
    if (num >= 1000000) {
        const m = num / 1000000;
        return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
    }
    if (num >= 1000) {
        const k = num / 1000;
        return `$${k.toFixed(0)}k`;
    }
    return `$${num}`;
}

function formatPriceFull(price: string | number): string {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(num);
}

function fmtAddress(address: Listing['address']): string {
    const parts = [address.streetNumber, address.streetName, address.streetSuffix].filter(Boolean);
    let street = parts.join(' ');
    if (address.unitNumber) street = `#${address.unitNumber} - ${street}`;
    return [street, address.city, `${address.state} ${address.zip}`].filter(Boolean).join(', ');
}

function getImg(listing: Listing): string {
    return listing.images?.[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600';
}

function getPropType(listing: Listing): string {
    return listing.details?.propertyType || listing.details?.style || listing.class || 'Residential';
}

type MarkerState = 'default' | 'hover' | 'selected';

function createPriceIcon(price: string, state: MarkerState = 'default'): L.DivIcon {
    let bg = '#1e293b';
    if (state === 'selected') bg = BLUE;
    const scale = state === 'hover' ? 'transform: scale(1.1);' : '';
    const zIdx = state !== 'default' ? 'z-index: 999; position: relative;' : 'position: relative;';
    return L.divIcon({
        className: 'price-marker-icon',
        html: `<div style="
            background-color: ${bg};
            color: white;
            padding: 5px 10px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            line-height: 1;
            display: inline-block;
            ${scale}
            ${zIdx}
            transition: transform 0.15s, background-color 0.15s;
        ">${formatPriceShort(price)}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
}

function buildPopupHtml(listing: Listing): string {
    const img = getImg(listing);
    const price = formatPriceFull(listing.listPrice);
    const address = fmtAddress(listing.address);
    const propType = getPropType(listing);
    const saleType = listing.type === 'lease' ? 'rent' : 'sale';
    const days = listing.daysOnMarket <= 1 ? '1 day ago' : `${listing.daysOnMarket} days ago`;
    const neighborhood = listing.address.neighborhood || '';

    let stats = '';
    if (listing.details?.numBedrooms != null) stats += `<span style="font-weight:600;color:#374151">${listing.details.numBedrooms}</span> bds <span style="color:#d1d5db">|</span> `;
    if (listing.details?.numBathrooms != null) stats += `<span style="font-weight:600;color:#374151">${listing.details.numBathrooms}</span> ba <span style="color:#d1d5db">|</span> `;
    if (listing.details?.sqft) stats += `<span style="font-weight:600;color:#374151">${listing.details.sqft}</span> sqft `;
    stats += `<span style="color:#9ca3af">·</span> ${propType} for ${saleType}`;

    return `
        <div style="width:280px;font-family:system-ui,-apple-system,sans-serif;">
            <a href="/property/${listing.mlsNumber}" style="text-decoration:none;color:inherit;display:block;">
                <div style="position:relative;height:150px;overflow:hidden;border-radius:10px 10px 0 0;">
                    <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;" />
                    <div style="position:absolute;left:8px;top:8px;background:rgba(0,0,0,0.6);color:white;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;">${days}</div>
                    <div style="position:absolute;right:8px;top:8px;width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                </div>
                <div style="padding:10px 12px 12px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <div style="font-size:17px;font-weight:700;color:#1A1816;">${price}</div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </div>
                    <div style="margin-top:3px;font-size:11px;color:#6b7280;display:flex;align-items:center;gap:4px;flex-wrap:wrap;">${stats}</div>
                    <div style="margin-top:8px;font-size:12px;color:#374151;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${address}</div>
                    <div style="margin-top:8px;font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.3px;">MLS ID #${listing.mlsNumber}${neighborhood ? ` · ${neighborhood}` : ''}</div>
                </div>
            </a>
        </div>
    `;
}

export default function ListingsMap({
    listings,
    onPolygonSearch,
    onPolygonReset,
    onBoundsChange,
    hasPolygonFilter,
}: ListingsMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.MarkerClusterGroup | null>(null);
    const markerMapRef = useRef<Map<string, L.Marker>>(new Map());
    const drawnLayerRef = useRef<L.FeatureGroup | null>(null);
    const drawControlRef = useRef<any>(null);
    const activePopupRef = useRef<L.Popup | null>(null);
    const selectedMlsRef = useRef<string | null>(null);
    const boundsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const skipFitBoundsRef = useRef(false);
    const roadmapLayerRef = useRef<L.TileLayer | null>(null);
    const satelliteLayerRef = useRef<L.TileLayer | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasPolygon, setHasPolygon] = useState(false);
    const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

    const validListings = listings.filter(
        (l) => l.map?.latitude != null && l.map?.longitude != null
    );

    const deselectCurrent = () => {
        if (selectedMlsRef.current) {
            const prevMarker = markerMapRef.current.get(selectedMlsRef.current);
            const prevListing = validListings.find(l => l.mlsNumber === selectedMlsRef.current);
            if (prevMarker && prevListing) {
                prevMarker.setIcon(createPriceIcon(prevListing.listPrice, 'default'));
                prevMarker.setZIndexOffset(0);
            }
            if (activePopupRef.current && mapRef.current) {
                mapRef.current.closePopup(activePopupRef.current);
                activePopupRef.current = null;
            }
            selectedMlsRef.current = null;
        }
    };

    // Load Google Maps JS API
    // Initialize map
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = L.map(mapContainerRef.current, {
            center: [49.25, -123.1],
            zoom: 9,
            zoomControl: false,
            attributionControl: false,
        });

        // Map mode: light muted silver-grey style (matches reference design)
        const lightMap = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            { maxZoom: 20 }
        );

        // Satellite mode: Google satellite + labels
        const satellite = L.tileLayer(
            'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            { maxZoom: 21 }
        );

        roadmapLayerRef.current = lightMap;
        satelliteLayerRef.current = satellite;
        lightMap.addTo(map);

        L.control.attribution({ position: 'bottomright', prefix: false })
            .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>')
            .addTo(map);

        const markersGroup = L.markerClusterGroup({
            maxClusterRadius: 60,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: (cluster) => {
                const count = cluster.getChildCount();
                const size = count >= 50 ? 48 : count >= 10 ? 42 : 36;
                return L.divIcon({
                    html: `<div style="
                        width: ${size}px;
                        height: ${size}px;
                        border-radius: 50%;
                        background-color: #1e293b;
                        border: 3px solid white;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: ${count >= 50 ? 15 : 13}px;
                        font-weight: 700;
                        font-family: system-ui, -apple-system, sans-serif;
                    ">${count}</div>`,
                    className: 'cluster-marker-icon',
                    iconSize: L.point(size, size),
                    iconAnchor: L.point(size / 2, size / 2),
                });
            },
        });
        markersGroup.addTo(map);
        markersRef.current = markersGroup;

        const drawnItems = new L.FeatureGroup().addTo(map);
        drawnLayerRef.current = drawnItems;

        map.on('click', () => deselectCurrent());

        map.on('popupclose', () => {
            if (selectedMlsRef.current) {
                const prevMarker = markerMapRef.current.get(selectedMlsRef.current);
                const prevListing = validListings.find(l => l.mlsNumber === selectedMlsRef.current);
                if (prevMarker && prevListing) {
                    prevMarker.setIcon(createPriceIcon(prevListing.listPrice, 'default'));
                    prevMarker.setZIndexOffset(0);
                }
                selectedMlsRef.current = null;
                activePopupRef.current = null;
            }
        });

        // Only fire bounds-search after the initial fitBounds has settled.
        // User drags/zooms set the flag; programmatic fitBounds does not.
        let readyForBoundsSearch = false;
        map.on('dragstart', () => { readyForBoundsSearch = true; });
        map.on('zoomend', () => {
            // After initial fitBounds, any subsequent zoom is user-initiated
            if (skipFitBoundsRef.current) readyForBoundsSearch = true;
        });
        map.on('moveend', () => {
            if (!readyForBoundsSearch) return;
            if (boundsTimerRef.current) clearTimeout(boundsTimerRef.current);
            boundsTimerRef.current = setTimeout(() => {
                skipFitBoundsRef.current = true;
                const b = map.getBounds();
                onBoundsChange?.({
                    swLat: b.getSouthWest().lat,
                    swLng: b.getSouthWest().lng,
                    neLat: b.getNorthEast().lat,
                    neLng: b.getNorthEast().lng,
                });
            }, 600);
        });

        mapRef.current = map;

        return () => {
            if (boundsTimerRef.current) clearTimeout(boundsTimerRef.current);
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Switch between roadmap and satellite
    useEffect(() => {
        if (!mapRef.current || !roadmapLayerRef.current || !satelliteLayerRef.current) return;
        const map = mapRef.current;
        if (mapType === 'satellite') {
            if (map.hasLayer(roadmapLayerRef.current)) map.removeLayer(roadmapLayerRef.current);
            if (!map.hasLayer(satelliteLayerRef.current)) satelliteLayerRef.current.addTo(map);
        } else {
            if (map.hasLayer(satelliteLayerRef.current)) map.removeLayer(satelliteLayerRef.current);
            if (!map.hasLayer(roadmapLayerRef.current)) roadmapLayerRef.current.addTo(map);
        }
    }, [mapType]);

    // Update markers when listings change
    useEffect(() => {
        if (!mapRef.current || !markersRef.current) return;

        markersRef.current.clearLayers();
        markerMapRef.current.clear();

        // Close popup if selected listing no longer in results
        if (selectedMlsRef.current) {
            const stillExists = validListings.find(l => l.mlsNumber === selectedMlsRef.current);
            if (!stillExists) {
                deselectCurrent();
            }
        }

        if (validListings.length === 0) return;

        const bounds = L.latLngBounds([]);

        validListings.forEach((listing) => {
            const lat = listing.map.latitude!;
            const lng = listing.map.longitude!;
            const isSelected = selectedMlsRef.current === listing.mlsNumber;

            const marker = L.marker([lat, lng], {
                icon: createPriceIcon(listing.listPrice, isSelected ? 'selected' : 'default'),
            });

            marker.on('click', (e) => {
                L.DomEvent.stopPropagation(e);

                // If clicking already selected, deselect
                if (selectedMlsRef.current === listing.mlsNumber) {
                    deselectCurrent();
                    return;
                }

                // Deselect previous
                deselectCurrent();

                // Select this marker
                marker.setIcon(createPriceIcon(listing.listPrice, 'selected'));
                marker.setZIndexOffset(1000);
                selectedMlsRef.current = listing.mlsNumber;

                // Open Leaflet popup anchored to the marker's lat/lng
                const popup = L.popup({
                    closeButton: false,
                    className: 'listing-card-popup',
                    maxWidth: 300,
                    minWidth: 280,
                    offset: [140, 0], // offset to the right so marker stays visible
                    autoPan: true,
                    autoPanPaddingTopLeft: [10, 10],
                    autoPanPaddingBottomRight: [10, 10],
                })
                    .setLatLng([lat, lng])
                    .setContent(buildPopupHtml(listing))
                    .openOn(mapRef.current!);

                activePopupRef.current = popup;
            });

            marker.on('mouseover', () => {
                if (selectedMlsRef.current !== listing.mlsNumber) {
                    marker.setIcon(createPriceIcon(listing.listPrice, 'hover'));
                    marker.setZIndexOffset(500);
                }
            });

            marker.on('mouseout', () => {
                if (selectedMlsRef.current !== listing.mlsNumber) {
                    marker.setIcon(createPriceIcon(listing.listPrice, 'default'));
                    marker.setZIndexOffset(0);
                }
            });

            markersRef.current!.addLayer(marker);
            markerMapRef.current.set(listing.mlsNumber, marker);
            bounds.extend([lat, lng]);
        });

        // Only fitBounds if this isn't from a map move (user pan/zoom)
        if (skipFitBoundsRef.current) {
            skipFitBoundsRef.current = false;
        } else {
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [listings]);

    // Handle draw mode toggle
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current;

        if (isDrawing) {
            const drawHandler = new (L.Draw as any).Polygon(map, {
                shapeOptions: {
                    color: BLUE,
                    fillColor: BLUE,
                    fillOpacity: 0.1,
                    weight: 2,
                },
            });
            drawHandler.enable();
            drawControlRef.current = drawHandler;

            const onCreated = (e: any) => {
                const layer = e.layer;
                drawnLayerRef.current?.clearLayers();
                drawnLayerRef.current?.addLayer(layer);
                setIsDrawing(false);
                setHasPolygon(true);

                const latlngs = layer.getLatLngs()[0] as L.LatLng[];
                const coordinates = latlngs.map((ll: L.LatLng) => ({
                    lat: ll.lat,
                    lng: ll.lng,
                }));
                onPolygonSearch?.(coordinates);
            };

            map.on(L.Draw.Event.CREATED, onCreated);

            return () => {
                drawHandler.disable();
                map.off(L.Draw.Event.CREATED, onCreated);
            };
        } else {
            if (drawControlRef.current) {
                drawControlRef.current.disable();
                drawControlRef.current = null;
            }
        }
    }, [isDrawing]);

    const handleZoomIn = () => mapRef.current?.zoomIn();
    const handleZoomOut = () => mapRef.current?.zoomOut();
    const handleDrawToggle = () => {
        // Auto-reset previous polygon when starting a new draw
        if (!isDrawing && hasPolygon) {
            drawnLayerRef.current?.clearLayers();
            setHasPolygon(false);
        }
        setIsDrawing((prev) => !prev);
    };

    const handleReset = () => {
        drawnLayerRef.current?.clearLayers();
        setHasPolygon(false);
        setIsDrawing(false);
        onPolygonReset?.();
    };

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />

            {/* Zoom controls */}
            <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-1">
                <button
                    onClick={handleZoomIn}
                    className="flex items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm transition-colors hover:bg-gray-50"
                    style={{ width: '36px', height: '36px' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
                <button
                    onClick={handleZoomOut}
                    className="flex items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm transition-colors hover:bg-gray-50"
                    style={{ width: '36px', height: '36px' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>

            {/* Map / Satellite toggle */}
            <div className="absolute bottom-4 right-3 z-[1000]">
                <div className="flex overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm" style={{ height: '36px' }}>
                    <button
                        onClick={() => setMapType('roadmap')}
                        className="px-4 text-xs font-semibold transition-colors"
                        style={{
                            backgroundColor: mapType === 'roadmap' ? '#1e293b' : 'white',
                            color: mapType === 'roadmap' ? 'white' : '#6b7280',
                        }}
                    >
                        Map
                    </button>
                    <button
                        onClick={() => setMapType('satellite')}
                        className="px-4 text-xs font-semibold transition-colors"
                        style={{
                            backgroundColor: mapType === 'satellite' ? '#1e293b' : 'white',
                            color: mapType === 'satellite' ? 'white' : '#6b7280',
                        }}
                    >
                        Satellite
                    </button>
                </div>
            </div>

            {/* Draw / Reset controls */}
            <div className="absolute bottom-4 left-4 z-[1000] flex gap-2">
                <button
                    onClick={handleDrawToggle}
                    className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm transition-colors"
                    style={{
                        backgroundColor: isDrawing ? BLUE : 'white',
                        color: isDrawing ? 'white' : '#1A1816',
                        borderColor: isDrawing ? BLUE : '#d1d5db',
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3z" />
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                        <path d="M2 2l7.586 7.586" />
                        <circle cx="11" cy="11" r="2" />
                    </svg>
                    {isDrawing ? 'Drawing...' : 'Draw'}
                </button>
                {hasPolygon && (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:bg-gray-50"
                        style={{ color: '#1A1816' }}
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Drawing mode overlay hint */}
            {isDrawing && (
                <div className="absolute left-1/2 top-4 z-[1000] -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white shadow-lg">
                    Click on the map to draw a search area, double-click to finish
                </div>
            )}
        </div>
    );
}
