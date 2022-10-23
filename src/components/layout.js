import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  container,
  nav,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: frontmatter___directory) {
          totalCount
          fieldValue
          group(field: frontmatter___category) {
            totalCount
            fieldValue
          }
        }
      }
    }
  `)

  return (
    <div>
      <div>
        <nav className={nav}>
          <ul className={navLinks}>
            {
              data.allMdx.group.map(node => (
                <li className={navLinkItem} key={node.fieldValue}>
              <Link to={`/more/${node.fieldValue}`} className={navLinkText}>
                {node.fieldValue} ({node.totalCount})
              </Link>
              <ul className={navLinks}>
              {node.group.map(node => (
              <li className={navLinkItem} key={node.fieldValue}>
                <Link to={`/more/${node.fieldValue}`} className={navLinkText}>
                {node.fieldValue} ({node.totalCount})
               </Link>
              </li>))}
              </ul>
            </li>
              ))
            }
            {/* <li className={navLinkItem}>
              <Link to="/" className={navLinkText}>
                Home
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about" className={navLinkText}>
                About
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/blog" className={navLinkText}>
                Blog
              </Link>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className={container}>
        <header className={siteTitle}>{pageTitle}</header>
        <main>
          {children}
        </main>
      </div>
      <div>

      </div>

    </div>
  )
}

export default Layout