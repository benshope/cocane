import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const TYPE = 'FILE_INPUT'

const CellBoxDiv = styled.div`
	font-family: 'UberMove', 'Helvetica Neue', Helvetica, sans-serif;
	font-weight: 500;

	.inputfile {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}

	.inputfile + label {
		font-size: 1.25rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		display: inline-block;
		overflow: hidden;
		padding: 0.625rem 1.25rem;
	}

	.inputfile:focus label {
		outline: 1px dotted #000;
	}

	.inputfile + label svg {
		width: 1em;
		height: 1em;
		vertical-align: middle;
		fill: currentColor;
		margin-top: -0.25em;
		margin-right: 0.25em;
	}

	.inputfile-6 + label {
		color: white;
		display: flex;
		border: 1px solid hsl(0, 0%, 40%);
		background-color: white;
		padding: 0;
	}

	.inputfile-6:focus + label,
	.inputfile-6.has-focus + label,
	.inputfile-6 + label:hover {
		border-color: hsl(0, 0%, 10%);
	}

	.inputfile-6 + label .mock-input,
	.inputfile-6 + label .mock-button {
		padding: 0.625rem 1.25rem;
	}

	.inputfile-6 + label .mock-input {
		width: 200px;
		flex: 1;
		min-height: 1em;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		vertical-align: top;
	}

	.inputfile-6 + label .mock-button {
		height: 100%;
		flex-shrink: 0;
		color: white;
		background-color: black;
		display: inline-block;
	}

	.inputfile-6:focus + label .mock-button,
	.inputfile-6.has-focus + label .mock-button,
	.inputfile-6 + label:hover .mock-button {
		background-color: hsl(0, 0%, 10%);
	}
`

const LOAD_DATA_FROM_FILE = 'LOAD_DATA_FROM_FILE'
const addFileAction = payload => ({
	type: LOAD_DATA_FROM_FILE,
	payload,
})

export const reducer = (state, { type, payload }) => {
	// if (type === ADD_COMPONENT && payload.type === COMPONENT_TYPE) {
	// 	return { ...state, [payload.id]: payload }
	// }
	if (type === LOAD_DATA_FROM_FILE) {
		return {
			...state,
			[payload.id]: {
				...state[payload.id],
				data: payload.data,
			},
		}
		// TODO: see if there is a reference to this ID
		// and if there isn't - create a new viewer?
		// or a temporary viewer?
		// TODO add this logic within the notebook view?
	}
	return state
}

function FileInput({ id, addFile }) {
	const onChange = e => {
		const reader = new FileReader()
		reader.onload = function(e) {
			addFile({
				data: reader.result,
				id,
			})
		}
		reader.readAsText(e.target.files[0])
	}

	return (
		<CellBoxDiv>
			<input
				type="file"
				name="file-7[]"
				id="file-7"
				onChange={onChange}
				class="inputfile inputfile-6"
				data-multiple-caption="{count} files selected"
				multiple
			/>
			<label for="file-7">
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
					Choose a file&hellip;
				</div>
			</label>
		</CellBoxDiv>
	)
}

export const ConnectedFileInput = connect(
	state => state,
	{ addFile: addFileAction }
)(FileInput)

export const components = [
	{ name: 'File Input', type: TYPE, component: ConnectedFileInput },
]
