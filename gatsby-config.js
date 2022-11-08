module.exports = {
  siteMetadata: {
    title: `Hoon's J-blog`,
    description: `개발 관련 사항 블로그 입니다.`,
    siteUrl: `https://jblog.gatsbyjs.io/`
  },
  flags: {
    DEV_SSR: true
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-sharp",
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-copy-relative-linked-files',
            options: {
              // By default, `.md` is specified
              // ignoreFileExtensions: ['.md']
              //
              // These files will not be copied
              ignoreFileExtensions: ['.md', '.pdf', '.d.ts'],
  
              // Would generate file-1abcb33beeb811dca15f0ac3e47b88d9.pdf
              filename: ({ hash, name, extension }) =>
                `${name}-${hash}.${extension}`,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents"
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          }
        ],
      },
    },
  ]
};

