import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const MorePost = ({ data }) => {

let [bk, more, file] = window.location.pathname.split('/');
console.log(file);

const query = useStaticQuery(graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          category
          directory
          slug
          title
        }
      }
    }
  }
`)

  return (
    <Layout pageTitle="My Blog Posts">
      {
        query.allMdx.nodes.map( (node) => {
          if(node.frontmatter.category != file) {
            return(<></>)
          } else{
            return (<article key={node.id}>
              <h2>
                <Link to={`/blog/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p>Posted: {node.frontmatter.date}</p>
            </article>);
          }
        })
      }
    </Layout>
  )
}

export const Head = () => <Seo title="블로그 글 목록" />

export default MorePost