import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/Seo'
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


const MorePage = ({data, pageContext}) => {

  return (
    <Layout>
      <div className={pageInfo}>
        {pageContext.group} 의 게시글 
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
          return content;
        })
      }
      {
        pageContext.totalPage !== pageContext.currentIndex?
          <Link to={`/more/${pageContext.group}/${pageContext.currentIndex+1}`} className={postCard}>
            <div >더 보기</div>
          </Link>:<div></div>
      }
    </Layout>
  )
}

export const Head = () => <Seo title="블로그 글 목록" />

export const pageQuery = graphql`
  query ($limit: Int, $directory: String, $category:String) {
    allMdx (
      sort: {order: DESC, fields: frontmatter___date}
      filter: {frontmatter: {directory: {glob: $directory}, category: {glob: $category}}}
      limit: $limit
    ){
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
`

export default MorePage