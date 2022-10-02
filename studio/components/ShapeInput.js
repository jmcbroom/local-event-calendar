import React, { useEffect, useState } from "react";
import { FormField } from "@sanity/base/components";
import { TextInput } from "@sanity/ui";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Map, mapboxgl } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import bbox from "@turf/bbox";
import "mapbox-gl/dist/mapbox-gl.css?raw";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css?raw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css?raw";
import client from "part:@sanity/base/client";

const ShapeInput = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
  } = props;

  const writeGeometry = React.useCallback(
    (geometry) => {
      const inputValue = JSON.stringify(geometry);
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    },
    [onChange]
  );

  let [boundBox, setBoundBox] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == 'siteSettings'].bbox`).then((response) => {
      setBoundBox(response[0].split(",").map(coord => parseFloat(coord)));
    });
  }, []);

  useEffect(() => {
    if (boundBox) {
      let fc = null;
      if (value && JSON.parse(value).length > 0) {
        fc = {
          type: "FeatureCollection",
          features: JSON.parse(value),
        };
      }
      const accessToken = "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA";

      let map = new Map({
        container: "map",
        style: "mapbox://styles/jmcbroom/cktr8i2jc1vby19qdjbtlvhwg",
        bounds: fc ? bbox(fc) : boundBox,
        fitBoundsOptions: {
          padding: 50,
        },
        accessToken: accessToken,
      });

      let Draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      map.addControl(Draw, "top-left");

      // Add the control to the map.
      map.addControl(
        new MapboxGeocoder({
          accessToken: accessToken,
          mapboxgl: mapboxgl,
          bbox: boundBox
        })
      );

      map.on("load", () => {
        if (fc) {
          Draw.set(fc);
        }

        map.on("draw.create", (e) => {
          let drawFc = Draw.getAll();
          writeGeometry(drawFc.features);
          if (drawFc.features[0].geometry.type === "Polygon") {
            map.fitBounds(bbox(drawFc), { padding: 20, maxZoom: 17 });
          }
        });
        map.on("draw.update", (e) => {
          let drawFc = Draw.getAll();
          writeGeometry(drawFc.features);
        });
        map.on("draw.delete", (e) => {
          let drawFc = Draw.getAll();
          writeGeometry(drawFc.features);
        });
      });
    }
  }, [boundBox]);

  return (
    <>
      <FormField
        description={type.description}
        title={type.title}
        compareValue={compareValue}
        __unstable_markers={markers}
        __unstable_presence={presence}
      >
        <div id="map" style={{ height: 500 }}></div>
      </FormField>
    </>
  );
});

export default ShapeInput;
