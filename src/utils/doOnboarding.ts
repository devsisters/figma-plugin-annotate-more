export default async () => {
	const storageKey = 'userFirstOpenedPlugin'
	const userFirstOpenedPlugin = !(await figma.clientStorage.getAsync(storageKey))

	// if (userFirstOpenedPlugin)
		figma.ui.postMessage({
			type: 'userFirstOpenedPlugin',
			value: figma.currentPage.selection
		})

	figma.clientStorage.setAsync(storageKey, true)
}