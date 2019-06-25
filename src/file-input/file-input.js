import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { csvParse } from "d3-dsv";

const TYPE = "FILE_INPUT";

const CellBoxDiv = styled.div`
	font-weight: 500;
	line-height: 1.5em;
	width: 300px;
	.file-input {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}

	.file-input + label {
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		display: inline-block;
		overflow: hidden;
		border-radius: 0.75em;
	}

	.file-input:focus + label {
		border: 1px dotted #000;
	}

	.file-input + label svg {
		width: 1em;
		height: 1em;
		vertical-align: middle;
		fill: currentColor;
		margin-top: -0.25em;
		margin-right: 0.25em;
	}

	.file-input + label {
		color: white;
		display: flex;
		border: 1px solid hsl(0, 0%, 40%);
		background-color: white;
		padding: 0;
	}

	.file-input:focus + label,
	.file-input.has-focus + label,
	.file-input + label:hover {
		border-color: hsl(0, 0%, 10%);
	}

	.file-input + label .mock-input {
		width: 200px;
		flex: 1;
		min-height: 1em;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		vertical-align: top;
	}

	.file-input + label .mock-button {
		height: 100%;
		flex-shrink: 0;
		color: white;
		background-color: black;
		display: inline-block;
		padding: 0 0.75em;
	}

	.file-input:focus + label .mock-button,
	.file-input.has-focus + label .mock-button,
	.file-input + label:hover .mock-button {
		background-color: hsl(0, 0%, 10%);
	}
`;

const LOAD_DATA_FROM_FILE = "LOAD_DATA_FROM_FILE";
const addFileAction = payload => ({
	type: LOAD_DATA_FROM_FILE,
	payload
});

const reducer = (state, { type, payload }) => {
	// if (type === ADD_COMPONENT && payload.type === COMPONENT_TYPE) {
	// 	return { ...state, [payload.id]: payload }
	// }
	if (type === LOAD_DATA_FROM_FILE) {
		return {
			...state,
			[payload.id]: {
				...state[payload.id],
				data: payload.data
			}
		};
		// TODO: see if there is a reference to this ID
		// and if there isn't - create a new viewer?
		// or a temporary viewer?
		// TODO add this logic within the notebook view?
	}
	return state;
};

// let db;
// let request = indexedDB.open("CellsDatabase");

// request.onerror = function(event) {
// 	console.log("error: ", e);
// };

// request.onsuccess = function(event) {
// 	db = request.result;
// 	console.log("success: " + db);
// };

const FileInput = ({ id, addFile }) => {
	const onChange = e => {
		const reader = new FileReader();
		reader.onload = () => {
			addFile({
				data: csvParse(reader.result),
				id
			});
		};
		reader.readAsText(e.target.files[0]);
	};

	return (
		<CellBoxDiv>
			<input
				type="file"
				name="file-7[]"
				id={`file-input-${id}`}
				onChange={onChange}
				className="file-input"
				data-multiple-caption="{count} files selected"
				multiple
			/>
			<label htmlFor={`file-input-${id}`}>
				<div className="mock-input" />
				<div className="mock-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="17"
						viewBox="0 0 20 17"
					>
						<path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
					</svg>
					{"Choose a file..."}
				</div>
			</label>
		</CellBoxDiv>
	);
};

const ConnectedFileInput = connect(
	state => state,
	{ addFile: addFileAction }
)(FileInput);

export default {
	name: "File Input",
	type: TYPE,
	inputs: () => null,
	component: ConnectedFileInput,
	reducer
};
