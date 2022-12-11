import { useRef } from 'react';
import * as XLSX from 'xlsx';

import {
	generateQuestionnaireSets,
	Question,
	QuestionnaireGeneratorConfig,
} from '@byrenx/questionnaire-generator';

export const InputForm = () => {
        const fileRef: any = useRef(null)
	const fileName: any = useRef("");
	const setsRef: any = useRef(0)
	const itemPerSetRef: any = useRef(0)
	const rememberingRef: any = useRef(0)
	const understandingRef: any = useRef(0)
	const applyingRef: any = useRef(0)
	const analyzingRef: any = useRef(0)
	const evaluatingRef: any = useRef(0)
	const creatingRef: any = useRef(0);

	const generateQSets = (
		questions: Question[],
		config: QuestionnaireGeneratorConfig
	) => {
		const questionnaireSets = generateQuestionnaireSets(questions, config)
		console.log(questionnaireSets)
	}

	const handleGenerateQuestionnaires = async () => {
		const file = fileRef?.current?.files[0]
		const config: QuestionnaireGeneratorConfig = {
			sets: +setsRef.current.value,
			itemsPerSet: +itemPerSetRef.current.value,
			distribution: {
				Remembering: +rememberingRef.current.value,
				Understanding: +understandingRef.current.value,
				Applying: +applyingRef.current.value,
				Analyzing: +analyzingRef.current.value,
				Evaluating: +evaluatingRef.current.value,
				Creating: +creatingRef.current.value,
			},
		}

		let questions: Question[] = [];
		const data = await file.arrayBuffer();
		const workbook = XLSX.read(data, {type: 'array'});
		workbook.SheetNames.forEach((sheetName) => {
			const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
			data.forEach(datum => {
				questions.push(new Question({
					question: datum['Question'],
					difficulty: datum['Difficulty(Bloom\'s Taxonomy)'],
					choices: datum['Choices (Should always be separated with semicolon ";".)'].split(';')
				}));
			});
		});
		console.log(questions);
		generateQSets(questions, config);
	};

	const handleChooseFileClick = () => {
		fileRef.current.click();
	}

	const handleOnChangeFileSelect = () => {
		fileName.current.value = fileRef.current.value
	}

	return (
		<div style={styles.questionnaireInputFormContainer}>
			<div style={styles.formInput}>
				<label style={styles.label500}>Select Questionnaire File</label>
				<div>
					<input type="text"/>
					<button onClick={handleChooseFileClick}>Choose a file</button>
				</div>
				<input
					style={styles.hidden}
					id="fileSelect"
					ref={fileRef}
					type="file"
					name="questionnaires"
					onChange={handleOnChangeFileSelect}
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				/>
			</div>
			<div style={styles.formInput}>
				<label style={styles.label500}>No. of Sets</label>
				<input ref={setsRef} style={styles.field} type="number" />
			</div>
			<div style={styles.formInput}>
				<label style={styles.label500}>Items per Set</label>
				<input ref={itemPerSetRef} style={styles.field} type="number" />
			</div>
			<div style={styles.formInput}>
				<span style={styles.distribSpan}>Set Distribution</span>
				<div style={styles.distributionContainer}>
					<div style={styles.distribInputGroup}>
						<label style={styles.label300}>Remembering</label>
						<input ref={rememberingRef} style={styles.field} type="number" />
					</div>
					<div style={styles.distribInputGroup}>
						<label style={styles.label300}>Understanding</label>
						<input
							style={styles.field}
							ref={understandingRef}
							type="number"
						/>
					</div>
					<div style={styles.distribInputGroup}>
					<label style={styles.label300}>Applying</label>
					<input style={styles.field} ref={applyingRef} type="number" />
					</div>

					<div style={styles.distribInputGroup} >
					<label style={styles.label300}>Analyzing</label>
					<input style={styles.field} ref={analyzingRef} type="number" />
					</div>

					<div style={styles.distribInputGroup}>
					<label style={styles.label300}>Evaluating</label>
					<input style={styles.field} ref={evaluatingRef} type="number" />
					</div>

					<div style={styles.distribInputGroup}>
					<label style={styles.label300}>Creating</label>
					<input style={styles.field} ref={creatingRef} type="number" />
					</div>
				</div>
			</div>
			<div style={styles.formInput}>
				<button onClick={handleGenerateQuestionnaires}>
					Generate Questionnaires
				</button>
			</div>
		</div>
	)
}

const styles = {
	questionnaireInputFormContainer: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: "650px",
	},

	formInput: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginBottom: 10,
	},
	distributionContainer: {
		display: "flex",
		flexDirection: "column"
	},
	field: {
		height: "25px",
    		borderRadius: "5px",
    		borderColor: "blue",
    		border: "1px solid"
	},
	hidden: {
		display: "none"
	},
	distribInputGroup: {
		display: "flex",
		justifyContent: "space-between"
	},
	distribSpan: {
		marginBottom: "10px",
		fontWeight: "500"
	},
	label500: {
		fontWeight: "500",
	},
	label300: {
		fontWeight: "300",
		fontStyle: "italic"
	}

}
