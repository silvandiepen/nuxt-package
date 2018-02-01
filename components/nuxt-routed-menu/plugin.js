const NuxtRoutedMenu = function(routes, NuxtNavSettings) {
	var tempnav = [];
	var nav = [];

	// console.log(routes);

	// if (NuxtNavSettings.alphabetical.top) {
	routes.sort();
	// }//
	routes.forEach(function(route) {
		// route.sort();
		var segments = route.path.split('/');
		if (segments.length > 2) {
			route.parent = segments[segments.length - 2];
		} else {
			route.parent = null;
		}
		var title = segments[segments.length - 1];
		var slug = segments[segments.length - 1];

		var show = true;
		var replacedTitle = false;
		NuxtNavSettings.titles.forEach(function(changingTitle) {
			if (changingTitle.view === route.name) {
				if (changingTitle.hide) {
					show = false;
				} else {
					replacedTitle = true;
					title = changingTitle.title;
				}
			}
		});
		if (show) {
			tempnav.push({
				path: route.path,
				title: title,
				slug: slug,
				replacedTitle: replacedTitle,
				name: route.name,
				parent: route.parent
			});
		}
	});
	if (NuxtNavSettings.alphabetical.sub) {
		tempnav.sort();
	}
	tempnav.forEach(function(item) {
		if (item.parent === null) {
			// Check if Menu Item has children level-1
			item.children = [];
			tempnav.forEach(function(itemsub) {
				if (itemsub.parent === item.slug) {
					// Check if Menu Item has children level-2
					itemsub.children = [];
					tempnav.forEach(function(itemsubsub) {
						if (itemsubsub.parent === itemsub.slug) {
							itemsubsub.children = [];
							itemsub.children.push(itemsubsub);
						}
					});
					item.children.push(itemsub);
				}
			});
			nav.push(item);
		}
	});
	return nav;
};

export default NuxtRoutedMenu;