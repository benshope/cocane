import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { components as fileInputComponents } from "../file-input/file-input";

const NotebookDiv = styled.div`
	position: relative;
`;

const AddComponentDiv = styled.div`
	position: relative;
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

export const reducer = (state, { type, payload }) => {
	if (type === ADD_COMPONENT) {
		const componentID = Math.random().toString(36);
		return {
			...state,
			[componentID]: { type: payload.type },
			[payload.id]: {
				...state[payload.id],
				components: [...(state[payload.id] || []), componentID]
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
};

// TODO get from const
const componentList = [...fileInputComponents];
const componentsByType = componentList.reduce((acc, component) => {
	acc[component.type] = component;
	return acc;
}, {});

function FileInput({
	id,
	// addComponent,
	// removeComponent,
	state
}) {
	// TODO make searchable
	// TODO create generic component - intersection of all
	return (
		<NotebookDiv>
			<input type="text" placeholder="Search..." />
			{state[id].components.map(componentID => {
				const componentState = state[componentID];
				const Component =
					componentsByType[componentState.type].component;
				return <Component id={componentID} />;
			})}
			<AddComponentDiv>
				{componentsByType.map(component => (
					<button>{component.name}</button>
				))}
			</AddComponentDiv>
		</NotebookDiv>
	);
}

export default connect(
	state => state,
	{ addComponent: addComponentAction, removeComponent: removeComponentAction }
)(FileInput);
