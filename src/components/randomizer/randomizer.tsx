import {Header} from "../header/header";
import {InputForm} from "./inputForm";

export const Randomizer = () => {
	return (
		<div style={styles.baseContainer}>
		  <div style={styles.contentContainer}>
		  	<Header/>
			<div style={styles.inputFormContainer}>
				<InputForm/>
			</div>
		  </div>
		</div>
	);

}


const styles = {
	baseContainer: {
		display: "flex",
		justifyContent: "center",
	},
	contentContainer: {
		display: "flex",
		flexDirection: "column",
		width: "65%"
	},
	inputFormContainer: {
		display: "flex",
		justifyContent: "center"
	}
}


