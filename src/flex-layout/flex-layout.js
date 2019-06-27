import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { SingleSelect } from "../select/select";
import fileInput from "../file-input/file-input";
import stringListInput from "../string-list-input/string-list-input";
import nativeInput from "../input/input";
import nativeSelect from "../select/select";

const FlexLayoutDiv = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	background: #f2f2f2;
	padding-left: 1rem;
	padding-top: 1rem;
`;

const AddComponentDiv = styled.div`
	position: relative;
`;

const CellWrapperDiv = styled.div`
	position: relative;
	margin-bottom: 0.5rem;
	margin-right: 1rem;
	margin-bottom: 1rem;
	border-radius: 4px;
	background: white;
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;

const ADD_COMPONENT = "ADD_COMPONENT";
const REMOVE_COMPONENT = "REMOVE_COMPONENT";

const addComponentAction = payload => ({
	type: ADD_COMPONENT,
	payload
});

const removeComponentAction = payload => ({
	type: REMOVE_COMPONENT,
	payload
});

export const reducer = (s, a) =>
	[
		fileInput.reducer,
		nativeInput.reducer,
		stringListInput.reducer,
		nativeSelect.reducer,
		(state, action) => {
			const { type, payload } = action;
			if (type === ADD_COMPONENT) {
				const componentID = Math.random().toString(36);
				return {
					...state,
					[componentID]: { type: payload.type },
					[payload.id]: {
						...state[payload.id],
						components: [
							...(state[payload.id].components || []),
							componentID
						]
					}
				};
			}
			if (type === REMOVE_COMPONENT) {
				return {
					...state,
					[payload.id]: state[payload.id].filter(
						x => x !== payload.componentID
					)
				};
			}
			return state;
		}
	].reduce((acc, r) => r(acc, a), s);

const componentList = [fileInput, nativeInput, nativeSelect, stringListInput];
const componentsByType = componentList.reduce((acc, component) => {
	acc[component.type] = component;
	return acc;
}, {});

const FlexLayout = ({
	id,
	addComponent,
	// removeComponent,
	state
}) => {
	// TODO make searchable
	// TODO create generic component - intersection of all
	return (
		<FlexLayoutDiv>
			{/* <input type="text" placeholder="Search..." /> */}
			{(state[id] ? state[id].components : []).map(componentID => {
				console.log("componentID", componentID);
				const componentState = state[componentID];
				const cell = componentsByType[componentState.type];
				const CellComponent = cell.component;
				const CellInputs = cell.inputs
					? cell.inputs
					: () => `TODO: ${cell.type} inputs`;
				return (
					<CellWrapperDiv key={componentID}>
						<CellInputs id={componentID} />
						<CellComponent id={componentID} />
					</CellWrapperDiv>
				);
			})}
			<AddComponentDiv>
				<SingleSelect
					onChange={option => addComponent({ type: option, id })}
					value=""
					options={componentList.map(component => ({
						value: component.type,
						name: component.name
					}))}
				/>
			</AddComponentDiv>
		</FlexLayoutDiv>
	);
};

export const ConnectedFlexLayout = connect(
	state => ({ state }),
	{ addComponent: addComponentAction, removeComponent: removeComponentAction }
)(FlexLayout);
