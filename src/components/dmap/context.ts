import { createStateContext } from '../../hooks/createStateContext'

export const [useSearch, FormStateProvider] = createStateContext<string>('')
