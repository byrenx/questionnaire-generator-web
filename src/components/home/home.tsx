import {Header} from "../header/header";
import {HomeContent} from "./homeContent";

export const Home = () => {
	return (
		<div style={styles.homeRootContainer}>
		  <div style={styles.homeContentContainer}>
		  	<Header/>
			<HomeContent/>
		  </div>
		</div>
	);

}

const styles = {
	homeRootContainer: {
		display: "flex",
		justifyContent: "center",
	},
	homeContentContainer: {
		display: "flex",
		flexDirection: "column",
		width: "65%"
	}
}



