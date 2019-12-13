module.exports = {
	formats: 'local woff',
	display: "swap",
	custom: {
		"Circe": {
			variants: {
				normal: {
					300: {
						url: {
							woff: "../fonts/Circe-Light.woff"
						}
					},
					400: {
						url: {
							woff: "../fonts/Circe-Regular.woff"
						}
					},
					700: {
						url: {
							woff: "../fonts/Circe-Bold.woff"
						}
					}
				}
			}
		}
	}
}