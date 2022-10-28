import * as React from 'react'
import { useLocation } from '@reach/router';
import { Link, useStaticQuery, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import {
  pageInfo,
  postInfo,
  postTitle,
  postCategory,
  postContent,
  postDate,
  postCard,
  postCardBox,
  postListBox
} from './more.module.css'


const MorePage = ({type}) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            category
            directory
            slug
            title
            date(formatString: "M월 DD일, yyyy")
          }
          excerpt
        }
      }
    }
  `)

  const location = useLocation();
  let [bk, more, file] = location.pathname.split('/');

  return (
    <Layout>
      <div className={pageInfo}>
        {file} 의 게시글 
      </div>
      {
        data.allMdx.nodes.map( (node) => {
          const content = (<article key={node.frontmatter.slug}>
            <div className={postListBox}>
              <div className={postCardBox}>
                <Link to={`/blog/${node.frontmatter.slug}`} className={postCard}>
                  <div className={postInfo}>
                    <div className={postTitle}>{node.frontmatter.title}</div>
                    <div className={postCategory}>{node.frontmatter.category.charAt(0).toUpperCase() + node.frontmatter.category.slice(1)}</div>
                  </div>
                  {/* <p>Posted: {node.frontmatter.date}</p> */}
                  <p className={postContent}>{node.excerpt}</p>
                  <p className={postDate}>{node.frontmatter.date}</p>
                </Link>
              </div>
            </div>
          </article>);
          
          if(type == 'dir'){
            if(node.frontmatter.directory != file){
              return(null);
            } else {
              return content;
            }
          } else if(type == 'ctg'){
            if(node.frontmatter.category != file){
              return(null);
            } else {
              return content;
            }
          }
        })
      }
    </Layout>
  )
}

export const Head = () => <Seo title="블로그 글 목록" />

export default MorePage