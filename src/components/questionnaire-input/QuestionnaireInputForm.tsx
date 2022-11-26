import { useRef } from 'react';
import * as XLSX from 'xlsx';

import {
	generateQuestionnaireSets,
	Question,
	QuestionnaireGeneratorConfig,
} from '@byrenx/questionnaire-generator'

export const QuestionnaireInputForm = () => {
        const fileRef: any = useRef(null)
	const setsRef: any = useRef(0)
	const itemPerSetRef: any = useRef(0)
	const rememberingRef: any = useRef(0)
	const understandingRef: any = useRef(0)
	const applyingRef: any = useRef(0)
	const analyzingRef: any = useRef(0)
	const evaluatingRef: any = useRef(0)

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
				remembering: +rememberingRef.current.value,
				understanding: +understandingRef.current.value,
				applying: +applyingRef.current.value,
				analyzing: +analyzingRef.current.value,
				evaluating: +evaluatingRef.current.value,
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
					difficulty: datum['Difficulty'],
					choices: datum['Choices']
				}));
			});
		});
		generateQSets(questions, config);
	}

	return (
		<div style={styles.questionnaireInputFormContainer}>
			<div style={styles.formInput}>
				<label>Select Questionnaire File</label>
				<input
					id="fileSelect"
					ref={fileRef}
					type="file"
					name="questionnaires"
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				/>
			</div>
			<div style={styles.formInput}>
				<label>No. of Sets</label>
				<input ref={setsRef} type="number" />
			</div>
			<div style={styles.formInput}>
				<label>Items per Set</label>
				<input ref={itemPerSetRef} type="number" />
			</div>
			<div style={styles.formInput}>
				<label>Distribution</label>
				<input placeholder="Remembering" ref={rememberingRef} type="number" />
				<input
					placeholder="Understanding"
					ref={understandingRef}
					type="number"
				/>
				<input placeholder="Applying" ref={applyingRef} type="number" />
				<input placeholder="Analyzing" ref={analyzingRef} type="number" />
				<input placeholder="Evaluating" ref={evaluatingRef} type="number" />
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
	},

	formInput: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginBottom: 10,
	},
}
