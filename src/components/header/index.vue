<template>
  <div class="header-wrapper row m-0">
    <SearchBar />
    <Logo />
    <div class="left-header col horizontal-wrapper pl-0">
    </div>
    <div class="nav-right col-8 pull-right right-header p-0">
      <ul class="nav-menus">
        <li>
          <Mode />
        </li>
        <li class="maximize">
          <Maximize />
        </li>
        <Profile />
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Bookmark from '../bookmark';
  import BonusUI from './bonusUI';
  import LevelMenu from './levelMenu';
  import Language from './language';
  import Notifications from './notifications';
  import Mode from './mode';
  import Cart from './cart';
  import Message from './message';
  import Maximize from './maximize';
  import Profile from './profile';
  import Logo from './logo';
  import SearchBar from './search';

  export default {
    name: 'Search',
    components: {
      Bookmark,
      BonusUI,
      LevelMenu,
      Language,
      Notifications,
      Mode,
      Cart,
      Message,
      Maximize,
      Profile,
      Logo,
      SearchBar,
    },
    data() {
      return {
        bookmark: false,
      };
    },
    computed: {
      ...mapState({
        menuItems: (state) => state.menu.searchData,
        megamenuItems: (state) => state.menu.megamenu,
        searchOpen: (state) => state.menu.searchOpen,
      }),
    },
    methods: {
      search_open() {
        this.$store.state.menu.searchOpen = true;
      },
      bookmark_open() {
        this.bookmark = !this.bookmark;
      },
    },
  };
</script>
