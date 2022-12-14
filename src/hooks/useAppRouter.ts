import { useCallback, useMemo } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import configs from 'configs'

const {
  manifest: { appId },
} = configs
const APP_ROUTE = `/app/${appId}`

export const useAppRouter = () => {
  const { search, pathname } = useLocation()
  const history = useHistory()
  // getID from url
  const params: Record<string, string> = useParams()

  const query = useMemo(() => {
    return new URLSearchParams(search)
  }, [search])

  /**
   * @param id id name
   */
  const getIdFromUrl = useCallback(
    (id: string) => {
      if (!params[id]) return ''
      return params[id]
    },
    [params],
  )

  const getQuery = useCallback(
    (queryId: string) => {
      const result = query.get(queryId)
      if (!result) return ''
      return result
    },
    [query],
  )

  const getAllQuery = useCallback(<T>() => {
    const queries: Record<string, string> = {}
    query.forEach((value, key) => {
      queries[key] = value
    })
    const wrapResult: T = queries as any
    return wrapResult
  }, [query])

  /**
   * @param path is URL parameters
   * @param newQuery Object all Query
   * @param force keep prev Query with force=false
   */
  const pushHistory = useCallback(
    (
      path: string,
      newQuery: Record<string, string> = {},
      force: boolean = true,
    ) => {
      const currentQuery = getAllQuery<Record<string, string>>()
      // Keep current query with 'force' === false
      if (force === false) newQuery = Object.assign(currentQuery, newQuery)
      const newParams = new URLSearchParams(newQuery)
      if (newParams) path += `?${newParams.toString()}`
      history.push(`${APP_ROUTE}${path}`)
    },
    [getAllQuery, history],
  )

  return {
    getQuery,
    getAllQuery,
    pushHistory,
    appRoute: APP_ROUTE,
    pathname,
    getIdFromUrl,
  }
}
