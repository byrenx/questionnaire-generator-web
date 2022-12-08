export const Header = () => {
	return (
		<div style={styles.header}>
			<div style={styles.logosContainer}>
				<div>
					<img style={styles.logo} src={"./assets/TQRLogo1.png"}/>
				</div>
				<div style={styles.logTextContainer}>
					<img style={styles.logoText} src={"./assets/TQRLogo2.png"}/>
				</div>
			</div>
			<div></div>
		</div>
	);
}

const styles = {
	header: {
		display: "flex",
	},
	logosContainer: {
		display: "flex",
	},
	logo: {
		width: "80.83px",
		height: "92.84px",
		objectFit: "cover"
	},
	logTextContainer: {
		display: "flex",
		alignItems: "center"
	},
	logoText: {
		height: "51px",
		objectFit: "cover"
	}
}
