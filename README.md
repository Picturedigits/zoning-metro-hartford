# Georeferenced Zoning Map of Avon, CT (1954)

This repository contains a georeferenced TIFF and a GeoJSON of Avon's 1954 Zoning Map with surrounding towns: Simsbury, Bloomfield, West Hartford, and Farmington (Canton and Burlington - both partially present - are not zoned).

![Resulting GeoJSON](./avon-zoning-illustration.jpg)

## Georeferencing
The original JPG map was georeferenced using [QGIS Georeferencer](https://docs.qgis.org/3.16/en/docs/user_manual/working_with_raster/georeferencer.html) tool. About 20 ground control points were chosen (available in `georeference/1954-avon-present-zoning-ROTATED_modified.tif.points`). The output GeoTIFF is available from `georeference/1954-avon-present-zoning-ROTATED_modified.tif`.

To recreate GeoTIFF from the original JPG and GCP points in QGIS, follow the steps below:

1. Open the JPG map in Georeferencer.
1. Load GCP points file.
1. In Transformation Settings, set type to *Polynomial 2*, resampling method to *Nearest neighbor*, and target SRS to *EPSG:3857* (Web Mercator).
1. Hit the *Play* button to generate a GeoTIFF.

## Creating a GeoJSON
A GeoJSON file with polygons was manually created in QGIS using the georeferenced map and simplified town boundaries of Connecticut (available from `georeference/ct-towns.geojson`).

Each polygon contains three properties:
* town
* zone
* acres (rounded to 1 decimal)

## License
MIT.
