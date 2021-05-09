# Georeferenced Zoning Maps for metro Hartford CT, 1950s

![Resulting GeoJSON](./avon-zoning-1954-illustration.jpg)

## Map Summary
* Avon 1954 (georeferenced & in GeoJSON)
* Bloomfield 1958 (georeferenced & in GeoJSON)
* Farmington 1961 (or earlier on 1954 Avon map; PDF only)
* Glastonbury 1959 (or get 1956 at CSLib; PDF only)
* Granby 1960 (PDF only)
* Hartford 1962 (or get 1956 at CSLib or UConn; PDF only)
* Newington 1954 (wait for 1957 from PSU)
* Simsbury 1958 (or earlier on 1954 Avon map, or 1957 CSLib map; PDF only)
* West Hartford 1958 (PDF only)
* Windsor 1961 (PDF only)

## Historical subfolder
- Avon, “Present Zoning Fact Sheet [Map]” (Joseph Moschner and Avon Town Planning Committee, Connecticut, January 1954), https://www.avonct.gov/planning-community-development/files/1956-pocd-maps-908, scanned by Town of Avon.

- Bloomfield, “Zoning Map of the Town of Bloomfield, Connecticut” (Town Plan and Zoning Commission, June 30, 1958), http://www.worldcat.org/oclc/435838841, scanned by University of Kansas map library.

- Farmington, “Zoning Map: Farmington, Connecticut” (Town Planning Dept, 1961), http://www.worldcat.org/oclc/435838863, scanned by University of Kansas map library.

- Glastonbury, “Building-Zoning Map, Glastonbury, Connecticut,” June 1959, http://www.worldcat.org/oclc/435838832, scanned by University of Kansas map library.

- Granby, “Zoning Map of Granby, Connecticut.” (Technical Planning Associates, 1960), http://www.worldcat.org/oclc/435838864, scanned by University of Kansas map library.

- Hartford, “Zoning Map of the City of Hartford [Connecticut]” (City of Hartford. Department of Engineering, June 1, 1962), http://www.worldcat.org/oclc/435838873, scanned by University of Kansas map library.

- Newington, “Zone Map: Town of Newington, Connecticut” (Zoning Commission, June 21, 1962), http://www.worldcat.org/oclc/435841790, scanned by University of Kansas map library.

- Simsbury, “Simsbury [Zoning Map] Connecticut,” October 30, 1958, http://www.worldcat.org/oclc/435835109, scanned by University of Kansas map library.

- West Hartford, “Zoning Map: West Hartford, Connecticut” (Town Plan and Planning Commission, December 1958), http://www.worldcat.org/oclc/435841829, scanned by University of Kansas map library.

- Windsor, “Zoning Map: Town of Windsor, Connecticut” (Dr. Joseph R. Moschner & Associates, November 8, 1961), http://www.worldcat.org/oclc/190825516, scanned by University of Kansas map library.

### Requested from Penn State map library
Newington, “Zone Map: Town of Newington Connecticut” (Town of Newington, 1957), http://www.worldcat.org/oclc/61219552.


## Minimum Land Required Per Family by Town Zoning in early 1950s

| Town (section)         | Square Ft | Acres |
|:-----------------------|----------:|------:|
| Avon (east)            | 87,000    | 2.0   |
| Avon (west)            | 30,000    | 0.7   |
| Farmington (northeast) | 40,000    | 0.9   |
| Farmington (west)      | 20,000    | 0.5   |
| Bloomfield (west)      | 30,000    | 0.7   |
| Simsbury               | 25,000    | 0.6   |
| West Hartford (west)   | 10,000    | 0.2   |
| Burlington             | not zoned | n/a   |
| Canton                 | not zoned | n/a   |

Sources: Zoning Regulations for Avon (amended Oct 19, 1951, and Fall 1953); Bloomfield (adopted March 15, 1950); Simsbury (adopted Nov 21, 1952); West Hartford (amended to Dec 3, 1951); Farmington (adopted April 27, 1950), adapted from Avon and Joseph Moschner, “Present Zoning Fact Sheet [Map]” (Avon Town Planning Committee, Connecticut, January 1954), https://www.avonct.gov/planning-community-development/files/1956-pocd-maps-908.

## Georeferencing (Avon 1954)
Export PDF to JPG or PNG, and georeference the image using [QGIS Georeferencer](https://docs.qgis.org/3.16/en/docs/user_manual/working_with_raster/georeferencer.html) tool.

For Avon 1954, about 20 ground control points were chosen (available in `georeference/1954-avon-present-zoning-ROTATED_modified.tif.points`). The output GeoTIFF is available from `georeference/1954-avon-present-zoning-ROTATED_modified.tif`.

To recreate GeoTIFF from the original JPG and GCP points in QGIS, follow the steps below:

1. Open the JPG map in Georeferencer.
1. Load GCP points file.
1. In Transformation Settings, set type to *Polynomial 2*, resampling method to *Nearest neighbor*, and target SRS to *EPSG:3857* (Web Mercator).
1. Hit *Play* to generate a GeoTIFF.

## Creating a GeoJSON
The GeoJSONs were created using georeferenced TIFF maps. Polygons were manually created in QGIS, sometimes using simplified town boundaries of Connecticut (available from `georeference/ct-towns.geojson`).

Each polygon contains three properties:
* town
* zone
* acres (rounded to 1 decimal)

## License
MIT.
