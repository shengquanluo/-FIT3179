var yourVlSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "A simple bar chart with embedded data.",
  title: {text:"World University Rankings",fontSize:30},
  width: 1200,
  height: 500,
  data: 
    {
      url: "world.json",
      format: {
        type: "topojson",
        feature: "world",
      },
    },
  transform: [
    {
      lookup: "properties.name",
      from: {
        data: {url:'data.csv'},
        key: "country",
        fields: ["score"],
      },
      default: 1,
    },
  ],
  projection: { type: "equirectangular" },
  mark: { type: "geoshape" },
  encoding: {
    fill: {
      field: "score",
      type: "quantitative",
      scale: { type: "linear", domain: [40, 53], scheme: "purplebluegreen" },
    },
    stroke: {
      field: "type",
    },

    tooltip: [
      { field: "properties.name", type: "norminal", title: "Country" },
      { field: "score", type: "quantitative", title: "Score", "format": ".2f" },
    ],
  },
};
vegaEmbed("#countryViz", yourVlSpec);
