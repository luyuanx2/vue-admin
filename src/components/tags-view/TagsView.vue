<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''"
                   v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"
                   @contextmenu.prevent.native="openMenu(tag,$event)">
        <span style="margin-left: 3px;">{{tag.title}}</span>
        <i class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></i>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags">Close All</li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ScrollPane from 'base/ScrollPane'
  import Hamburger from 'base/Hamburger'

  export default {
    components: {
      ScrollPane,
      Hamburger
    },
    data () {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      visitedViews () {
        return this.$store.state.tagsView.visitedViews
      }
    },
    watch: {
      $route () {
        this.addViewTags()
        this.moveToCurrentTag()
      },
      visible (value) {
        if (value) {
          window.addEventListener('click', this.closeMenu)
        } else {
          window.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted () {
      this.addViewTags()
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('toggleSideBar')
      },
      generateRoute () {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive (route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      addViewTags () {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisitedViews', route)
      },
      moveToCurrentTag () {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag.$el)
              break
            }
          }
        })
      },
      closeSelectedTag (view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      closeOthersTags () {
        this.$router.push(this.selectedTag.path)
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags () {
        this.$store.dispatch('delAllViews')
        this.$router.push('/')
      },
      openMenu (tag, e) {
        this.visible = true
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
      },
      closeMenu () {
        this.visible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    .hamburger-container {
      line-height: 36px;
      height: 36px;
      float: left;
      padding-top: 8px;
      padding-left: 10px;
    }
    .tags-view-wrapper {
      background: #fff;
      height: 36px;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
      .tags-view-item {
        /*border-radius: 3px;*/
        display: inline-block;
        position: relative;
        height: 36px;
        line-height: 36px;
        border: 1px solid #fff;
        color: #76838f;
        background: #fff;
        padding: 0 8px;
        font-size: 14px;
        margin-left: 5px;
        /*margin-top: 1px;*/
        &:first-of-type {
          padding-left: 0;
          margin-left: 10px;
        }
        &.active {
          background-color: #fff;
          color: #76838f;
          border-color: #fff;
          &::before {
            content: '';
            background: #2d8cf0;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 2;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        border-radius: 50%;
        text-align: center;
        position: relative;
        cursor: pointer;
        font-size: 12px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        vertical-align: middle;
       /* top: -1px;*/
       /* right: -5px;*/
        color: #495060;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
       /* width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;*/
        &:hover {
          background-color: #f56c6c;
          color: #fff;
        }
      }
    }
  }
</style>