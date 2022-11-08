import * as React from 'react'
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const Seo = ({ title, description, pathname, children}) => {

  const {title: defaultTitle, description: defaultDescription, siteUrl} = useSiteMetadata()
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`
  }


  return (
  <>
    <title>{title} | {defaultTitle}</title>
    <meta name="description" content={seo.description} />
    {children}
  </>
  )
}

export default Seo