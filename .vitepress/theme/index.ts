import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import MessageBoard from './components/MessageBoard.vue'
import PostArchive from './components/PostArchive.vue'
import PaperArchive from './components/PaperArchive.vue'
import ResourceLinks from './components/ResourceLinks.vue'
import RelaxGames from './components/RelaxGames.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('MessageBoard', MessageBoard)
    app.component('PostArchive', PostArchive)
    app.component('PaperArchive', PaperArchive)
    app.component('ResourceLinks', ResourceLinks)
    app.component('RelaxGames', RelaxGames)
  }
}
