import { RecoilRoot } from 'recoil';
import './index.css'
import LoadingHTML from './utils/loading';

let state = 'PRELOAD'

const timeoutForLoadingPage = setTimeout(() => startLoadingPage(), 500)

function setToDone() {
  if (state !== 'LOADING') {
    clearTimeout(timeoutForLoadingPage)
    startupApp()
  }
  state = 'DONE'
}

function updateLoadingText(text) {
  const elem = document.getElementById('loadingPercent')
  if (elem) {
    elem.innerText = text
  }
}

function startLoadingPage() {
  state = 'LOADING'
  document.getElementById('root').innerHTML = LoadingHTML;
  const decay = 1.5E-4
  const startTime = Date.now()
  let percent = 0
  const loadingInterval = setInterval(() => {
    const now = Date.now()
    if (state === 'LOADING') {
      percent += 6000 * decay * Math.max(Math.exp(-decay * (now - startTime)), 1E-9)
    }
    else {
      percent += 5 + 5 * Math.random()
    }

    updateLoadingText(`${Math.max(0.1, Math.min(percent, 99.9)).toFixed(percent < 90 ? 0 : percent < 99 ? 1 : 2)}%`)
    if (state === 'DONE' && percent >= 100) {
      clearInterval(loadingInterval)
      updateLoadingText('100%')
      setTimeout(startupApp, 200)
    }
  }, 60)
}

let React = null
let ReactDOM = null
let AppRouter = null

function startupApp() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RecoilRoot>
        <AppRouter />
      </RecoilRoot>
    </React.StrictMode>
  );
}

Promise.all([
  import('react-dom/client').then((module) => ReactDOM = module),
  import('./components/AppRouter/AppRouter').then(comp => AppRouter = comp.default),
  import('react').then(module => React = module.default)
]).then(() => setToDone())