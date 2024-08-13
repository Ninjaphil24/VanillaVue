import home from '../views/home.js'
import about from '../views/about.js'
import ReactiveView from '../views/ReactiveView.js'

// container.innerHTML = home
const routes = {
    '/': home,
    '/about': about,
    '/reactive': ReactiveView
}

function router() {
    let container = document.getElementById('container')
    let path = window.location.hash.replace('#', '') || '/'
    let content = routes[path]
    container.innerHTML = ""
    container.appendChild(content.render())

}

export default router