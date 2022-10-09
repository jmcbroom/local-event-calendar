import { useEffect, useState } from "react";
import { Map, NavigationControl } from "mapbox-gl";
import bbox from "@turf/bbox";
import truncate from "@turf/truncate";
import "mapbox-gl/dist/mapbox-gl.css";
import mapstyle from "../styles/mapstyle.json";
import centroid from "@turf/centroid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const VenueMap = ({ venue }) => {
  let fc = {
    type: "FeatureCollection",
    features: [venue.feature],
  };

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    let map = new Map({
      container: "map",
      style: mapstyle,
      bounds: bbox(fc),
      fitBoundsOptions: {
        padding: 50,
        maxZoom: 17,
      },
      interactive: false,
      accessToken: accessToken,
    });

    map.addControl(new NavigationControl({ showCompass: false }));

    map.on("load", () => {
      map.resize();
      map.getSource("venues").setData(fc);
      map.setLayoutProperty("venues-icon", "visibility", "none");
      map.setLayoutProperty("venues-label", "visibility", "visible");
      map.setLayoutProperty("venues-fill", "visibility", "visible");
      map.setLayoutProperty("venues-line", "visibility", "visible");
    });
  }, []);

  let fullAddress = `${venue.address}, ${venue.city}, ${venue.city === "Windsor" ? "CA" : "MI"}`;
  let directionLinks = [
    {
      name: "Apple Maps",
      url: `http://maps.apple.com/?daddr=${encodeURIComponent(fullAddress)}`,
    },
    {
      name: "Google Maps",
      url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
    },
  ];

  return (
    <div>
      <div id="map" className="h-48 md:h-64" />
      <div className="flex items-center justify-end gap-2 text-sm mt-1">
        {directionLinks.map((provider) => (
          <a
            href={provider.url}
            key={provider.name}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-1 text-xs"
          >
            {provider.name}
            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-2" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default VenueMap;
