import * as React from 'react'
import { useLocation } from '@reach/router';
import { Link, useStaticQuery, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'


const MorePost = ({ data }) => {

  const location = useLocation();
  console.log(location);
  let [bk, more, file] = location.pathname.split('/');

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
          if(node.frontmatter.directory != file) {
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