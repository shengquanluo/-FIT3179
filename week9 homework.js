var yourVlSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "A simple bar chart with embedded data.",
  title: { text: "World University Ranking Score", fontSize: 30 },
  width: 1200,
  height: 500,
  data: {
    url: "https://raw.githubusercontent.com/shengquanluo/FIT3179/main/world.json",
    format: {
      type: "topojson",
      feature: "world",
    },
  },
  transform: [
    {
      lookup: "properties.name",
      from: {
        data: { url: "https://raw.githubusercontent.com/shengquanluo/FIT3179/main/data.csv" },
        key: "country",
        fields: ["score"],
      },

      default: 0,
    },
    { calculate: "datum.score*1", as: "score_mean" },
  ],
  projection: { type: "equirectangular" },
  mark: { type: "geoshape","stroke": "gray" },
  encoding: {
    fill: {
      field: "score_mean",
      type: "quantitative",
      scale:{
        type:'quantitative',
        domain:[40,55],
        schema:'purpleblue'
      }
    },

    tooltip: [
      { field: "properties.name", type: "norminal", title: "Country" },
      { field: "score_mean", type: "quantitative", title: "Score", format: ".2f" },
    ],
  },
};
vegaEmbed("#countryViz", yourVlSpec);
