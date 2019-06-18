import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { SingleSelect } from "../select/select";
import fileInput from "../file-input/file-input";
import nativeInput from "../input/input";
import nativeSelect from "../select/select";

const NotebookDiv = styled.div`
	position: relative;
`;

const AddComponentDiv = styled.div`
	position: relative;
`;

const CellWrapperDiv = styled.div`
	position: relative;
	margin-bottom: 0.5rem;
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
		nativeSelect.reducer,
		(state, action) => {
			const { type, payload } = action;
			if (type === ADD_COMPONENT) {
				const componentID = Math.random().toString(36);
				console.log("trying to add component", payload);
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

const componentList = [fileInput, nativeInput, nativeSelect];
const componentsByType = componentList.reduce((acc, component) => {
	acc[component.type] = component;
	return acc;
}, {});

const Notebook = ({
	id,
	addComponent,
	// removeComponent,
	state
}) => {
	// TODO make searchable
	// TODO create generic component - intersection of all
	return (
		<NotebookDiv>
			<input type="text" placeholder="Search..." />
			{(state[id] ? state[id].components : []).map(componentID => {
				console.log("componentID", componentID);
				const componentState = state[componentID];
				const Component =
					componentsByType[componentState.type].component;
				return (
					<CellWrapperDiv key={componentID}>
						<Component id={componentID} />
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
		</NotebookDiv>
	);
};

export const ConnectedNotebook = connect(
	state => ({ state }),
	{ addComponent: addComponentAction, removeComponent: removeComponentAction }
)(Notebook);
