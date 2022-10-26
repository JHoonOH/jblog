import * as React from 'react'
import { useLocation } from '@reach/router';
import { Link, useStaticQuery, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import {
  info,
  postTitle,
  postCategory,
  postContent,
  postCard,
  postCardBox,
  postListBox
} from './more.module.css'


const MoreDirectory = ({ data }) => {

  const location = useLocation();
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
          excerpt
        }
      }
    }
  `)

  return (
    <Layout>
      {
        query.allMdx.nodes.map( (node) => {
          if(node.frontmatter.directory != file) {
            return(null)
          } else{
            return (<article key={node.frontmatter.slug}>
              <div className={postListBox}>
                <div className={postCardBox}>
                  <Link to={`/blog/${node.frontmatter.slug}`} className={postCard}>
                    <div className={info}>
                      <div className={postTitle}>{node.frontmatter.title}</div>
                      <div className={postCategory}>{node.frontmatter.category.charAt(0).toUpperCase() + node.frontmatter.category.slice(1)}</div>
                    </div>
                    {/* <p>Posted: {node.frontmatter.date}</p> */}
                    <p className={postContent}>{node.excerpt}</p>
                  </Link>
                </div>
              </div>
            </article>);
          }
        })
      }
    </Layout>
  )
}

export const Head = () => <Seo title="블로그 글 목록" />

export default MoreDirectory