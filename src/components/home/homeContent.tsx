export const HomeContent = () => {
	return (
		<div style={styles.homeContentContainer}>
			<div style={styles.videoContainer}></div>
			<div style={styles.rightPaneContainer}>
				<div >
					<p style={styles.headerText}>
						<span>Let's</span> <span style={styles.randomizeText}>randomize</span>
						<br></br>
						<span>test questions!</span>
					</p>
				</div>
				<div style={styles.buttonGroupsContainer}>
					<div style={styles.buttonGroupContainer}>
						<button style={styles.entryButton}>ABOUT TQRANDOMIZER</button>
						<button style={styles.entryButton}>HOW IT WORKS</button>
						<button style={styles.entryButton}>DOWNLOAD TEST QUESTIONNAIRE TEMPLATE</button>
					</div>
					<div style={styles.buttonGroupContainer}>
						<button style={styles.entryButton}>UPLOAD TEST QUESTIONNAIRE</button>
						<button style={styles.entryButton}>SAMPLE TEST QUESTIONNAIREs</button>
						<button style={styles.entryButton}>FAQS</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const styles = {
	homeContentContainer: {
		display: "flex",
	},
	headerText: {
		fontWeight: "",
		color: "white",
		fontSize: "xxx-large"
	},
	randomizeText: {
		color: "#FF5400",
		fontWeight: "600"
	},
	buttonGroupsContainer: {
		display: "flex",
	},
	buttonGroupContainer: {
		display: "flex",
		flexDirection: "column",
		width: "50%"
	},
	entryButton: {
		borderRadius: "30px",
		height: "70px",
		margin: "15px",
	},
	videoContainer: {
		width: "50%",
	},
	rightPaneContainer: {
		width: "50%"
	}

}
