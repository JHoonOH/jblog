module.exports = {
  siteMetadata: {
    title: `Hoon's J-blog`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": "temp"
      }
    }, 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    }, 
    {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": `blog`,
        "path": `${__dirname}/blog`
      },
    },
  ]
};