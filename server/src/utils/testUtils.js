import { render } from 'react-testing-library'
import Providers from '../components/Providers'

const customRender = (ui, options) =>
  render(ui, {
    wrapper: Providers,
    ...options,
  })

export * from 'react-testing-library'

export { customRender as render }
