const FALLBACK_SERVER_URL = 'http://localhost:3000'

export const getServerSideURL = () => {
  return process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || FALLBACK_SERVER_URL
}

export const getClientSideURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return getServerSideURL()
}
