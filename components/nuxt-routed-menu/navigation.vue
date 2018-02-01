<template lang="pug">
nav#nav.nav(:class="menuActive")
	a.menu-trigger(v-on:click="menuTrigger")
		span
	ul.nav--list
		li.nav--list__item.level-0(v-for="item in navigation", :class="{'has-children' : navigation.length > 0}")
			nuxt-link.nav--list__item-link(:to="item.path")
				span.nav--list__item-text(:class="{'titled': item.replacedTitle}") {{item.title}}

			ul.nav--list(v-if="item.children.length > 0", :class="{'has-active' : current.fullPath.indexOf(item.path) !== -1}")
				li.nav--list__item.level-1(v-for="subitem in item.children", :class="{'has-children' : subitem.children.length > 0}")
					nuxt-link.nav--list__item-link(:to="subitem.path")
						span.nav--list__item-text(:class="{'titled': subitem.replacedTitle}") {{subitem.title}}

					ul.nav--list(v-if="subitem.children.length > 0", :class="{'has-active' : current.fullPath.indexOf(subitem.path) !== -1}")
						li.nav--list__item.level-2(v-for="subsubitem in subitem.children", :class="{'has-children' : subsubitem.children.length > 0}")
							nuxt-link.nav--list__item-link(:to="subsubitem.path")
								span.nav--list__item-text(:class="{'titled': subsubitem.replacedTitle}") {{subsubitem.title}}
</template>

<script>
import NuxtRoutedMenu from '~/plugins/nuxt-routed-menu'
import * as NuxtNavSettings from '~/nuxt.navigation.json'
export default {
	created() {
		this.navigation = NuxtRoutedMenu(this.$router.options.routes, NuxtNavSettings);
	},
	data() {
		return {
			menuTrigger: function() {
				if (this.menuActive === null) {
					this.menuActive = 'active';
				} else {
					this.menuActive = '';
				}
			},
			menuActive: '',
			navigation: [],
			current: this.$router.history.current
		}
	},
	methods: {},
	watch: {
		$route: function() {
			this.current = this.$router.history.current;
		}
	}
}
</script>
