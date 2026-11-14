import { Link } from 'react-router-dom'

// Internal paths use the router; everything else opens in a new tab.
export default function TextLink({ href, children, ...rest }) {
  if (href.startsWith('/')) return <Link to={href} {...rest}>{children}</Link>
  const external = href.startsWith('http')
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...rest}>
      {children}
    </a>
  )
}
