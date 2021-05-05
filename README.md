# Georeferenced Zoning Maps for metro Hartford CT, 1950s

This repository contains a georeferenced TIFF and a GeoJSON of Avon's 1954 Zoning Map with surrounding towns: Simsbury, Bloomfield, West Hartford, and Farmington (Canton and Burlington - both partially present - are not zoned).

![Resulting GeoJSON](./avon-zoning-illustration.jpg)

## Source
Avon and Joseph Moschner, “Present Zoning Fact Sheet [Map]” (Avon Town Planning Committee, Connecticut, January 1954), https://www.avonct.gov/planning-community-development/files/1956-pocd-maps-908.

## Requested Zoning Maps from University of Kansas map library
- Bloomfield CT 1958 — 3784 .B62 9 275
- Farmington CT 1961 — 3784 .F22 22.8 23
- Glastonbury CT 1959 — FC 3784 .G46 22.8 45
- Granby CT 1960 — 3784 .G76 22.8 24
- Hartford CT 1962 — 3784 .H25 22.8 12
- Newington CT 1954 — 3784 .N46 22.8 12
- Simsbury CT 1958 — 3784 .Si5 22.8 20
- West Hartford CT 1958 — 3784 .W51 22.8 18
- Windsor CT 1961 — 3784 .W8 10.244 12 1961 .D7

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
