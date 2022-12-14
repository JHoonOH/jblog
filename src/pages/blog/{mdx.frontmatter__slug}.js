import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import {
  content,
  linkInfo,
  linkItem,
  postInfo,
  postTitle
} from './blog.module.css'
import Comment from '../../components/Comment'

const BlogPost = ({ data, children }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <div className={content}>
        <div className={postInfo}>
          <div className={linkInfo}>
            <Link className={linkItem} to={`/more/${data.mdx.frontmatter.directory}/1`}>
              {data.mdx.frontmatter.directory}
            </Link>
            <Link className={linkItem} to={`/more/${data.mdx.frontmatter.category}/1`}>
              {data.mdx.frontmatter.category}
            </Link>
          </div>
          <div className={postTitle}>{data.mdx.frontmatter.title}</div>
          <p>Posted: {data.mdx.frontmatter.date}</p>
        </div>
        <div>
          {children}
        </div>
        <footer>
          <Comment repo="JHoonOH/jblog" />
        </footer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        directory
        category
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost